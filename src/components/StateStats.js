import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import axios from 'axios';
import StateTable from './Tables/StateTable';
import { Box } from '@mui/system';

const StateStats = () => {
    const [timeseries, setTimeseries] = useState();

    useEffect(() => {
        const api_url = `https://api.covidactnow.org/v2/states.json?apiKey=${process.env.REACT_APP_COVID_API_KEY}`;
        try {
            axios.get(api_url, {
                params: {
                    apiKey: process.env.REACT_APP_COVID_API_KEY
                }
            }).then(function (response) {
                setTimeseries(response.data)
            }).catch(function (error) {
                console.log(error);
            });
        } catch (e) {
            console.log(e)
        }
    }, [timeseries])

    return (
        <Box>
            <Typography variant="h6" component="h6" style={{ marginBottom: '25px' }}>
                Current Stats
            </Typography>
            <StateTable timeseries={timeseries} />
        </Box>
    )

}

export default StateStats