import React from 'react'
import { Line } from 'react-chartjs-2'

function CovidChart ({ newCases, newDeaths, dates }) {

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
        <Line data={data} options={options} />
    )
}

export default CovidChart
