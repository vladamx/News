import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { NewsText } from '../components/NewsText';
import { FunctionComponent } from 'react';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackScreens } from '../navigation';
import { NewsArticleOverview } from './NewsArticleOverview';

type NewsArticleDetailsRoute = RouteProp<
  RootStackScreens,
  'NewsArticlesDetails'
>;
export const NewsArticleDetailsScreen: FunctionComponent = () => {
  const { params } = useRoute<NewsArticleDetailsRoute>();
  const {
    article: { title, image, description, content },
  } = params;
  return (
    <View style={styles.overviewContainer}>
      <NewsArticleOverview {...{ title, image, description }} />
      <NewsText style={styles.content}>{content}</NewsText>
    </View>
  );
};

const styles = StyleSheet.create({
  overviewContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    marginTop: 20,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  overviewTitle: { marginBottom: 10 },
  overviewImage: { marginBottom: 10 },
});
