import * as React from 'react';
import { FunctionComponent, useCallback, useRef, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { NewsText } from '../../components/NewsText';
import { useNewsArticles } from '../useNewsArticles';
import { NewsError } from '../../components/NewsError';
import { log } from '../../logger';
import { categoryConfig } from './categoryConfig';
import { Category } from './category';
import { CategoryForm } from '../data/filterForm';
import {
  articleListItemRender,
  articleListItemSeparator,
} from '../NewsArticleListItem';
import { useCategorySlider } from './useCategorySlider';
import { NewsArticle } from '../data/newsArticle';

export const CategoryTopArticles: FunctionComponent<{
  category: CategoryForm;
  viewability: Record<Category, boolean>;
}> = ({ category, viewability }) => {
  const [categoryForm] = useState(category);
  const { data: articles, error, loading } = useNewsArticles(categoryForm);
  const listRef = useRef<FlatList<NewsArticle> | null>(null);
  useCategorySlider(category, articles, viewability, listRef);

  const onScrollToIndexFailed = useCallback(() => {
    // NOTE: Here we could implement some sophisticated retry logic
    log.info('Scroll to index failed');
  }, []);

  if (loading) {
    return <NewsText>Loading ...</NewsText>;
  }

  if (error) {
    return <NewsError reason={error.reason} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        scrollEnabled
        ref={(ref) => {
          listRef.current = ref;
        }}
        horizontal={true}
        onScrollToIndexFailed={onScrollToIndexFailed}
        initialNumToRender={categoryConfig.topLimit}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={articleListItemSeparator}
        ListEmptyComponent={<NewsText>No News Available :(</NewsText>}
        data={articles}
        renderItem={articleListItemRender}
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
});
