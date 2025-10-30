import { ExpoConfig } from '@expo/config'

const IS_DEV = process.env.APP_VARIANT === 'development'
const IS_PREVIEW = process.env.APP_VARIANT === 'preview'

const getPlugins = (): ExpoConfig['plugins'] => {
	const plugins: ExpoConfig['plugins'] = [
		['expo-router', { origin: 'https://pocket-app.expo.app' }],
		[
			'expo-splash-screen',
			{
				image: './assets/images/splash-icon.png',
				imageWidth: 200,
				resizeMode: 'contain',
				backgroundColor: '#ffffff',
			},
		],
		'expo-font',
		'expo-web-browser',
		'react-native-legal',
		[
			'expo-dynamic-app-icon',
			{
				default: {
					image: './assets/images/icon.png',
					prerendered: true,
				},
				dark: {
					image: './assets/images/icon-dark.png',
					prerendered: true,
				},
				mono: {
					image: './assets/images/icon-mono.png',
					prerendered: true,
				},
			},
		],
		'expo-sqlite',
	] //add more plugins here for production purposes
	if (IS_DEV || IS_PREVIEW) {
		plugins.push(['expo-dev-client']) //add more plugins here for dev purposes
	}
	return plugins
}
