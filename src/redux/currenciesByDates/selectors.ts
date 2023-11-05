import { createSelector } from 'reselect';
import { AppState } from '../reducers';

export const getCurrenciesState = createSelector((state: AppState) => state, ({ curreniesValues }) => curreniesValues);
export const getCurrenciesListSelector = createSelector(getCurrenciesState, ({ selectedCurrencies }) => selectedCurrencies);
export const getLoadingSelector = createSelector(getCurrenciesState, ({ loading }) => loading);
