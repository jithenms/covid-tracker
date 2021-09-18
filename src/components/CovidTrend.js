import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import { Box } from '@mui/system';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import CardContent from '@mui/material/CardContent';
import { Line } from "react-chartjs-2";
import CovidChart from './Charts/CovidChart';
import TrendForms from './Forms/ChartForms';
import moment from 'moment';

const CovidTrend = () => {
    const api_url = `https://api.covidactnow.org/v2/states.timeseries.json?apiKey=${process.env.REACT_APP_COVID_API_KEY}`;

    const [timeseries, setTimeseries] = useState();
    const [dates, setDates] = useState([]);
    const [uiDate, setuiDate] = useState("Select Date");
    const [newCases, setnewCases] = useState([]);
    const [newDeaths, setnewDeaths] = useState([]);

    const [state, setState] = useState('Select State');

    const addTimeseriesData = async () => {
        await axios.get(api_url, {
            params: {
                apiKey: process.env.REACT_APP_COVID_API_KEY
            }
        }).then(function (response) {
            setTimeseries(response.data);
        }).catch(function (error) {
            console.log(error);
        });
    }

    const addChartData = (dateStart) => {
        var startdate = moment();
        var days = dateStart;
        startdate = startdate.subtract(days, "days");
        startdate = startdate.format("YYYY-MM-DD");
        const datesArr = [];
        const newCasesArr = [];
        const newDeathsArr = [];

        for (var i in timeseries) {
            if (timeseries[i]['state'] === state) {
                for (var x in timeseries[i]['actualsTimeseries']) {
                    if (timeseries[i]['actualsTimeseries'][x]['date'] >= startdate && timeseries[i]['actualsTimeseries'][x]['date']) {
                        datesArr.push(timeseries[i]['actualsTimeseries'][x]['date'])
                        newDeathsArr.push(timeseries[i]['actualsTimeseries'][x]['newDeaths'])
                        newCasesArr.push(timeseries[i]['actualsTimeseries'][x]['newCases'])
                    }
                }
            }
        }

        setDates(datesArr.sort());
        setnewCases(newCasesArr);
        setnewDeaths(newDeathsArr);
    }

    useEffect(() => {
        try {
            addTimeseriesData();
            addChartData(uiDate);
        } catch (e) {
            console.log(e)
        }
    }, [state, uiDate])

    const handleSelect = (value) => {
        setState(value);
    }

    return (
            <Card>
                <Box style={{ display: 'flex' }}>
                    <CardHeader title="Covid Cases and Deaths" />
                    <TrendForms uiDate={uiDate} state={state} setuiDate={setuiDate} handleSelect={handleSelect} timeseries={timeseries} />
                </Box>
                <CardContent style={{ minHeight: 300 }}>
                    {state === 'Select State' ? <Skeleton variant="rectangular" height={300} /> : <CovidChart newCases={newCases} newDeaths={newDeaths} dates={dates}/>}
                </CardContent>
            </Card>
    );
}

export default CovidTrend