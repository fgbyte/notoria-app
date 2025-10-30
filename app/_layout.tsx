import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { Stack } from 'expo-router'
import { Text, View } from 'react-native'
import { KeyboardProvider } from 'react-native-keyboard-controller'

const Layout = () => {
	return (
		<Stack>
			<Stack.Screen name='index' options={{ headerShown: false }} />
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
