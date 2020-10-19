import { createStackNavigator } from '@react-navigation/stack';
import { SearchScreen } from './SearchScreen';
import * as React from 'react';
import { CountryFilter } from '../CountryFilter';
import { useTranslation } from 'react-i18next';

const SearchStack = createStackNavigator();

export const SearchNavigator = () => {
  const [t] = useTranslation('newsTranslations');

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
          headerRight: () => <CountryFilter />,
          headerTitle: t('search'),
        }}
      />
    </SearchStack.Navigator>
  );
};
