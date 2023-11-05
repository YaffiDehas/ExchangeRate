

import { LoadingState } from "../utils"

export interface ForeignCurrencyState {
  loading: LoadingState
  currenciesList: Currency[]
  selectedCurrency: any
}

export interface Country {
  area?: string
  alpha3Code?: string
  alpha2Code?: string
  altSpellings?: []
  borders?: []
  callingCodes?: []
  cioc?: string
  capital?: string
  currencies?: Currency[]
  demonym?: string
  flag?: string
  flags?: Flag
  independent?: boolean
  languages?: Language
  latlng?: []
  name: string
  nativeName?: string
  numericCode?: string
  population?: string
  region?: string
  regionalBlocs?: RegionalBloc
  subregion?: string
  timezones?: []
  topLevelDomain?: []
  translations?: Translation
}

export interface Currency2 {
  name: string,
  key: string,
  exchangeRates: string[]
}

export interface Currency {
  key: string,
  currentExchangeRate: number,
  currentChange: number,
  unit: number,
  lastUpdate: string
}

export interface Freq {
  id: string,
  name: string
}

export interface Flag {
  png: string
  svg: string
}

export interface Language {
  iso639_1: string
  iso639_2: string
  name: string
  nativeName: string
}

export interface RegionalBloc {
  acronym: string
  name: string
}

export interface Translation {
  br: string
  de: string
  es: string
  fa: string
  fr: string
  hr: string
  hu: string
  it: string
  ja: string
  nl: string
  pt: string
}