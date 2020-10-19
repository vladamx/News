import * as React from 'react';
import { Image, StyleSheet } from 'react-native';
import { FunctionComponent } from 'react';
import { Country } from './country';

const itFlag = require('../assets/images/IT.png');
const usFlag = require('../assets/images/US.png');

export const CountryDisplay: FunctionComponent<{ country: Country }> = ({
  country,
}) => {
  return (
    <Image
      style={[
        {
          width: 32,
          height: 24,
        },
        styles.countryFilter,
      ]}
      source={country === 'IT' ? itFlag : usFlag}
    />
  );
};

const styles = StyleSheet.create({
  countryFilter: { marginRight: 15, marginLeft: 10 },
});
