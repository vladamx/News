import * as React from 'react';
import { FlatList, StyleSheet, View, Image } from 'react-native';
import { NewsArticle } from './newsArticle';
import { NewsArticleOverview } from './NewsArticleOverview';
import { NewsText } from '../components/NewsText';
import { FunctionComponent, useEffect } from 'react';
import { useNewsArticles } from './useNewsArticles';
import { NewsError } from '../components/NewsError';
import { log } from '../logger';
import { useNavigation } from '@react-navigation/native';
import { FilterForm } from './filterForm';

const Item: FunctionComponent<NewsArticle> = ({
  title,
  description,
  image,
  content,
}) => {
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
      overview={{ title, image, description }}
    />
  );
};

const renderItem = ({ item }: { item: NewsArticle; index: number }) => (
  <Item {...item} />
);

const itemSeparator = () => <View style={styles.itemSeparator} />;

export const NewsArticles: FunctionComponent<{ filter?: FilterForm }> = ({
  filter,
}) => {
  const { data: articles, error, loading } = useNewsArticles('gb', filter);

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
        keyboardShouldPersistTaps="always"
        initialNumToRender={4}
        maxToRenderPerBatch={6}
        showsVerticalScrollIndicator={false}
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
