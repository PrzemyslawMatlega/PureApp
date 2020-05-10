/* eslint-disable no-unused-vars */
<template>
    <div class="base-chart" :class="`base-chart--${chartName}`">
        <canvas id="line-chart-temp" v-if="chartName === 'tempChart'"></canvas>
        <canvas id="line-chart-pressure" v-if="chartName === 'pressureChart'"></canvas>
    </div>
</template>

<script>
    import Chart from 'chart.js';
    import ChartDataLabels from 'chartjs-plugin-datalabels';
    import {optionsTemp, dataTemp} from '../data/ChartSettingsTemp';
    import {optionsPressure, dataPressure} from '../data/ChartSettingsPressure';

    export default {
        props: {
            chartData: {
                type: Array,
                required: true
            },
            chartName:{
                type: String,
                required: true
            }
        },
        mounted() {
            
            const createChart = (id, options,dataFoo ) =>  {
                Chart.Line(id, {
                plugins: [ChartDataLabels],
                options: options,
                data: dataFoo})
            }

            if(this.chartName === 'tempChart'){
                const ct1 = document.getElementById('line-chart-temp');
                createChart(ct1, optionsTemp, dataTemp(this.chartData) )
            }
            else if( this.chartName === 'pressureChart'){
                const ct2 = document.getElementById('line-chart-pressure');
                createChart(ct2, optionsPressure, dataPressure(this.chartData) )
            }
        }
        
    }
</script>

<style lang="scss">
    .base-chart {
        position: absolute;
            width: 335rem;
            left: 2rem;

        &--tempChart{
            top: 20.5rem;
            
        }
        &--pressureChart{
            bottom: 0rem;
        }
    }

    #line-chart-temp {
        height: 18rem !important;
    }
    
    #line-chart-pressure {
        height: 22rem !important;
    }
</style>