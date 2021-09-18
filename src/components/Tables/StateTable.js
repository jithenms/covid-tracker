import React from 'react'
import {
    Paper,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';


const StateTable = ({ timeseries }) => {
    return (
        <TableContainer component={Paper}>
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
    )
}

export default StateTable
