
import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import exchangeRatesReducer from './currenciesDetailes/reducer';
import currencyByDatesReducer from './currenciesByDates/reducer';

export const reducers = combineReducers({
    exchangeRates: exchangeRatesReducer,
    curreniesValues: currencyByDatesReducer,
});

export type AppState = StateType<typeof reducers>;
