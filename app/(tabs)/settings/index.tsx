import { useAuth, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { Button, ScrollView, Text, TouchableOpacity, View } from 'react-native'

const SettingsPage = () => {
	const { isSignedIn, signOut } = useAuth()
	const { user } = useUser()

	return (
		<ScrollView
			contentContainerStyle={{ flex: 1 }}
			contentInsetAdjustmentBehavior='automatic'
		>
			<Text>Your account: {user?.emailAddresses[0].emailAddress}</Text>
			{isSignedIn && <Button title='Sign out' onPress={() => signOut()} />}

			{!isSignedIn && (
				<Link href='/' replace asChild>
					<TouchableOpacity>
						<Text>Sign up or Sign in</Text>
					</TouchableOpacity>
				</Link>
			)}
		</ScrollView>
	)
}

export default SettingsPage
