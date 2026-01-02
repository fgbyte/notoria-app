import { useEffect, useState } from 'react'
import {
	ActivityIndicator,
	FlatList,
	Image,
	Linking,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import { COLORS } from '@/utils/Colors'

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

interface ArticleCardProps {
	article: RssArticle
	onSave: (article: RssArticle) => void
	variant?: 'featured' | 'compact'
}

const ArticleCard = ({
	article,
	onSave,
	variant = 'compact',
}: ArticleCardProps) => {
	const hasImage = article.image && article.image !== 'none'

	const handlePress = () => {
		if (article.url) {
			Linking.openURL(article.url)
		}
	}

	if (variant === 'featured') {
		return (
			<TouchableOpacity onPress={handlePress} style={styles.featuredCard}>
				{hasImage && (
					<Image source={{ uri: article.image }} style={styles.featuredImage} />
				)}
				<View style={styles.featuredContent}>
					<Text style={styles.featuredTitle}>{article.title}</Text>
				</View>

				<View style={styles.cardActions}>
					<View style={styles.featuredMeta}>
						<Text style={styles.metaText}>{article.source}</Text>
						<Text>{article.estimatedReadTime}</Text>
					</View>
					<TouchableOpacity
						style={styles.saveButton}
						onPress={(e) => {
							e.stopPropagation()
							onSave(article)
						}}
					>
						<Image
							source={require('@/assets/images/notoria-icon.png')}
							style={{ width: 20, height: 20 }}
						/>
						<Text style={styles.metaText}>Save</Text>
					</TouchableOpacity>
				</View>
			</TouchableOpacity>
		)
	}

	return (
		<View>
			<Text>{article.title}</Text>
		</View>
	)
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

	const renderHeader = () => {
		return (
			<View style={styles.sectionHeader}>
				<Text style={styles.sectionTitle}>{title}</Text>
			</View>
		)
	}

	const renderItem = ({ item, index }: { item: RssArticle; index: number }) => {
		if (index === 0) {
			return (
				<>
					{renderHeader()}
					<ArticleCard
						variant='featured'
						article={item}
						onSave={handleSaveArticle}
					/>
					<View style={styles.separator} />
					{articles.length > 0 && (
						<ScrollView>
							{articles.slice(1).map((article) => (
								<View key={article.id} style={styles.compactCardWrapper}>
									<ArticleCard
										variant='compact'
										article={article}
										onSave={handleSaveArticle}
									/>
								</View>
							))}
						</ScrollView>
					)}
				</>
			)
		}
		return null
	}

	return (
		<FlatList
			data={articles}
			renderItem={renderItem}
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
	sectionHeader: {
		padding: 20,
		paddingBottom: 8,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: 600,
		color: COLORS.textDark,
	},
	separator: {
		height: 1,
	},
	compactCardWrapper: {
		padding: 16,
		borderRadius: 8,
		backgroundColor: COLORS.white,
		elevation: 2,
		marginBottom: 16,
	},
	// Featured card styles
	featuredCard: {
		backgroundColor: COLORS.white,
		borderRadius: 12,
		overflow: 'hidden',
		marginLeft: 20,
		marginRight: 20,
		boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)',
		elevation: 4,
	},
	featuredImage: {
		width: '100%',
		height: 200,
		backgroundColor: '#f5f5f5',
	},
	featuredContent: {
		padding: 16,
	},
	featuredTitle: {
		fontSize: 20,
		fontWeight: '700',
		color: COLORS.textDark,
		lineHeight: 26,
		marginBottom: 8,
	},
	featuredMeta: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	// Shared styles
	metaText: {
		fontSize: 12,
		color: COLORS.textGray,
		marginRight: 4,
	},
	cardActions: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
		paddingBottom: 10,
	},
	saveButton: {
		flexDirection: 'row',
		gap: 8,
		alignItems: 'center',
		backgroundColor: '#f8f8f8',
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 16,
	},
})
