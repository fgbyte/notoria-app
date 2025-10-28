import { Stack } from 'expo-router'
import { Text, View } from 'react-native'

const Layout = () => {
	return (
		<Stack>
			<Stack.Screen name='index' options={{ headerShown: false }} />
			<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
		</Stack>
	)
}

export default Layout
