import { createStackNavigator } from '@react-navigation/stack';
import { TopNewsScreen } from './TopNewsScreen';
import * as React from 'react';
import { CountryFilter } from '../CountryFilter';
import { useTranslation } from 'react-i18next';

const TopNewsStack = createStackNavigator();

export const TopNewsNavigator = () => {
  const [t] = useTranslation('newsTranslations');

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
          headerTitle: t('topNews'),
        }}
      />
    </TopNewsStack.Navigator>
  );
};
