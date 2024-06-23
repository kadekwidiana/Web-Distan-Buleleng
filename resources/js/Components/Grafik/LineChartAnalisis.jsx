import Chart from "chart.js/auto";
import { Line } from 'react-chartjs-2';
import { CategoryScale } from "chart.js";
import { precipitationData } from "@/Utils/Data/precipitation"
import { vciData } from "@/Utils/Data/vci"
import { eviAndMsiData } from "@/Utils/Data/evi"
Chart.register(CategoryScale);

export default function LineChartAnalisis({ dataPrecipitation, dataVCI, dataEviAndMSI }) {
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
        <Line width={100} height={60} className=""
            datasetIdKey='id'
            data={{
                labels: dataPrecipitation.map((data) => (
                    [data.month]
                )),
                datasets: datasets

            }}
            options={
                {
                    // scales: {
                    //     x: {
                    //         ticks: {
                    //             autoSkip: false,
                    //         },
                    //     },
                    // },
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
