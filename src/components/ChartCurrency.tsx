import * as React from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useSelector } from 'react-redux';
import { ShowMarkParams } from '@mui/x-charts/models';
import { LineChart } from '@mui/x-charts/LineChart';
import { SelectedRows, Serie } from '../redux/currenciesByDates/types';
import Typography from '@mui/material/Typography';
import { Button, Grid } from '@mui/material';
import { getCurrencyWeekly, getCurrencyMonthly, getCurrencyYearly } from '../redux/currenciesByDates/actions';

export const ChartCurrency: React.FC = ({ selectedRows }: any) => {
  const dispatch = useAppDispatch();
  const selectedCurrencies = useSelector((state: any) => state.curreniesValues.selectedCurrencies);
  const serie: Serie = useSelector((state: any) => state.curreniesValues.serie);
  const currenciesNames: string[] = [];
  selectedRows && selectedRows.map((selectedRow: SelectedRows) => {
    selectedCurrencies.map((currency: any) => {
      if (currency.key === selectedRow.key) { currenciesNames.push(`${currency.name}-${currency.key}`) }
    })
  });
  const timeData = selectedCurrencies.length && selectedCurrencies[0].dates.map((date: any) => { return new Date(date) });
  const currenciesValues: any[] = [];
  selectedRows && selectedRows.map((selectedRow: SelectedRows) => {
    selectedCurrencies.map((currency: any) => { if (currency.key === selectedRow.key) return currenciesValues.push(currency.values) })
  });
  const series: any = [];
  currenciesValues.map((value) => { series.push({ data: Object.values(value).map((v: any) => Number(v)) }) });
  const valueFormatter = (date: Date) =>
    date.toLocaleDateString('en-US', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
    });
  const showMark = (params: ShowMarkParams) => {
    const { position } = params as ShowMarkParams<Date>;
    return position.getHours() === 0;
  };
  const ySerie: any = [];
  currenciesValues.map((value) => {
    ySerie.push({ data: value })
  });

  const config = {
    series: ySerie,
    height: 300,
    topAxis: 'topAxis',
    bottomAxis: 'bottomAxis',
    leftAxis: null,
  };
  const xAxisCommon = {
    data: timeData,
    scaleType: 'time',
    valueFormatter,
  } as const;

  const handleDurationClick = (frequncy: string) => {
    switch (frequncy) {
      case "DD":
        dispatch(getCurrencyWeekly.request());
        break;
      case "MM":
        dispatch(getCurrencyMonthly.request());
        break;
      case "YY":
        dispatch(getCurrencyYearly.request());
        break;
      default:
        dispatch(getCurrencyWeekly.request());
        break;
    }
  };

  return (
    <>
      <Grid container spacing={{ xs: 2, md: 4 }}>
        {currenciesNames.length && currenciesNames.map((name: string) =>
          <Grid item><Typography variant="h6">{name}</Typography></Grid>
        )
        }
      </Grid>
      <Grid container spacing={{ xs: 2, md: 4 }}>
        <Grid item spacing={{ xs: 2, md: 4 }}><Button variant="contained" onClick={() => handleDurationClick("DD")}>שבועי </Button></Grid>
        <Grid item spacing={{ xs: 2, md: 4 }}><Button id="M" variant="contained" onClick={() => handleDurationClick("MM")}>חודשי</Button></Grid>
        <Grid item spacing={{ xs: 2, md: 4 }}><Button id="Y" variant="contained" onClick={() => handleDurationClick("YY")}>שנתי</Button></Grid>
      </Grid>
      <Grid container spacing={{ xs: 2, md: 4 }}>
        <LineChart
          xAxis={[
            {
              ...xAxisCommon,
              id: 'bottomAxis',
              scaleType: 'point',
              tickInterval: (time) => [0, 12].includes(time.getHours()),
              tickLabelInterval: (time) => time.getHours() === 0,
            },
            {
              ...xAxisCommon,
              id: 'topAxis',
              scaleType: 'point',
            },
          ]}
          {...config}
        />
      </Grid>
    </>
  );
}