
import { all } from 'redux-saga/effects';
import { watchExchangeRates } from './currenciesDetailes/sagas';
import { watchSeriesCurrency } from './currenciesByDates/sagas';

export function* rootSaga() {
    yield all([
        watchExchangeRates(),

        watchSeriesCurrency()
        // TODO Replace with a real saga.
    ]);
}
