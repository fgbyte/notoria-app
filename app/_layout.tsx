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
		<KeyboardProvider>
			<Layout />
		</KeyboardProvider>
	)
}

export default RootLayout
