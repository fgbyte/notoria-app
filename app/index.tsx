import { Redirect } from 'expo-router'
import { Text, View } from 'react-native'
import { KeyboardAvoidingView } from 'react-native-keyboard-controller'

const Page = () => {
	// return <Redirect href={'/(tabs)/saves'} />
	return (
		<KeyboardAvoidingView
			behavior='padding'
			style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
		>
			<Text>Index Page</Text>
		</KeyboardAvoidingView>
	)
}

export default Page
