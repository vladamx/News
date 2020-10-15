import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { SearchScreen } from '../news/search';
import { TopNewsScreen } from '../news/top';
import { CategoriesScreen } from '../news/categories';

export type BottomTabScreens = {
  'Top News': undefined;
  Categories: undefined;
  Search: undefined;
};

const BottomTab = createBottomTabNavigator<BottomTabScreens>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator initialRouteName="Top News">
      <BottomTab.Screen
        name="Top News"
        component={TopNewsNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-trending-up" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Categories"
        component={CategoriesNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="file-tree" size={24} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-search" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TopNewsStack = createStackNavigator();

function TopNewsNavigator() {
  return (
    <TopNewsStack.Navigator>
      <TopNewsStack.Screen
        name="TopNewsScreen"
        component={TopNewsScreen}
        options={{ headerTitle: 'Top News from GB' }}
      />
    </TopNewsStack.Navigator>
  );
}

const CategoriesStack = createStackNavigator();

function CategoriesNavigator() {
  return (
    <CategoriesStack.Navigator>
      <CategoriesStack.Screen
        name="CategoriesScreen"
        component={CategoriesScreen}
        options={{
          headerTitle: 'Top 5 news from GB',
        }}
      />
    </CategoriesStack.Navigator>
  );
}

const SearchStack = createStackNavigator();

function SearchNavigator() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ headerTitle: 'Search Top News from GB by term' }}
      />
    </SearchStack.Navigator>
  );
}
