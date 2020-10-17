import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { SearchScreen } from '../news/search';
import { TopNewsScreen } from '../news/top';
import { CategoriesScreen } from '../news/categories';
import { NewsText } from '../components/NewsText';
import { CategoryAllArticles } from '../news/categories/CategoryAllArticles';

export type BottomTabScreens = {
  TopNews: undefined;
  Categories: undefined;
  Search: undefined;
};

const BottomTab = createBottomTabNavigator<BottomTabScreens>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator initialRouteName="TopNews">
      <BottomTab.Screen
        name="TopNews"
        component={TopNewsNavigator}
        options={{
          tabBarLabel: ({ focused }) => (
            <NewsText style={{ color: focused ? 'black' : 'grey' }}>
              Top News
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
              Categories
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
              Search
            </NewsText>
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="ios-search" color={focused ? 'black' : 'grey'} />
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
        options={{
          headerTitleStyle: {
            fontFamily: 'open-sans-semi-bold',
            fontWeight: '600',
          },
          headerTitleAlign: 'left',
          headerTitle: 'Top News from GB',
        }}
      />
    </TopNewsStack.Navigator>
  );
}

export type CategoriesStackScreens = {
  Categories: undefined;
  CategoryAllArticles: { name: string };
};

const CategoriesStack = createStackNavigator<CategoriesStackScreens>();

function CategoriesNavigator() {
  return (
    <CategoriesStack.Navigator>
      <CategoriesStack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          headerTitleStyle: {
            fontFamily: 'open-sans-semi-bold',
            fontWeight: '600',
          },
          headerTitleAlign: 'left',
          headerTitle: 'Top 5 news from GB',
        }}
      />
      <CategoriesStack.Screen
        name="CategoryAllArticles"
        component={CategoryAllArticles}
        options={({ route }) => ({
          title: route.params?.name ?? 'Category Articles',
          headerBackTitle: 'Back',
          headerTintColor: 'black',
          headerBackTitleStyle: {
            color: 'black',
            fontFamily: 'open-sans',
          },
          headerShown: true,
        })}
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
        options={{
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontFamily: 'open-sans-semi-bold',
            fontWeight: '600',
          },
          headerTitle: 'Search Top News from GB',
        }}
      />
    </SearchStack.Navigator>
  );
}
