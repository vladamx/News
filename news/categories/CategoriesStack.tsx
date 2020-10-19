import { createStackNavigator } from '@react-navigation/stack';
import { CategoriesScreen } from './CategoriesScreen';
import { CategoryAllArticles } from './CategoryAllArticles';
import * as React from 'react';
import { CountryFilter } from '../CountryFilter';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export type CategoriesStackScreens = {
  Categories: undefined;
  CategoryAllArticles: { name: string };
};

const CategoriesStack = createStackNavigator<CategoriesStackScreens>();

export const CategoriesNavigator = () => {
  const selectedCountry = useSelector(
    (state: RootState) => state.countryFilter.country,
  );
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
          headerRight: () => <CountryFilter />,
          headerTitleAlign: 'left',
          headerTitle: `Top 5 news from ${selectedCountry}`,
        }}
      />
      <CategoriesStack.Screen
        name="CategoryAllArticles"
        component={CategoryAllArticles}
        options={({ route }) => ({
          title: `${
            route.params?.name ?? 'Category Articles'
          } in ${selectedCountry}`,
          headerBackTitle: 'Back',
          headerTintColor: 'black',
          headerBackTitleStyle: {
            color: 'black',
            fontFamily: 'open-sans',
          },
          headerRight: () => <CountryFilter />,
          headerShown: true,
        })}
      />
    </CategoriesStack.Navigator>
  );
};
