import React from 'react'
import {
    FormControl,
    Select,
    MenuItem,
    Typography
} from '@mui/material';
import { Box } from '@mui/system';

const TrendForms = ({ state, uiDate, setuiDate, handleSelect, timeseries }) => {
    return (
        <Box style={{display: "flex", marginLeft: "auto"}}>
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
        </Box>
    )
}

export default TrendForms
