import { createStackNavigator } from '@react-navigation/stack';
import { SearchScreen } from './SearchScreen';
import * as React from 'react';
import { CountryFilter } from '../CountryFilter';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const SearchStack = createStackNavigator();

export const SearchNavigator = () => {
  const selectedCountry = useSelector(
    (state: RootState) => state.countryFilter.country,
  );
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
          headerTitle: `Search top news from ${selectedCountry}`,
        }}
      />
    </SearchStack.Navigator>
  );
};
