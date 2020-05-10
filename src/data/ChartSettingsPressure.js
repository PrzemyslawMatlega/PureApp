export const optionsPressure = {
    maintainAspectRatio: false,
    legend: {
        display: false
    },
    layout: {
        padding: {
            left: 50,
            right: 50,
            top: 50,
            bottom: 50
        }
    },
    tooltips: {
        enabled: false,
    },
    plugins: {
        datalabels: {
            align: 'top',
            padding: {
                bottom: 4
            },
            offset: 4,
            font: {
                size: 18,
                weight: 'bold'
            },
            color: 'black',
            formatter: function(value, context) {
                return context.chart.data.labels[context.dataIndex];
            }
        }
    },
    scales: {
        yAxes: [{
            stacked: true,
            gridLines: {
                display: false,
                color: "rgba(255,99,132,0.2)"
            },
            ticks: {
                display: false,
                max: 1030,
                min: 980,
                stepSize: 1
            }
        }],
        xAxes: [{
            gridLines: {
                display: false,

            },
            ticks: {
                display: false
            }
        }]
    }
};


export const dataPressure = (dataProps) => ({
    labels: dataProps.map(singleData => `${singleData} hPa`),
    datasets: [{
        label: "Temperatura",
        backgroundColor: "rgba(255,99,132,0.0)",
        pointBorderColor: "black",
        pointBackgroundColor: 'white',
        pointBorderWidth: 2,
        pointHoverBackgroundColor: 'white',
        pointHoverBorderColor: 'black',
        pointHoverBorderWidth: 2,
        pointHoverRadius: 7,
        pointRadius: 7,
          pointHitRadius: 7,
        borderColor: "black",
        borderWidth: 2,
        lineTension: 0,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: dataProps,
    }]}
);