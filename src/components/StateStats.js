import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import { Box } from '@mui/system';
import Skeleton from '@mui/material/Skeleton';
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import axios from 'axios';

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
        <div>
            <Grid item xs={12}>
                <Typography variant="h6" component="h6" style={{ marginBottom: '25px' }}>
                    Current Stats
                </Typography>
                <TableContainer component={Paper} >
                    {timeseries ?
                        <Table stickyHeader aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell component="th" scope="row">State</TableCell>
                                    <TableCell component="th" scope="row">Cases</TableCell>
                                    <TableCell component="th" scope="row">Deaths</TableCell>
                                    <TableCell component="th" scope="row">Positive Cases</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {timeseries.map((item) => (
                                    <TableRow key={item.state.toLocaleString()}>
                                        <TableCell>{item.state.toLocaleString()}</TableCell>
                                        <TableCell>{item.actuals.cases.toLocaleString()}</TableCell>
                                        <TableCell>{item.actuals.deaths.toLocaleString()}</TableCell>
                                        <TableCell>{item.actuals.positiveTests.toLocaleString()}</TableCell>
                                    </TableRow>
                                )
                                )}
                            </TableBody>
                        </Table>
                        : <Skeleton variant="rectangular" height={200} />
                    }
                </TableContainer>

            </Grid>
        </div>
    )

}

export default StateStats