import { createStackNavigator } from '@react-navigation/stack';
import { CategoriesScreen } from './CategoriesScreen';
import { CategoryAllArticles } from './CategoryAllArticles';
import * as React from 'react';
import { CountryFilter } from '../country-filter/CountryFilter';
import { useTranslation } from 'react-i18next';

export type CategoriesStackScreens = {
  Categories: undefined;
  CategoryAllArticles: { name: string };
};

const CategoriesStack = createStackNavigator<CategoriesStackScreens>();

export const CategoriesNavigator = () => {
  const [t] = useTranslation('newsTranslations');

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
          headerTitle: t('topNews'),
        }}
      />
      <CategoriesStack.Screen
        name="CategoryAllArticles"
        component={CategoryAllArticles}
        options={({ route }) => ({
          title: `${route.params?.name ?? 'Placeholder'}`,
          headerBackTitle: t('back'),
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
