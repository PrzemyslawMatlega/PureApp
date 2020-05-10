<template>
    <div class="hour-wrapper">

        <vuescroll :ops="ops" @handle-scroll="handleScroll">
            <div class="hour-wrapper__content">
                <HourSingle v-for="singleElement in weatherData" :key="singleElement.dt" :singleElement="singleElement"
                    :dateBreakpoints="dateBreakpoints" />
                <AppChart :chartData="getTempData" :chartName="'tempChart'" />
                <AppChart :chartData="getPressureData" :chartName="'pressureChart'" />
            </div>
        </vuescroll>
        <transition name="quick">
            <div class="hour-wrapper__fade hour-wrapper__fade--left" v-show="buttonStatus !== 'Left'"></div>
        </transition>
        <transition name="quick">
            <div class="hour-wrapper__fade hour-wrapper__fade--right" v-show="buttonStatus !== 'Right'"></div>
        </transition>
        <transition name="quick">
            <HourWrapperButton @buttonClicked="doScrollButton" v-show="buttonStatus !== 'Left'" />
        </transition>
        <transition name="quick">
            <HourWrapperButton @buttonClicked="doScrollButton" :isReverse="true" v-show="buttonStatus !== 'Right'" />
        </transition>
    </div>
</template>

<script>
    import HourSingle from './HourSingle';
    import AppChart from './AppChart';
    import HourWrapperButton from './HourWrapperButton';
    import vuescroll from 'vuescroll';
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
                dateBreakpoints: [],
                buttonStatus: 'Both',
                ops: {
                    vuescroll: {
                        mode: 'slide',
                        sizeStrategy: 'percent',
                        detectResize: true,
                        zooming: false,
                    },
                    scrollPanel: {
                        scrollingY: false,
                        speed: 500,
                        easing: 'easeInQuad',
                    },
                    rail: {
                        background: '#eeeeee',
                        opacity: 0.2,
                        keepShow: false
                    },
                    bar: {
                        showDelay: 50,
                        background: '#c1c1c1',
                    },
                }
            }
        },
        computed: {
            getPressureData() {
                return this.weatherData.map(singleElement => singleElement.main.pressure)
            },
            getTempData() {
                return this.weatherData.map(singleElement => Math.round(singleElement.main.temp))
            }
        },
        methods: {
            handleScroll(vertical, horizontal) {
                if (horizontal.process < 0.03) {
                    this.buttonStatus = "Left"
                } else if (horizontal.process > 0.97) {
                    this.buttonStatus = "Right"
                } else {
                    this.buttonStatus = "Both"
                }

            },
            handleComplete() {
                const {
                    scrollLeft
                } = this.$children[0].getPosition();
                console.log('scroll complete！', scrollLeft)
            },
            doScrollButton(value) {

                this.$children[0].scrollBy({
                        dx: 140 * value
                    },
                    300,
                    "easeInQuad"
                );
            },
            setDateBreakpoints() {
                let dayCounter = 1;

                function dateToExactString() {
                    const date = new Date();
                    date.setDate(date.getDate() + dayCounter);
                    const dd = String(date.getDate()).padStart(2, '0');
                    const mm = String(date.getMonth() + 1).padStart(2, '0');
                    const yyyy = date.getFullYear();
                    dayCounter = dayCounter + 1;
                    return `${yyyy}-${mm}-${dd} 00:00:00`

                }
                this.dateBreakpoints = Array.from({
                    length: 3
                }, () => dateToExactString())
            }
        },
        mounted() {
            this.setDateBreakpoints()
        },
        components: {
            HourSingle,
            AppChart,
            HourWrapperButton,
            vuescroll
        }
    }
</script>


<style lang="scss">
    .hour-wrapper {
        width: 140rem;
        position: relative;
        overflow: hidden;

        &__content {
            display: flex;
            position: relative;
            justify-content: flex-start;
            overflow-x: scroll;
            width: 100%;

            .btn {
                opacity: 1;
            }

            &::-webkit-scrollbar {
                display: none;
            }
        }

        &__fade {
            position: absolute;
            top: 0;
            width: 10%;
            height: 100%;

            &--left {
                left: 0;
                background: linear-gradient(to right, rgba(255, 255, 255, 0.9), rgba(255, 254, 254, 0));
            }

            &--right {
                right: 0;
                background: linear-gradient(to left, rgba(255, 255, 255, 0.9), rgba(255, 254, 254, 0));

            }
        }

        &:hover {
            cursor: grab;

            .nav-btn {
                opacity: 1;
            }
        }

    }
</style>