Perfecto. Te voy a generar el **starter completo** listo para usar con:

* **Expo Router**
* **Drizzle ORM en Expo (SQLite)**
* **Hono + Drizzle ORM (Cloudflare D1)**
* **Sync offline/online completo**
* **Esquema compartido**
* **hooks `useSync()`**
* **autodetección de conexión**
* **Last-Write-Wins (LWW)**

📦 **Este starter está diseñado para que puedas copiar & pegar y empezar YA.**

---

# 📁 **Estructura del proyecto**

```
/app
  /db
    schema.ts
    drizzle.ts
  /sync
    push.ts
    pull.ts
    useSync.ts
  app/_layout.tsx
  app/index.tsx

/worker
  schema.ts
  worker.ts
  tsconfig.json
  wrangler.toml
```

---

# 🎯 **PARTE 1 — Expo Router + Drizzle + Sync**

---

## 📁 `/app/db/schema.ts`

```ts
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const items = sqliteTable("items", {
  id: text("id").primaryKey(),
  data: text("data"),
  updatedAt: text("updated_at"),
  deleted: integer("deleted").default(0),

  // local-only flags
  isSynced: integer("is_synced").default(0),
});
```

---

## 📁 `/app/db/drizzle.ts`

```ts
import { SQLiteDatabase } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";

const expoDb = new SQLiteDatabase("app.db");

export const db = drizzle(expoDb);
```

---

# 🔼 **Push — `/app/sync/push.ts`**

```ts
import { db } from "../db/drizzle";
import { items } from "../db/schema";
import { eq } from "drizzle-orm";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function pushChanges() {
  const pending = await db
    .select()
    .from(items)
    .where(eq(items.isSynced, 0));

  if (pending.length === 0) return;

  await fetch(`${API_URL}/sync/push`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: pending }),
  });

  await db
    .update(items)
    .set({ isSynced: 1 })
    .where(eq(items.isSynced, 0));
}
```

---

# 🔽 **Pull — `/app/sync/pull.ts`**

```ts
import { db } from "../db/drizzle";
import { items } from "../db/schema";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { eq, gt } from "drizzle-orm";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function pullChanges() {
  const lastSync = (await AsyncStorage.getItem("lastSync")) 
                    ?? "1970-01-01T00:00:00.000Z";

  const res = await fetch(`${API_URL}/sync/pull?since=${lastSync}`);
  const remoteItems = await res.json();

  for (const item of remoteItems) {
    await db.insert(items)
      .values({ ...item, isSynced: 1 })
      .onConflictDoUpdate({
        target: items.id,
        set: {
          data: item.data,
          updatedAt: item.updatedAt,
          deleted: item.deleted,
          isSynced: 1,
        },
      });
  }

  await AsyncStorage.setItem("lastSync", new Date().toISOString());
}
```

---

# 🔄 **Hook de sincronización — `/app/sync/useSync.ts`**

```ts
import { useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";
import { pullChanges } from "./pull";
import { pushChanges } from "./push";

export function useSync(interval = 8000) {
  useEffect(() => {
    const sub = NetInfo.addEventListener(async (state) => {
      if (state.isConnected) {
        await pushChanges();
        await pullChanges();
      }
    });

    const timer = setInterval(async () => {
      const state = await NetInfo.fetch();
      if (state.isConnected) {
        await pushChanges();
        await pullChanges();
      }
    }, interval);

    return () => {
      sub();
      clearInterval(timer);
    };
  }, []);
}
```

---

# 🛣️ **Expo Router — `/app/_layout.tsx`**

```tsx
import { Slot } from "expo-router";

export default function RootLayout() {
  return <Slot />;
}
```

---

# 🏡 **Pantalla demo — `/app/index.tsx`**

```tsx
import { View, Text, Button } from "react-native";
import { db } from "./db/drizzle";
import { items } from "./db/schema";
import { useSync } from "./sync/useSync";

export default function Index() {
  useSync();

  async function addItem() {
    const now = new Date().toISOString();
    await db.insert(items).values({
      id: crypto.randomUUID(),
      data: "Hola desde el device",
      updatedAt: now,
      isSynced: 0,
    });
  }

  return (
    <View style={{ padding: 20 }}>
      <Text>Demo Drizzle Sync</Text>
      <Button title="Agregar item" onPress={addItem} />
    </View>
  );
}
```

---

# 🚀 **PARTE 2 — Worker (Hono + D1 + Drizzle)**

---

## 📁 `/worker/schema.ts`

EL MISMO esquema (sin `isSynced`):

```ts
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const items = sqliteTable("items", {
  id: text("id").primaryKey(),
  data: text("data"),
  updatedAt: text("updated_at"),
  deleted: integer("deleted").default(0),
});
```

---

## 📁 `/worker/worker.ts`

```ts
import { Hono } from "hono";
import { drizzle } from "drizzle-orm/d1";
import { items } from "./schema";
import { gt } from "drizzle-orm";

const app = new Hono();

app.get("/sync/pull", async (c) => {
  const since = c.req.query("since") ?? "1970-01-01T00:00:00.000Z";
  const db = drizzle(c.env.DB);

  const rows = await db
    .select()
    .from(items)
    .where(gt(items.updatedAt, since));

  return c.json(rows);
});

app.post("/sync/push", async (c) => {
  const db = drizzle(c.env.DB);
  const body = await c.req.json();

  for (const item of body.items) {
    await db.insert(items).values(item).onConflictDoUpdate({
      target: items.id,
      set: {
        data: item.data,
        updatedAt: item.updatedAt,
        deleted: item.deleted,
      },
    });
  }

  return c.json({ ok: true });
});

export default app;
```

---

## 📁 `/worker/wrangler.toml`

```toml
name = "drizzle-sync"
compatibility_date = "2024-09-01"

[[d1_databases]]
binding = "DB"
database_name = "sync-db"
database_id = "xxxx"
```

---

# 🎉 **Listo: sync en tiempo real + offline first + tipado end-to-end con Drizzle.**

---

# ¿Quieres que te genere también…?

### 🔐 Autenticación (JWT / Clerk / Supabase Auth)

### 📦 Scripts de migraciones de Drizzle para D1

### 📊 Sync por tablas múltiples

### 🔥 Sync con "operations log" (más robusto que LWW)

### 📁 Un template ZIP descargable listo para usar

Dime qué necesitas y te lo dejo montado.
