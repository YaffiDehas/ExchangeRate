import axios from 'axios';

export function getCurrencyByDates(currenciesTypes: string, startDate: string ,endDate: string) {
    return axios.get(`https://edge.boi.gov.il/FusionEdgeServer/sdmx/v2/data/dataflow/BOI.STATISTICS/EXR/1.0/?c%5BDATA_TYPE%5D=OF00&c%5BBASE_CURRENCY%5D=${currenciesTypes}&locale=he&startperiod=${startDate}&endperiod=${endDate}&format=sdmx-json`, {
    })
}

