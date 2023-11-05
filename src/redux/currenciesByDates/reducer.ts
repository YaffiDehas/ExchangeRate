import { Reducer } from 'redux';
import {
    ActionType,
    getType,
} from 'typesafe-actions';
import * as actions from './actions';
import { LoadingState } from '../utils';
import { SeriesCurrencyState } from './types';

type Actions = ActionType<typeof actions>;

const initialState: SeriesCurrencyState = {
    loading: LoadingState.IDLE,
    selectedCurrencies: [],
    serie: { xSerie: [], ySerie: [] }
};

const currencyByDatesReducer: Reducer<SeriesCurrencyState, Actions> = (state = initialState, action) => {
    switch (action.type) {
        case getType(actions.getCurrencyWeekly.request): {
            return {
                ...state,
                loading: LoadingState.REQUEST
            };
        }
        case getType(actions.getCurrencyWeekly.success): {
            return {
                ...state,
                selectedCurrencies: action.payload,
                loading: LoadingState.SUCCESS
            };
        }

        case getType(actions.getCurrencyWeekly.failure): {
            return {
                ...state,
                loading: LoadingState.FAILURE
            };
        }
        case getType(actions.getCurrencyMonthly.request): {
            return {
                ...state,
                loading: LoadingState.REQUEST
            };
        }

        case getType(actions.getCurrencyMonthly.success): {
            return {
                ...state,
                selectedCurrencies: action.payload,
                loading: LoadingState.SUCCESS
            };
        }

        case getType(actions.getCurrencyMonthly.failure): {
            return {
                ...state,
                loading: LoadingState.FAILURE
            };
        }

        case getType(actions.getCurrencyYearly.request): {
            return {
                ...state,
                loading: LoadingState.REQUEST
            };
        }

        case getType(actions.getCurrencyYearly.success): {
            return {
                ...state,
                selectedCurrencies: action.payload,
                loading: LoadingState.SUCCESS
            };
        }

        case getType(actions.getCurrencyYearly.failure): {
            return {
                ...state,
                loading: LoadingState.FAILURE
            };
        }

        default: {
            return state;
        }
    }
};

export default currencyByDatesReducer;
