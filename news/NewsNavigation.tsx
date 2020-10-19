import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

export type RootStackScreens = {
  Root: undefined;
  NewsArticlesDetails: { name: string; article: NewsArticle };
};

import { NewsArticleDetailsScreen } from './NewsArticleDetailsScreen';
import { NewsArticle } from './newsArticle';
import { NewsTabNavigator } from './NewsTabNavigator';

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
  return (
    <Stack.Navigator mode={'modal'} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={NewsTabNavigator} />
      <Stack.Screen
        name="NewsArticlesDetails"
        options={({ route }) => ({
          title: route.params?.name ?? 'Article Details',
          headerBackTitle: 'Back',
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
