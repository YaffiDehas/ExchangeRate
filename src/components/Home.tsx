import * as React from 'react';
import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getLoadingSelector } from '../redux/currenciesDetailes/selectors';
import { LoadingState } from '../redux/utils';
import CurrenciesList from './CurrenciesList';
import { getCurrenciesList } from '../redux/currenciesDetailes/actions';
import { getCurrencyWeekly } from '../redux/currenciesByDates/actions'
import './style.css';
import background from '../assets/background.png';


export const Home: React.FC = () => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(getLoadingSelector);

    useEffect(() => {
        dispatch(getCurrenciesList.request());
        dispatch(getCurrencyWeekly.request());

    }, [])

    const ImageSrc = styled('span')({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
        zIndex: -3,
        opacity: '30%'
    });

    return (
        <div>
            <Container className=''>
                <Row className='justify-content-between mt-5'>
                    <Typography variant="h1">שער יציג</Typography>
                </Row>
                {loading === LoadingState.REQUEST &&
                    <div className="d-flex justify-content-center align-items-center vh-100">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                }
                {loading === LoadingState.SUCCESS &&

                    <Row className='justify-content-between mt-5'>
                        <Col>
                            <CurrenciesList />
                        </Col>
                    </Row>

                }
                <ImageSrc style={{ backgroundImage: `url(${background})` }} />
            </Container>
        </div>
    )
};
