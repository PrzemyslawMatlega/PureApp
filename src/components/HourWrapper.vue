<template>
    <div class="hour-wrapper">

        <div class="hour-wrapper__content" :class="{'hour-wrapper__content--scroll' : scrollActive  }"
            @mousedown.prevent="startScrollOnWrapper" @mouseup.prevent="stopScrollOnWrapper"
            @mousemove.prevent="doScrollOnwrapper" @mouseleave.prevent="stopScrollOnWrapper">
            <HourSingle v-for="singleElement in weatherData" :key="singleElement.dt" :singleElement="singleElement"
                :dateBreakpoints="dateBreakpoints" />
            <AppChart :chartData="getTempData" :chartName="'tempChart'" />
            <AppChart :chartData="getPressureData" :chartName="'pressureChart'"/>
        </div>

    </div>
</template>

<script>
    import HourSingle from './HourSingle';
    import AppChart from './AppChart';

    export default {
        props: {
            weatherData: {
                type: Array,
                required: true,
            }
        },
        data() {
            return {
                scrollActive: false,
                scrollStartValue: 0,
                dateBreakpoints: []
            }
        },
        computed:{
            getPressureData(){
                return this.weatherData.map(singleElement => singleElement.main.pressure)
            },
            getTempData(){
                return this.weatherData.map(singleElement => Math.round(singleElement.main.temp))
            }
        },
        methods: {
            startScrollOnWrapper(event) {
                this.scrollActive = true;
                this.scrollStartValue = event.clientX;
            },
            doScrollOnwrapper(event) {
                if (this.scrollActive) {
                    const scrollDiff = (this.scrollStartValue - event.clientX) / 30
                    document.querySelector('.hour-wrapper__content').scrollBy(scrollDiff, 0)
                }
            },
            stopScrollOnWrapper() {
                this.scrollActive = false;
                this.scrollStartValue = 0;
            },
            setDateBreakpoints() {
                const tomorrow = new Date();
                const dayAfterTomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2)

                function dateToExactString(date) {
                    const dd = String(date.getDate()).padStart(2, '0');
                    const mm = String(date.getMonth() + 1).padStart(2, '0');
                    const yyyy = date.getFullYear();

                    return `${yyyy}-${mm}-${dd} 00:00:00`
                }

                this.dateBreakpoints = [dateToExactString(tomorrow), dateToExactString(dayAfterTomorrow)]
            }
        },
        mounted() {
            this.setDateBreakpoints()
            window.addEventListener('mouseup', this.stopScrollingWrapper);
        },
        components: {
            HourSingle,
            AppChart
        }
    }
</script>


<style lang="scss">
    .hour-wrapper {
        width: 140rem;

        &__content {
            display: flex;
            position: relative;
            justify-content: flex-start;
            overflow-x: scroll;
            width: 100%;

            &::-webkit-scrollbar {
                width: 3px;
                height: 4px;
                box-shadow: inset 0 0 3px rgba(rgba(110, 110, 110, 0), 0.0);
                transition: 1s all ease-in;
            }

            &::-webkit-scrollbar-thumb {
                background: rgba(128, 128, 128, 0);
                transition: 1s all ease-in;
            }

            &:hover {
                cursor: grab;
            }

            &--scroll {
                &::-webkit-scrollbar {
                    box-shadow: inset 0 0 3px rgba(rgb(110, 110, 110), 0.2);
                    background: rgb(231, 228, 228);
                }

                &::-webkit-scrollbar-thumb {
                    background: rgb(124, 123, 123);
                }
            }
        }


    }
</style>