import FontAwesome from '@expo/vector-icons/FontAwesome'
import {
	Icon,
	Label,
	NativeTabs,
	VectorIcon,
} from 'expo-router/unstable-native-tabs'
import { COLORS } from '@/utils/Colors'

export default function RootLayout() {
	return (
		<NativeTabs
			backgroundColor={COLORS.itemBackground}
			tintColor={COLORS.red}
			disableIndicator
		>
			<NativeTabs.Trigger name='home'>
				<Label>Home</Label>
				<Icon src={<VectorIcon family={FontAwesome} name='home' />} />
			</NativeTabs.Trigger>
			<NativeTabs.Trigger name='saves'>
				<Label>Saves</Label>
				<Icon src={<VectorIcon family={FontAwesome} name='bookmark' />} />
			</NativeTabs.Trigger>
			<NativeTabs.Trigger name='settings'>
				<Label>Settings</Label>
				<Icon src={<VectorIcon family={FontAwesome} name='gear' />} />
			</NativeTabs.Trigger>
		</NativeTabs>
	)
}
