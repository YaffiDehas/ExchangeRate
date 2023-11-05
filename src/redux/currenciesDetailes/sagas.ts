import {
    all,
    call,
    takeLatest,
    put
} from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import {
    getType,
} from 'typesafe-actions';
import { getCountries, getCurrencies } from './api';
import * as actions from './actions';
import { SelectedCurrencies } from '../utils';
import { Currency2 } from './types';


export function* requestGetCurrenciesList() {
    try {
        const currenciesList: any = [];
        const response: AxiosResponse<any> = yield call(getCurrencies);
        SelectedCurrencies.map((currency: string) => {
            const selectedCurrency: any = response.data.exchangeRates.filter((country: any) => country.key === currency);
            currenciesList.push(selectedCurrency);
        })
        yield put(actions.getCurrenciesList.success(currenciesList));

    } catch (e) {
        yield put(actions.getCurrenciesList.failure(''));
    }
}

export function* watchGetCurrenciesList() {
    yield takeLatest(getType(actions.getCurrenciesList.request), requestGetCurrenciesList);
}

export function* watchExchangeRates() {
    yield all([
        call(watchGetCurrenciesList)
        ]);
}
