import { Action, combineReducers, configureStore } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { countryFilterSlice } from './news/countryFilterSlice';

export const rootReducer = combineReducers({
  countryFilter: countryFilterSlice.reducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export const store = configureStore({ reducer: rootReducer });
