import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { NewsText } from '../components/NewsText';
import { FunctionComponent, useCallback } from 'react';
import { useRoute, RouteProp, useFocusEffect } from '@react-navigation/native';
import { RootStackScreens } from './NewsNavigation';
import { NewsArticleOverview } from './NewsArticleOverview';
import { useDispatch } from 'react-redux';
import { setCountryFilterEnabled } from './country-filter/countryFilterSlice';

type NewsArticleDetailsRoute = RouteProp<
  RootStackScreens,
  'NewsArticlesDetails'
>;
export const NewsArticleDetailsScreen: FunctionComponent = () => {
  const { params } = useRoute<NewsArticleDetailsRoute>();
  const {
    article: { title, image, description, content },
  } = params;
  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      dispatch(setCountryFilterEnabled(false));
      return () => {
        dispatch(setCountryFilterEnabled(true));
      };
    }, [dispatch]),
  );
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
