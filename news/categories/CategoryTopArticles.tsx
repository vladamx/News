import * as React from 'react';
import { FlatList, StyleSheet, View, Image } from 'react-native';
import { NewsArticle } from '../newsArticle';
import { NewsArticleOverview } from '../NewsArticleOverview';
import { NewsText } from '../../components/NewsText';
import { FunctionComponent, useEffect, useRef, useState, memo } from 'react';
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
  const { data: articles, error, loading } = useNewsArticles(
    'gb',
    categoryForm,
  );
  const listRef = useRef<FlatList<NewsArticle> | null>(null);
  const intervalRef = useRef<number | null>(null);
  useEffect(() => {
    if (!articles) {
      return;
    }
    articles.forEach(({ image }) => {
      Image.prefetch(image).catch(() =>
        log.debug('News articles image prefetch unsuccessful'),
      );
    });
  }, [articles]);

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
        listRef.current?.scrollToIndex({ index: index });
      }
      index += 1;
      if (index === articles?.length) {
        index = 0;
      }
    }, 1500);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [viewability, category, articles]);

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
