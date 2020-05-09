/* eslint-disable no-unused-vars */
<template>
    <div class="base-chart">
        <canvas id="line-chart"></canvas>
    </div>
</template>

<script>
    import Chart from 'chart.js';
    import ChartDataLabels from 'chartjs-plugin-datalabels';

    export default {
        props: {
            chartData: {
                type: Array,
                required: true
            }
        },
        mounted() {
            const ctx = document.getElementById('line-chart');
            const data = {
                labels: this.chartData,
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
                    data: this.chartData,
                }]
            };

            const options = {
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
                        color: 'black'
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

            Chart.Line(ctx, {
                plugins: [ChartDataLabels],
                options: options,
                data: data
            });
        }
    }
</script>

<style lang="scss">
    .base-chart {
        top: 20.5rem;
        position: absolute;
        width: 335rem;
        left: 2rem;
    }

    #line-chart {
        height: 18rem !important;
    }
</style>