import {
    createAction,
    createAsyncAction,
} from 'typesafe-actions';
import {
    Currency,
} from './types';

export const getCurrencyWeekly = createAsyncAction(
    'CURRENCIES/GET_CURRENCIES_WEEKLY_REQUEST',
    'CURRENCIES/GET_CURRENCIES_WEEKLY_SUCCESS',
    'CURRENCIES/GET_CURRENCIES_WEEKLY_FAILURE',
)<void, Currency[], string>();

export const getCurrencyMonthly = createAsyncAction(
    'CURRENCIES/GET_CURRENCIES_MONTHLY_REQUEST',
    'CURRENCIES/GET_CURRENCIES_MONTHLY_SUCCESS',
    'CURRENCIES/GET_CURRENCIES_MONTHLY_FAILURE',
)<void, Currency[], string>();

export const getCurrencyYearly = createAsyncAction(
    'CURRENCIES/GET_CURRENCIES_YEARLY_REQUEST',
    'CURRENCIES/GET_CURRENCIES_YEARLY_SUCCESS',
    'CURRENCIES/GET_CURRENCIES_YEARLY_FAILURE',
)<void, Currency[], string>();

