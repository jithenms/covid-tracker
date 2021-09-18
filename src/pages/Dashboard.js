import React from 'react'
import { Grid, Typography, Container } from '@mui/material';
import CovidTrend from '../components/CovidTrend'
import StateStats from '../components/StateStats'
import VaccineTrend from '../components/VaccineTrend';
import { Box } from '@mui/system';

const Dashboard = () => {
    return (
        <Grid container spacing={1} style={{ padding: '25px' }}>
            <Grid item xs={12} md={8} style={{ padding: '25px' }}>
                <Typography variant="h6" component="h6" style={{ marginBottom: '25px' }}>
                    Timeseries Stats
                </Typography>
                <CovidTrend />
                <VaccineTrend />
            </Grid>
            <Grid item xs={12} md={4} style={{ padding: '25px' }}>
                <StateStats />
            </Grid>
        </Grid>
    )
}

export default Dashboard
