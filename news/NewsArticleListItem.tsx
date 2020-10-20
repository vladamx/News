import * as React from 'react';
import { FunctionComponent, memo } from 'react';
import { NewsArticle } from './data/newsArticle';
import { useNavigation } from '@react-navigation/native';
import { NewsArticleOverview } from './NewsArticleOverview';
import { StyleSheet, View } from 'react-native';

export const NewsArticleListItem: FunctionComponent<NewsArticle> = memo(
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

export const articleListItemRender = ({
  item,
}: {
  item: NewsArticle;
  index: number;
}) => <NewsArticleListItem {...item} />;

export const articleListItemSeparator = () => (
  <View style={styles.itemSeparator} />
);

const styles = StyleSheet.create({
  itemSeparator: {
    height: 20,
  },
});
