import Chart from "chart.js/auto";
import { Line } from 'react-chartjs-2';
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);

export default function LineChartDetailAnalisis({ yearRange, dataPrecipitation, dataVCI, dataEviAndMSI }) {
    console.log('YEAR', yearRange);

    let labels = dataPrecipitation
        .filter(data => data.year >= yearRange[0] && data.year <= yearRange[1])
        .map(data => [data.month, data.month == 6 ? data.year : '']);

    let datasets = [];

    dataPrecipitation.length > 0 && datasets.push({
        id: 1,
        label: 'Precipitation',
        data: dataPrecipitation.map((data) => (
            data.precipitation
        )),
        backgroundColor: 'orange',
        borderColor: "orange",
        borderWidth: 2,
        pointRadius: 1,
        fill: false,
        tension: 0.3,
    });

    dataVCI.length > 0 && datasets.push({
        id: 2,
        label: 'VCI',
        data: dataVCI.map((data) => (
            data.VCI
        )),
        backgroundColor: 'red',
        borderColor: "red",
        borderWidth: 2,
        pointRadius: 1,
        fill: false,
        tension: 0.3,
    });


    dataEviAndMSI.length > 0 && datasets.push(
        {
            id: 3,
            label: 'EVI',
            data: dataEviAndMSI.map((data) => (
                data.EVI
            )),
            backgroundColor: 'green',
            borderColor: "green",
            borderWidth: 2,
            pointRadius: 1,
            fill: false,
            tension: 0.3,
        },
        {
            id: 4,
            label: 'MSI',
            data: dataEviAndMSI.map((data) => (
                data.MSI
            )),
            backgroundColor: 'blue',
            borderColor: "blue",
            borderWidth: 2,
            pointRadius: 1,
            fill: false,
            tension: 0.3,
        },
    )

    return (
        <Line width={100} height={35} className="p-4"
            datasetIdKey='id'
            data={{
                labels: labels,
                // labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                datasets: datasets,
            }}
            options={
                {
                    scales: {
                        x: {
                            ticks: {
                                autoSkip: false,
                            },
                        },
                    },
                    plugins: {
                        legend: {
                            display: true,
                            position: "bottom",
                            labels: {
                                usePointStyle: true,
                                pointStyle: "circle",
                            },
                        },
                    },
                }
            }
        />
    )
}
