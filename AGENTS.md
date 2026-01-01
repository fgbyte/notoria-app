# AGENTS.md

This file provides coding agents with essential information about the Notoria codebase.

## Build, Lint, and Test Commands

### Package Manager
Use **Bun** as the primary package manager (evidenced by bun.lock file).

```bash
bun install              # Install dependencies
bun run start            # Start Expo development server
bun run dev              # Start with APP_VARIANT=development
bun run lint             # Run Expo linting
bun run doctor           # Check Expo project health
bun expo install --check # Verify Expo dependencies
```

### Platform-Specific
```bash
bun run android          # Run on Android (requires emulator or device)
bun run ios              # Run on iOS (requires simulator or device)
bun run web              # Run on web
```

### Build Commands
```bash
bun run prebuild                   # Clean build with cache reset
bun run build-android-dev          # Development build (internal)
bun run build-android-prev         # Preview build (internal)
bun run build-android-prod         # Production build
```

### Utilities
```bash
bun run clean        # Clear cache and reinstall
bun run reset-project # Move starter code to app-example/ and blank app/
```

### Testing
**No test framework is currently configured.** If adding tests, consider:
- Jest with React Native Testing Library for component tests
- Expo's built-in test tools for e2e testing

## Code Style Guidelines

### File Organization
- **app/**: Expo Router file-based routing with layout files (_layout.tsx)
- **components/**: Reusable React Native components
- **utils/**: Utility functions and constants (e.g., Colors.ts)
- **assets/**: Static assets (images, icons)

### Imports
```typescript
// 1. React hooks and core modules
import { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'

// 2. Third-party libraries
import { ClerkProvider } from '@clerk/clerk-expo'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'

// 3. Local imports with @ alias
import ArticlesFeed from '@/components/articles-feed'
import { COLORS } from '@/utils/Colors'
```

### Naming Conventions
- **Components**: PascalCase (e.g., `ArticlesFeed`, `HomeScreen`)
- **Functions**: camelCase (e.g., `fetchFreshArticles`, `handleRefresh`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `COLORS`, `API_URL`)
- **Files**: lowercase with hyphens for directories (e.g., `(tabs)/`), lowercase for files (e.g., `index.tsx`)

### TypeScript Usage
- **Strict mode enabled** in tsconfig.json
- Define interfaces for all component props:
```typescript
interface ArticlesFeedProps {
  maxItems?: number
  feedSource?: 'expo' | 'react-native'
  title?: string
}
```
- Use type annotations for complex data structures

### Styling
- **StyleSheet.create()** for component styles (avoid inline styles)
- Import colors from `@/utils/Colors` for consistency
- Use Tailwind classes when appropriate (Tailwind CSS 4.x is configured)
```typescript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
})
```

### Component Structure
```typescript
// 1. Import statements
import { useState } from 'react'
import { View, Text } from 'react-native'

// 2. Component function (default export for pages)
export default function MyComponent() {
  // 3. Hooks (state, effects, refs)
  const [data, setData] = useState(null)

  // 4. Event handlers
  const handlePress = () => {}

  // 5. Conditional rendering
  if (!data) return <View><Text>Loading...</Text></View>

  // 6. JSX return
  return (
    <View>
      <Text>{data}</Text>
    </View>
  )
}

// 7. Styles (optional, use separate file for complex components)
const styles = StyleSheet.create({
  container: { flex: 1 },
})
```

### Error Handling
- Wrap async operations in try-catch blocks
- Log errors with console.error
- Use finally blocks for cleanup (e.g., setLoading(false))
```typescript
const fetchData = async () => {
  try {
    setIsLoading(true)
    const response = await fetch(url)
    const data = await response.json()
    setData(data)
  } catch (err) {
    console.error(err)
  } finally {
    setIsLoading(false)
  }
}
```

### Linting and Formatting
- **Biome** is the primary formatter/linter
- **ESLint** with expo-config for additional rules
- Single quotes for strings and JSX props
- Semicolons: "asNeeded" (Biome config)
- Use biome-ignore comments with explanations when necessary:
```typescript
// biome-ignore lint/correctness/useExhaustiveDependencies: <reason>
useEffect(() => {}, [])
```

### Navigation
- Use Expo Router's file-based routing
- For tab navigation: use `NativeTabs` from `expo-router/unstable-native-tabs`
- For stack navigation: use `Stack` with `Stack.Screen`
- Path aliases: `@/*` points to project root

### Best Practices
- **No commented-out code** - remove it
- Use functional components with hooks
- Implement loading states for async operations
- Use TypeScript interfaces for type safety
- Keep components focused and single-responsibility
- Use centralized colors from COLORS constant
- Avoid inline styles; prefer StyleSheet

### Development Notes
- APP_VARIANT environment variable controls build variants (development/preview/production)
- Expo Router typed routes enabled in app.config.ts
- React Compiler enabled (auto-memoization)
- Clerk for authentication with expo-secure-store
- KeyboardController for keyboard management

### Platform-Specific Files
- Files ending in `.web.tsx` are web-specific (see biome.json overrides)
- Use platform-specific code only when necessary

### Path Aliases
- `@/*` → project root (configured in tsconfig.json)
- Use for all local imports: `@/components/MyComponent`, `@/utils/Colors`
