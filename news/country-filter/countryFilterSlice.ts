import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Country } from './country';

interface CountryFilterState {
  country: Country;
  enabled: boolean;
}

const initialState: CountryFilterState = {
  country: 'US',
  enabled: true,
};

export const countryFilterSlice = createSlice({
  initialState,
  name: 'countryFilter',
  reducers: {
    toggleCountry: (state) => {
      state.country = state.country === 'US' ? 'IT' : 'US';
    },
    setCountryFilterEnabled: (state, { payload }: PayloadAction<boolean>) => {
      state.enabled = payload;
    },
  },
});

export const {
  toggleCountry,
  setCountryFilterEnabled,
} = countryFilterSlice.actions;
