import { useEffect, useState } from 'react'
import {
	ActivityIndicator,
	FlatList,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import { COLORS } from '@/utils/Colors'

interface ArticlesFeedProps {
	maxItems?: number
	feedSource?: 'expo' | 'react-native'
	title?: string
}

interface RssArticle {
	id: string
	title: string
	url: string
	description: string
	publishedDate: string
	category: string
	image: string
	source: string
	estimatedReadTime: number
}

const ArticlesFeed = ({
	maxItems = 10,
	feedSource = 'react-native',
	title = 'React Native Articles',
}) => {
	const [isRefreshing, setIsRefreshing] = useState(false)
	const [articles, setArticles] = useState<RssArticle[]>([])
	const [isLoading, setIsLoading] = useState(false)

	// biome-ignore lint/correctness/useExhaustiveDependencies: <idn>
	useEffect(() => {
		fetchFreshArticles()
	}, [])

	const fetchFreshArticles = async () => {
		try {
			setIsLoading(true)
			const response = await fetch(`/api/rss-feed?url=${feedSource}`)
			const result = await response.json()
			// console.log('🚀 ~ fetchFreshArticles ~ result:', result)
			if (result.success) {
				//save the data
				setArticles(result.data.items)
			}
		} catch (err) {
			console.error(err)
		} finally {
			setIsLoading(false)
		}
	}

	const handleSaveArticle = async () => {}

	const handleRefresh = async () => {}

	if (isLoading || articles.length === 0) {
		return (
			<View style={styles.container}>
				<View style={styles.loadingContainer}>
					<ActivityIndicator size='small' color={COLORS.primary} />
					<Text style={styles.loadingText}>Loading Articles...</Text>
				</View>
			</View>
		)
	}

	const renderItem = ({
		item,
		index,
	}: {
		item: RssArticle
		index: number
	}) => {}

	return (
		<FlatList
			data={articles}
			renderItem={({ item }) => <Text>{item.title}</Text>}
			keyExtractor={(item) => item.id}
			contentContainerStyle={{ flex: 1 }}
			contentInsetAdjustmentBehavior='automatic'
			onRefresh={handleRefresh}
			refreshing={isRefreshing}
			showsVerticalScrollIndicator={false}
		/>
	)
}

export default ArticlesFeed

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.white,
	},
	loadingContainer: {
		padding: 20,
		alignItems: 'center',
	},
	loadingText: {
		color: COLORS.textGray,
	},
})
