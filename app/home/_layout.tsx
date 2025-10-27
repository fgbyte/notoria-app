import { Stack } from 'expo-router'
import { COLORS } from '@/utils/Colors'

export default function HomeLayout() {
	return (
		<Stack
			screenOptions={{
				contentStyle: {
					backgroundColor: COLORS.white,
				},
			}}
		>
			<Stack.Screen
				name='index'
				options={{
					// headerShown: false,
					title: 'Home',
					headerLargeTitle: true,
					headerLargeTitleShadowVisible: false,
				}}
			/>
		</Stack>
	)
}
