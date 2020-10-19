import { createStackNavigator } from '@react-navigation/stack';
import { TopNewsScreen } from './TopNewsScreen';
import * as React from 'react';
import { CountryFilter } from '../CountryFilter';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const TopNewsStack = createStackNavigator();

export const TopNewsNavigator = () => {
  const selectedCountry = useSelector((state: RootState) =>
    state.countryFilter.country === 'GB' ? 'US' : 'GB',
  );
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
          headerRight: () => <CountryFilter />,
          headerTitleAlign: 'left',
          headerTitle: `Top News from ${selectedCountry}`,
        }}
      />
    </TopNewsStack.Navigator>
  );
};
