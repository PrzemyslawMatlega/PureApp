<template>
    <div class="main-view">
        <div class="main-view__content">
            <transition name="fade" mode="out-in">
                <FadeLoader v-if="loadingData ==='loading'" />
                <div class="main-view__app" v-else-if="loadingData ==='success'">
                    <DescriptionColumn />
                    <HourWrapper :weatherData="weatherData"/>
                </div>
                <div v-else-if="loadingData==='error'">
                    <h2 style="text-align:center"> Something went wrong. <br> Please try again later.</h2>
                </div>
            </transition>

        </div>
    </div>
</template>

<script>
    import DescriptionColumn from '../components/DescriptionColumn';
    import HourWrapper from '../components/HourWrapper';
    import FadeLoader from "vue-spinner/src/PulseLoader";

    export default {
        data() {
            return {
                apiKey: 'ba6ac05450e5ab4c05207b3f61ccc518',
                weatherData: [],
                loadingData: 'loading'
            }
        },
        mounted() {
            const weatherData = fetch(
                `https://api.openweathermap.org/data/2.5/forecast?id=3094802&lang=pl&units=metric&appid=${this.apiKey}`)

            weatherData
                .then(response => response.json())
                .then(weatherData => {
                    
                    if(weatherData.cod=='200'){
                        //Data for next 3 days 
                        this.weatherData = weatherData.list.slice(0,24)
                        this.loadingData = 'success';
                    }
                    else{
                        this.loadingData = 'error'
                    }

                })
                .catch(() => this.loadingData = 'error')
        },
        components: {
            DescriptionColumn,
            HourWrapper,
            FadeLoader
        }
    }
</script>

<style lang="scss">
    .main-view {
        @extend %main-grid;
        justify-items: start;
        margin: 5rem 0;

        &__content {
            display: flex;
            align-items:center;
            justify-content: center;
            width: 100%;
            min-height: 100rem;
            grid-column: 2/3;
        }

        &__app{
            display:flex;
        }
    }
</style>