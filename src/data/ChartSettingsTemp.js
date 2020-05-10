export const optionsTemp = {
    maintainAspectRatio: false,
    legend: {
        display: false
    },
    layout: {
        padding: {
            left: 40,
            right: 40,
            top: 40,
            bottom: 40
        }
    },
    tooltips: {
        enabled: false,
    },
    plugins: {
        datalabels: {
            align: 'top',
            padding: {
                bottom: 3
            },
            offset: 3,
            font: {
                size: 20,
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
                display: false
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


export const dataTemp = (dataProps) => ({
    labels: dataProps.map(singleData => `${singleData}°`),
    datasets: [{
        label: "Temperatura",
        backgroundColor: "rgba(255,99,132,0.0)",
        pointBorderColor: "black",
        pointBackgroundColor: 'white',
        pointBorderWidth: '1',
        pointHoverBackgroundColor: 'white',
        pointHoverBorderColor: 'black',
        pointHoverBorderWidth: 1,
        pointHoverRadius: 5,
        pointRadius: 5,
        pointHitRadius: 5,
        borderColor: "yellow",
        borderWidth: 2,
        lineTension: 0,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: dataProps,
    }]}
);