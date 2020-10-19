import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import { NewsArticleDetailsScreen } from './NewsArticleDetailsScreen';
import { NewsArticle } from './newsArticle';
import { NewsTabNavigator } from './NewsTabNavigator';
import { useTranslation } from 'react-i18next';
import { ellipsis } from '../util/ellipsis';

export type RootStackScreens = {
  Root: undefined;
  NewsArticlesDetails: { name: string; article: NewsArticle };
};

export const NewsNavigation = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackScreens>();

const RootNavigator = () => {
  const [t] = useTranslation('newsTranslations');

  return (
    <Stack.Navigator mode={'modal'} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={NewsTabNavigator} />
      <Stack.Screen
        name="NewsArticlesDetails"
        options={({ route }) => ({
          // NOTE: ellipsis necessary to fit back title properly
          title: ellipsis(route.params?.name ?? 'Placeholder', 15),
          headerBackTitle: t('back'),
          headerTintColor: 'black',
          headerBackTitleStyle: {
            color: 'black',
            fontFamily: 'open-sans',
          },
          headerShown: true,
        })}
        component={NewsArticleDetailsScreen}
      />
    </Stack.Navigator>
  );
};
