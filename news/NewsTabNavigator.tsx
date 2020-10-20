import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { NewsText } from '../components/NewsText';
import { SearchNavigator } from './search/SearchStack';
import { TopNewsNavigator } from './top/TopNewsStack';
import { CategoriesNavigator } from './categories/CategoriesStack';
import { useTranslation } from 'react-i18next';

const TabBarIcon = (props: { name: string; color: string }) => {
  return <Ionicons size={30} {...props} />;
};

export type BottomTabScreens = {
  TopNews: undefined;
  Categories: undefined;
  Search: undefined;
};

const BottomTab = createBottomTabNavigator<BottomTabScreens>();

export const NewsTabNavigator = () => {
  const [t] = useTranslation('newsTranslations');

  return (
    <BottomTab.Navigator
      tabBarOptions={{ keyboardHidesTabBar: true }}
      initialRouteName="TopNews"
    >
      <BottomTab.Screen
        name="TopNews"
        component={TopNewsNavigator}
        options={{
          tabBarLabel: ({ focused }) => (
            <NewsText style={{ color: focused ? 'black' : 'grey' }}>
              {t('topNews')}
            </NewsText>
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name="ios-trending-up"
              color={focused ? 'black' : 'grey'}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Categories"
        component={CategoriesNavigator}
        options={{
          tabBarLabel: ({ focused }) => (
            <NewsText style={{ color: focused ? 'black' : 'grey' }}>
              {t('categories')}
            </NewsText>
          ),
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="file-tree"
              size={24}
              color={focused ? 'black' : 'grey'}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchNavigator}
        options={{
          tabBarLabel: ({ focused }) => (
            <NewsText style={{ color: focused ? 'black' : 'grey' }}>
              {t('search')}
            </NewsText>
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="ios-search" color={focused ? 'black' : 'grey'} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};
