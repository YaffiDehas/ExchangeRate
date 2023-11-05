import {
    createAction,
    createAsyncAction,
} from 'typesafe-actions';
import {
    Currency,
} from './types';

export const getCurrenciesList = createAsyncAction(
    'CURRENCIES/GET_CURRENCIES_LIST_REQUEST',
    'CURRENCIES/GET_CURRENCIES_LIST_SUCCESS',
    'CURRENCIES/GET_CURRENCIES_LIST_FAILURE',
)<void, Currency[], string>();

