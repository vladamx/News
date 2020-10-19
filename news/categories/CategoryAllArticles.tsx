import * as React from 'react';
import { FunctionComponent } from 'react';
import { NewsArticles } from '../NewsArticles';
import { RouteProp, useRoute } from '@react-navigation/native';
import { CategoriesStackScreens } from './CategoriesStack';
import { View, StyleSheet } from 'react-native';

type CategoryAllArticlesRoute = RouteProp<
  CategoriesStackScreens,
  'CategoryAllArticles'
>;

export const CategoryAllArticles: FunctionComponent = () => {
  const {
    params: { name },
  } = useRoute<CategoryAllArticlesRoute>();

  return (
    <View style={styles.screen}>
      <NewsArticles filter={{ tag: 'category', name, page: 1 }} />
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
