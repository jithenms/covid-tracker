import React from 'react';
import { Bar } from 'react-chartjs-2'

function VaccineChart({dates, vaccinesInit, vaccinesComp}) {
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
        <Bar data={data} options={options} />
    )
}

export default VaccineChart
