import { Reducer } from 'redux';
import {
    ActionType,
    getType,
} from 'typesafe-actions';
import * as actions from './actions';
import { LoadingState } from '../utils';
import { ForeignCurrencyState } from './types';

type Actions = ActionType<typeof actions>;

const initialState: ForeignCurrencyState = {
    loading: LoadingState.IDLE,
    currenciesList: [],
    selectedCurrency: {}
};

const exchangeRatesReducer: Reducer<ForeignCurrencyState, Actions> = (state = initialState, action) => {
    switch (action.type) {
        case getType(actions.getCurrenciesList.request): {
            return {
                ...state,
                loading: LoadingState.REQUEST
            };
        }
        case getType(actions.getCurrenciesList.success): {
            return {
                ...state,
                currenciesList: action.payload,
                loading: LoadingState.SUCCESS
            };
        }

        case getType(actions.getCurrenciesList.failure): {
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

export default exchangeRatesReducer;
