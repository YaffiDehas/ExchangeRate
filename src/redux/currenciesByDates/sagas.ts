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

export function* requestGetCurrenciesWeekly() {
    try {
        const response: AxiosResponse<any> = yield call(() => getCurrencyByDates('SEK,CHF,USD,GBP', '2023-10-24', '2023-11-02'));
        const seriesKeyNames = Object.values(response.data.data.structure.dimensions.series[2].values);
        const seriesDates = response.data.data.structure.dimensions.observation[0].values;
        const seriesValues: any[] = Object.values(response.data.data.dataSets[0].series).map((serie: any) => serie.observations);
        const mappedCurrencies: any = seriesKeyNames.map((serie: any, index) => {
            return {
                ...serie,
                dates: seriesDates,
                values: seriesValues[index]
            }
        });
        const mappedCurrenciesByDates: any = [];

        mappedCurrencies.map((currency: any) => {
            const dates: any = [];
            const values: any = [];
            currency.dates.map((date: any, index: number) => {
                    dates.push(date.id);
                    values.push(Number(currency.values[index][0]));
            });
            mappedCurrenciesByDates.push({key: currency.id, name: currency.name, dates, values});
        });
        yield put(actions.getCurrencyWeekly.success(mappedCurrenciesByDates));

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
        const mappedCurrencies: any = seriesKeyNames.map((serie: any, index) => {
            return {
                ...serie,
                dates: seriesDates,
                values: seriesValues[index]
            }
        });
        const mappedCurrenciesByDates: any = [];

        mappedCurrencies.map((currency: any) => {
            const dates: any = [];
            const values: any = [];
            currency.dates.map((date: any, index: number) => {
                    dates.push(date.id);
                    values.push(Number(currency.values[index][0]));
            });
            mappedCurrenciesByDates.push({key: currency.id, name: currency.name, dates, values});
        });
        yield put(actions.getCurrencyMonthly.success(mappedCurrenciesByDates));


    } catch (e) {
        yield put(actions.getCurrencyMonthly.failure(''));
    }
}

export function* requestGetCurrenciesYearly() {
    try {
        const response: AxiosResponse<any> = yield call(() => getCurrencyByDates('SEK,CHF,USD,GBP', '2022-10-02', '2023-11-02'));
        const seriesKeyNames = Object.values(response.data.data.structure.dimensions.series[2].values);
        const seriesDates = response.data.data.structure.dimensions.observation[0].values;
        const seriesValues: any[] = Object.values(response.data.data.dataSets[0].series).map((serie: any) => serie.observations);
        const mappedCurrencies: any = seriesKeyNames.map((serie: any, index) => {
            return {
                ...serie,
                dates: seriesDates,
                values: seriesValues[index]
            }
        });
        const mappedCurrenciesByDates: any = [];

        mappedCurrencies.map((currency: any) => {
            const dates: any = [];
            const values: any = [];
            currency.dates.map((date: any, index: number) => {
                if (new Date(date.id).getDate() === new Date().getDate()) {
                    dates.push(date.id);
                    values.push(Number(currency.values[index][0]));
                }
            });
            mappedCurrenciesByDates.push({key: currency.id, name: currency.name, dates, values});
        });

        // const xSerie = mappedCurrenciesByDates.map((currency: any) => {return new Date(currency.date)});
        // const ySerie = mappedCurrenciesByDates.map((currency: any) => {return currency.value});
        
        yield put(actions.getCurrencyYearly.success(mappedCurrenciesByDates));

    } catch (e) {
        yield put(actions.getCurrencyYearly.failure(''));
    }
}

export function* watchGetCurrenciesByDates() {
    yield takeLatest(getType(actions.getCurrencyWeekly.request), requestGetCurrenciesWeekly);
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
