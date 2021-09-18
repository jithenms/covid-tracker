import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import { Box } from '@mui/system';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { Line } from "react-chartjs-2";
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

    const data = {
        labels: dates,
        datasets: [
            {
                label: "Covid Cases",
                data: newCases,
                fill: true,
                backgroundColor: "#FFD580",
            },
            {
                label: "Covid Deaths",
                data: newDeaths,
                fill: true,
                backgroundColor: "#FF7F7F",
            },
        ]
    };

    const options = {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };


    return (
        <Grid item xs={12}>
            <Card>
                <div style={{ display: 'flex' }}>
                    <CardHeader title="Covid Cases and Deaths" />
                    <FormControl style={{ display: 'flex', marginLeft: 'auto', padding: '10px' }}>
                        <Select
                            value={uiDate}
                            onChange={event => setuiDate(event.target.value)}
                            displayEmpty
                        >
                            <MenuItem value="Select Date">Select Date</MenuItem>
                            <MenuItem value={7}>Last 7 Days</MenuItem>
                            <MenuItem value={30}>Last 30 Days</MenuItem>
                            <MenuItem value={90}>Last 90 Days</MenuItem>
                            <MenuItem value={360}>Last 360 Days</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl style={{ display: 'flex', padding: '10px' }}>
                        <Select
                            value={state}
                            onChange={event => handleSelect(event.target.value)}
                            displayEmpty
                        >
                            <MenuItem value="Select State">Select State</MenuItem>
                            {timeseries?.map(item => (
                                <MenuItem value={item.state}>{item.state}</MenuItem>
                            ))
                            }
                        </Select>
                    </FormControl>
                </div>
                <CardContent style={{ minHeight: 300 }}>
                    {state === 'Select State' ? <Skeleton variant="rectangular" height={300} /> : <Line data={data} options={options} />}
                </CardContent>
            </Card>

        </Grid>
    );
}

export default CovidTrend