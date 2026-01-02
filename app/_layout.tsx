import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Stack } from "expo-router";
import { KeyboardProvider } from "react-native-keyboard-controller";
import "../global.css";

const Layout = () => {
  const { isSignedIn } = useAuth();

  return (
    <Stack>
      {/* Public routes */}
      <Stack.Protected guard={!isSignedIn}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack.Protected>

      {/* Protected routes */}
      <Stack.Protected guard={isSignedIn ?? false}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
};

const RootLayout = () => {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <KeyboardProvider>
        <Layout />
      </KeyboardProvider>
    </ClerkProvider>
  );
};

export default RootLayout;
