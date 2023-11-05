import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/hooks';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import TimelineIcon from '@mui/icons-material/Timeline';
import { DataGrid } from '@mui/x-data-grid';
import clsx from 'clsx';
import { ChartCurrency } from './ChartCurrency';
import { getCurrencyWeekly } from '../redux/currenciesByDates/actions';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'key',
        headerName: 'שם המטבע',
        width: 150,
        editable: true,
    },
    {
        field: 'currentExchangeRate',
        headerName: 'שער יציג',
        width: 150,
        editable: true,
    },
    {
        field: 'currentChange',
        headerName: 'שינוי יומי',
        type: 'number',
        width: 110,
        editable: true,
        cellClassName: (params) => {
            if (params.value == null) {
              return '';
            }
      
            return clsx('super-app', {
              negative: params.value < 0,
              positive: params.value > 0,
            });
       }
    }
];

export default function CurrenciesList() {
    const dispatch = useAppDispatch();
    const [displayChart, setDisplayChart] = useState(false);
    const [selectedCurrencies, setSelectedCurrencies] = useState();
    const currenciesList = useSelector((state) => state.exchangeRates.currenciesList);
    const rows = currenciesList.length && currenciesList.map((data, index) => {
        return {
            id: index.toString(),
            key: data[0].key,
            currentExchangeRate: data[0].currentExchangeRate,
            currentChange: data[0].currentChange
        }
    });

    const handleDisplayChart = () => {
        dispatch(getCurrencyWeekly.request());
        setDisplayChart(!displayChart);
    }

    return (
        <Grid container spacing={{ xs: 2, md: 4 }}>
            <Grid item rowSpacing={{ xs: 2, md: 4 }}>
                <Button variant="outlined" startIcon={<TimelineIcon />} onClick={() => handleDisplayChart()}>
                    צפיה בגרפים
                </Button>
            </Grid>
            <Grid item>
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}
                        pageSizeOptions={[5]}
                        checkboxSelection
                        disableRowSelectionOnClick
                        onRowSelectionModelChange={(ids) => {
                            const selectedIDs = new Set(ids);
                            const selectedRowData = rows.filter((row) =>
                                selectedIDs.has(row.id.toString())
                            );
                            setSelectedCurrencies(selectedRowData);
                        }}
                    />
                </Box>
            </Grid>
            <Grid container spacing={{ xs: 2, md: 4 }}>
            {displayChart && <ChartCurrency selectedRows={selectedCurrencies} />}
            </Grid>
        </Grid>
    );
}