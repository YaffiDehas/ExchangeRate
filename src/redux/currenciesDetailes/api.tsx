import axios from 'axios';

export function getCountries() {
    return axios.get('https://restcountries.com/v2/all ', {
    })
}
export function getCurrenciesByDates(currenciesTypes: string, startDate: string ,endDate: string) {
    return axios.get(`https://edge.boi.gov.il/FusionEdgeServer/sdmx/v2/data/dataflow/BOI.STATISTICS/EXR/1.0/?c%5BDATA_TYPE%5D=OF00&c%5BBASE_CURRENCY%5D=${currenciesTypes}&locale=he&startperiod=${startDate}&endperiod=${endDate}&format=sdmx-json`, {
    })
}
export function getCurrencies() {
    return axios.get('https://boi.org.il/PublicApi/GetExchangeRates/?lastNObservations=4', {
    })
}
export function getCurrenciesWeekly() {
    return axios.get('https://edge.boi.gov.il/FusionEdgeServer/sdmx/v2/data/dataflow/BOI.STATISTICS/EXR/1.0/?c%5BDATA_TYPE%5D=OF00&c%5BBASE_CURRENCY%5D=SEK,CHF,USD,GBP&locale=he&startperiod=2023-10-24&endperiod=2023-11-02&format=sdmx-json', {
    })
}
