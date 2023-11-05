import { createSelector } from 'reselect';
import { AppState } from '../reducers';

export const getCountriesState = createSelector((state: AppState) => state, ({ exchangeRates }) => exchangeRates);
export const getCurrenciesListSelector = createSelector(getCountriesState, ({ currenciesList }) => currenciesList);
export const getLoadingSelector = createSelector(getCountriesState, ({ loading }) => loading);
