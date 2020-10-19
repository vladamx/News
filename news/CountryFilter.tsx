import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCountry } from './countryFilterSlice';
import { RootState } from '../store';
import { CountryDisplay } from './CountryDisplay';
import i18n from 'i18next';
import { log } from '../logger';

export const CountryFilter: FunctionComponent = () => {
  const dispatch = useDispatch();
  const country = useSelector((state: RootState) =>
    state.countryFilter.country === 'US' ? 'IT' : 'US',
  );
  const countryEnabled = useSelector(
    (state: RootState) => state.countryFilter.enabled,
  );
  if (!countryEnabled) {
    return null;
  }
  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(toggleCountry());
        return i18n
          .changeLanguage(country.toLowerCase())
          .catch((err) => log.error(err));
      }}
    >
      <CountryDisplay country={country} />
    </TouchableOpacity>
  );
};
