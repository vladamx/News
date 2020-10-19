import * as React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { NewsArticle } from './newsArticle';
import { NewsArticleOverview } from './NewsArticleOverview';
import { NewsText } from '../components/NewsText';
import { FunctionComponent, memo } from 'react';
import { useNewsArticles } from './useNewsArticles';
import { NewsError } from '../components/NewsError';
import { useNavigation } from '@react-navigation/native';
import { FilterForm } from './filterForm';

const Item: FunctionComponent<NewsArticle> = memo(
  ({ title, description, image, content }) => {
    const navigation = useNavigation();
    return (
      <NewsArticleOverview
        onPress={() => {
          navigation.navigate('NewsArticlesDetails', {
            name: title,
            article: {
              title,
              description,
              image,
              content,
            },
          });
        }}
        {...{ title, image, description }}
      />
    );
  },
);

const renderItem = ({ item }: { item: NewsArticle; index: number }) => (
  <Item {...item} />
);

const itemSeparator = () => <View style={styles.itemSeparator} />;

export const NewsArticles: FunctionComponent<{ filter?: FilterForm }> = ({
  filter,
}) => {
  const {
    initialLoading,
    data: articles,
    error,
    refreshing,
    loadMore,
    onRefresh,
  } = useNewsArticles(filter);

  // NOTE: In real production app, we would probably need
  // to implement timeouts and retries
  // in order to mitigate indefinite loading states
  // and network segregation problems

  if (initialLoading) {
    return <NewsText>Loading ...</NewsText>;
  }

  if (error) {
    return <NewsError reason={error.reason} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        scrollEnabled
        keyboardShouldPersistTaps="always"
        initialNumToRender={4}
        maxToRenderPerBatch={6}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={itemSeparator}
        ListEmptyComponent={<NewsText>No News Available :(</NewsText>}
        data={articles}
        onRefresh={onRefresh}
        refreshing={refreshing}
        onEndReachedThreshold={0}
        onEndReached={loadMore}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.articleId}${index}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemSeparator: {
    height: 20,
  },
});
