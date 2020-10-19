import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCountry } from './countryFilterSlice';
import { RootState } from '../store';
import { CountryDisplay } from './CountryDisplay';

export const CountryFilter: FunctionComponent = () => {
  const dispatch = useDispatch();
  const country = useSelector((state: RootState) =>
    state.countryFilter.country === 'GB' ? 'US' : 'GB',
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
      }}
    >
      <CountryDisplay country={country} />
    </TouchableOpacity>
  );
};
