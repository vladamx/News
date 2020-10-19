import * as React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { NewsArticle } from '../newsArticle';
import { NewsArticleOverview } from '../NewsArticleOverview';
import { NewsText } from '../../components/NewsText';
import {
  FunctionComponent,
  useEffect,
  useRef,
  useState,
  memo,
  useCallback,
} from 'react';
import { useNewsArticles } from '../useNewsArticles';
import { NewsError } from '../../components/NewsError';
import { log } from '../../logger';
import { useNavigation } from '@react-navigation/native';
import { categoryConfig } from './config';
import { Category } from './category';
import { CategoryForm } from '../filterForm';

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

export const CategoryTopArticles: FunctionComponent<{
  category: CategoryForm;
  viewability: Record<Category, boolean>;
}> = ({ category, viewability }) => {
  const [categoryForm] = useState(category);
  const { data: articles, error, loading } = useNewsArticles(categoryForm);
  const listRef = useRef<FlatList<NewsArticle> | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!viewability[category.name] && intervalRef.current) {
      log.debug(`Category list: cleared interval for ${category.name}`);
      clearInterval(intervalRef.current);
    }
    return () => {};
  }, [viewability, category]);

  useEffect(() => {
    if (!listRef.current && !articles?.length) {
      return () => {};
    }
    if (!viewability[category.name]) {
      return () => {};
    }
    let index = -1;
    intervalRef.current = setInterval(() => {
      if (index >= 0) {
        requestAnimationFrame(() =>
          listRef.current?.scrollToIndex({ index: index }),
        );
      }
      index += 1;
      if (index === articles?.length) {
        index = 0;
      }
    }, 2000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [viewability, category, articles]);

  const onScrollToIndexFailed = useCallback(() => {
    // NOTE: Here we could implement some sophisticated retry logic
    log.info('Scroll to index failed');
  }, []);

  // NOTE: In real production app, we would probably need
  // to implement timeouts and retries
  // in order to mitigate indefinite loading states
  // and network segregation problems

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
        ItemSeparatorComponent={itemSeparator}
        ListEmptyComponent={<NewsText>No News Available :(</NewsText>}
        data={articles}
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
