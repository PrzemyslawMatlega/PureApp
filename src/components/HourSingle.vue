<template>
    <div class="single-hour">
        <div class="day">{{dateFilter(singleElement.dt_txt)}}</div>
        <div class="hour">{{singleElement.dt_txt | hourFilter}}</div>
        <div class="forecast"><img :src="`https://openweathermap.org/img/wn/${singleElement.weather[0].icon}@2x.png`"
                alt=""></div>
        <div class="temp"></div>
        <div class="rain">
            <div class="rain__content" v-if="singleElement.rain">
                <span>{{singleElement.rain['3h'] | rainFilter}} mm</span>
                <div class="rain__level" :style="`height: ${(singleElement.rain['3h'])*10}px`"></div>
            </div>
            <div class="rain__content" v-else-if="singleElement.snow">
                <span>{{singleElement.snow['3h'] | rainFilter}} mm</span>
                <div class="rain__level" :style="`height: ${(singleElement.snow['3h'])*10}px`"></div>
            </div>
        </div>
        <div class="wind-dir">
            <div class="wind-dir__content" v-if="singleElement.wind">
                <img src="../assets/img/arrow.png" alt="" :style="`transform: rotate(${singleElement.wind.deg}deg)`">
                <span>{{singleElement.wind.deg}}</span>
            </div>
        </div>
        <div class="wind-speed">
            <div class="wind-speed__content" v-if="singleElement.wind">
                <span>{{singleElement.wind.speed | speedFilter}} km/h </span>
                <h6>{{windType}}</h6>
            </div>
        </div>
        <div class="pressure"></div>
    </div>
</template>

<script>
    export default {
        props: {
            singleElement: {
                type: Object,
                required: true
            },
            dateBreakpoints: {
                type: Array
            }
        },
        filters: {
            hourFilter(value) {
                return value.split(" ")[1].slice(0, 5)
            },
            rainFilter(value) {
                return (Math.round(value * 10) / 10).toFixed(1);
            },
            speedFilter(value) {
                return Math.round(value * 3.6)
            }
        },
        computed: {
            windType() {
                if (this.singleElement.wind.speed * 3.6 > 10) {
                    return 'Mocny'
                } else {
                    return 'Słaby'
                }
            }
        },
        methods: {
            dateFilter(value) {
                if (value === this.dateBreakpoints[0]) {
                    return 'Jutro'
                } else if (value === this.dateBreakpoints[1]) {
                    return 'Pojutrze'
                } else {
                    return null;
                }

            }
        },
    }
</script>

<style lang="scss">
    .single-hour {
        @extend %column-base;
        border: 1px solid #cecece;

        * {
            user-select: none;
        }

        div {
            @extend %flex-cc;
            width: 14rem;
            text-align: center;
            border-right: 1px solid #fafafa;
        }

        div:first-of-type {
            border-right: none;
        }

        .rain {
            @extend %flex-col-cc;
            justify-content: flex-end;

            &__content {
                @extend %flex-col-cc;
            }

            &__level {
                width: 100%;
                background: lightblue;
                max-height: 9rem;
            }
        }

        .wind-dir {
            background: #f1f1f1;

            &__content {
                @extend %flex-col-cc;

                img {
                    width: 3rem;
                }
            }
        }

        .wind-speed {
            background: #f1f1f1;

            &__content {
                @extend %flex-col-cc;

            }
        }

    }
</style>