import { LoadingState } from "../utils";

export interface SeriesCurrencyState {
  loading: LoadingState
  selectedCurrencies: Currency[]
}
export interface Currency {
  id: string,
  name: string,
  values: string[]
}

export interface SelectedRows {
  id: string,
  key: string,
  currentExchangeRate: number,
  currentChange:number
}