import { ScrollView, Text, View } from 'react-native'

export default function Home() {
	return (
		<ScrollView
			contentInsetAdjustmentBehavior='automatic'
			contentContainerStyle={{ flex: 1 }}
		>
			<Text>Home</Text>
		</ScrollView>
	)
}
