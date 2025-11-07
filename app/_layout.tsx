import { ClerkProvider, useAuth } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { Redirect, Stack } from 'expo-router'
import { KeyboardProvider } from 'react-native-keyboard-controller'

const Layout = () => {
	const { isSignedIn } = useAuth()

	return (
		<Stack>
			<Stack.Protected guard={!isSignedIn}>
				<Stack.Screen name='index' options={{ headerShown: false }} />
			</Stack.Protected>

			<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
		</Stack>
	)
}

const RootLayout = () => {
	return (
		<ClerkProvider tokenCache={tokenCache}>
			<KeyboardProvider>
				<Layout />
			</KeyboardProvider>
		</ClerkProvider>
	)
}

export default RootLayout
