import { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withRepeat,
	withSequence,
	withTiming,
} from 'react-native-reanimated'
import ArticlesFeed from '@/components/articles-feed'
import { COLORS } from '@/utils/Colors'

export default function Home() {
	const [isLoading, setIsLoading] = useState(false)

	const translateY1 = useSharedValue(0)
	const translateY2 = useSharedValue(0)
	const translateY3 = useSharedValue(0)

	const animatedStyle1 = useAnimatedStyle(() => ({
		transform: [{ translateY: translateY1.value }],
	}))
	const animatedStyle2 = useAnimatedStyle(() => ({
		transform: [{ translateY: translateY2.value }],
	}))
	const animatedStyle3 = useAnimatedStyle(() => ({
		transform: [{ translateY: translateY3.value }],
	}))

	useEffect(() => {
		if (isLoading) {
			const bounceSequence = withSequence(
				withTiming(-35, {
					duration: 350,
					easing: Easing.out(Easing.quad),
				}),
				withTiming(0, {
					duration: 350,
					easing: Easing.out(Easing.quad),
				}),
				withTiming(0, {
					duration: 800,
				}),
			)

			translateY1.value = withRepeat(bounceSequence, -1, true)
			translateY2.value = withDelay(150, withRepeat(bounceSequence, -1, true))
			translateY3.value = withDelay(300, withRepeat(bounceSequence, -1, true))
		} else {
			translateY1.value = withTiming(0, { duration: 300 })
			translateY2.value = withTiming(0, { duration: 300 })
			translateY3.value = withTiming(0, { duration: 300 })
		}
	}, [isLoading, translateY3, translateY2, translateY1])

	if (isLoading) {
		return (
			<ScrollView
				contentInsetAdjustmentBehavior='automatic'
				contentContainerStyle={styles.container}
			>
				<View style={styles.container}>
					<View style={styles.loadingContainer}>
						<View style={styles.loadingShapes}>
							<Animated.View
								style={[styles.shape, styles.circle, animatedStyle1]}
							/>
							<Animated.View style={[styles.triangle, animatedStyle2]} />
							<Animated.View
								style={[styles.shape, styles.square, animatedStyle3]}
							/>
						</View>
						<Text style={styles.loadingText}>Loading...</Text>
					</View>
				</View>
			</ScrollView>
		)
	}

	return (
		<ArticlesFeed
			maxItems={15}
			feedSource='react-native'
			title='React Native Articles'
		/>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.white,
		marginTop: 20,
	},
	content: {
		flex: 1,
		paddingHorizontal: 30,
	},
	loadingContainer: {
		alignItems: 'center',
	},
	loadingShapes: {
		flexDirection: 'row',
		gap: 20,
		alignItems: 'center',
		marginBottom: 20,
	},
	loadingText: {
		fontSize: 18,
		fontWeight: 500,
		color: COLORS.textGray,
	},
	shape: {
		width: 40,
		height: 40,
		backgroundColor: 'red',
	},
	circle: {
		backgroundColor: '#E85A4F',
		borderRadius: 20,
	},
	triangle: {
		borderStyle: 'solid',
		borderBottomColor: '#F4A261',
		borderLeftWidth: 20,
		borderRightWidth: 20,
		borderBottomWidth: 35,
		borderLeftColor: 'transparent',
		borderRightColor: 'transparent',
	},
	square: {
		backgroundColor: '#2A9D8F',
	},
})
