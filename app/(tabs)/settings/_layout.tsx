import { Stack } from 'expo-router'
import { COLORS } from '@/utils/Colors'

export default function SettingsLayout() {
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
					title: 'Settings',
					headerLargeTitle: true,
					headerLargeTitleShadowVisible: false,
				}}
			/>
		</Stack>
	)
}
