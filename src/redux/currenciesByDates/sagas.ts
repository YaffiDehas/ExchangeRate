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
import { getCurrencyByDates } from './api';
import * as actions from './actions';

export function* requestGetCurrenciesByDates() {
    try {
        const response: AxiosResponse<any> = yield call(() => getCurrencyByDates('SEK,CHF,USD,GBP', '2023-10-24', '2023-11-02'));
        const seriesKeyNames = Object.values(response.data.data.structure.dimensions.series[2].values);
        const seriesDates = response.data.data.structure.dimensions.observation[0].values;
        const seriesValues: any[] = Object.values(response.data.data.dataSets[0].series).map((serie: any) => serie.observations);
        const mappedCurrencies = seriesKeyNames.map((serie: any, index) => {
            return {
                ...serie,
                dates: seriesDates,
                values: seriesValues[index]
            }
        });
        yield put(actions.getCurrencyWeekly.success(mappedCurrencies));


    } catch (e) {
        yield put(actions.getCurrencyWeekly.failure(''));
    }
}

export function* requestGetCurrenciesMonthly() {
    try {
        const response: AxiosResponse<any> = yield call(() => getCurrencyByDates('SEK,CHF,USD,GBP', '2023-10-02', '2023-11-02'));
        const seriesKeyNames = Object.values(response.data.data.structure.dimensions.series[2].values);
        const seriesDates = response.data.data.structure.dimensions.observation[0].values;
        const seriesValues: any[] = Object.values(response.data.data.dataSets[0].series).map((serie: any) => serie.observations);
        const mappedCurrencies = seriesKeyNames.map((serie: any, index) => {
            return {
                ...serie,
                dates: seriesDates,
                values: seriesValues[index]
            }
        });
        yield put(actions.getCurrencyWeekly.success(mappedCurrencies));


    } catch (e) {
        yield put(actions.getCurrencyWeekly.failure(''));
    }
}

export function* requestGetCurrenciesYearly() {
    try {
        const response: AxiosResponse<any> = yield call(() => getCurrencyByDates('SEK,CHF,USD,GBP', '2022-10-02', '2023-11-02'));
        const seriesKeyNames = Object.values(response.data.data.structure.dimensions.series[2].values);
        const seriesDates = response.data.data.structure.dimensions.observation[0].values;
        const seriesValues: any[] = Object.values(response.data.data.dataSets[0].series).map((serie: any) => serie.observations);
        const mappedCurrencies = seriesKeyNames.map((serie: any, index) => {
            return {
                ...serie,
                dates: seriesDates,
                values: seriesValues[index]
            }
        });
        yield put(actions.getCurrencyWeekly.success(mappedCurrencies));


    } catch (e) {
        yield put(actions.getCurrencyWeekly.failure(''));
    }
}

export function* watchGetCurrenciesByDates() {
    yield takeLatest(getType(actions.getCurrencyWeekly.request), requestGetCurrenciesByDates);
}

export function* watchGetCurrenciesMonthly() {
    yield takeLatest(getType(actions.getCurrencyMonthly.request), requestGetCurrenciesMonthly);
}

export function* watchGetCurrenciesYearly() {
    yield takeLatest(getType(actions.getCurrencyYearly.request), requestGetCurrenciesYearly);
}

export function* watchSeriesCurrency() {
    yield all([
        call(watchGetCurrenciesByDates),
        call(watchGetCurrenciesMonthly),
        call(watchGetCurrenciesYearly)
    ]);
}
