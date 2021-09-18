import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { Bar, Line } from "react-chartjs-2";
import moment from 'moment';

const VaccineTrend = () => {
    const api_url = `https://api.covidactnow.org/v2/states.timeseries.json?apiKey=${process.env.REACT_APP_COVID_API_KEY}`;

    const [timeseries, setTimeseries] = useState();
    const [dates, setDates] = useState([]);
    const [uiDate, setuiDate] = useState("Select Date");
    const [vaccinesInit, setvaccinesInit] = useState([]);
    const [vaccinesComp, setvaccinesComp] = useState([]);
    // const [newDeaths, setnewDeaths] = useState([]);

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
        var datesArr = [];
        var vaccinesInitArr = [];
        var vaccinesComp = [];

        for (var i in timeseries) {
            if (timeseries[i]['state'] === state) {
                for (var x in timeseries[i]['actualsTimeseries']) {
                    if (timeseries[i]['actualsTimeseries'][x]['date'] >= startdate && timeseries[i]['actualsTimeseries'][x]['date']) {
                        datesArr.push(timeseries[i]['actualsTimeseries'][x]['date'])
                        vaccinesInitArr.push(timeseries[i]['actualsTimeseries'][x]['vaccinationsInitiated'])
                        vaccinesComp.push(timeseries[i]['actualsTimeseries'][x]['vaccinationsCompleted'])
                        // newCasesArr.push(timeseries[i]['actualsTimeseries'][x]['newCases'])
                    }
                }
            }
        }

        setDates(datesArr.sort());
        setvaccinesInit(vaccinesInitArr);
        setvaccinesComp(vaccinesComp);
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
                label: "Total Vaccines Initiated",
                data: vaccinesInit,
                fill: true,
                backgroundColor: "#FFD580",
            },
            {
                label: "Total Vaccines Completed",
                data: vaccinesComp,
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
        <Grid item xs={12} style={{marginTop: '25px'}}>
            <Card sx={{ minHeight: 345 }}>
                <div style={{ display: 'flex' }}>
                    <CardHeader title="Vaccines Initiated and Completed" />
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
                    {state === 'Select State' ? <Skeleton variant="rectangular" height={300} /> : <Bar data={data} options={options} />}
                </CardContent>
            </Card>

        </Grid>
    );
}

export default VaccineTrend