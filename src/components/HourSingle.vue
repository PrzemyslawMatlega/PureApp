<template>
    <div class="single-hour">
        <div class="day" :class="{'day--border': dateConvert}"><span>{{dateConvert}}</span></div>
        <div class="hour"><span>{{singleElement.dt_txt | hourFilter}}</span></div>
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
                <span>{{degConvert}}</span>
            </div>
        </div>
        <div class="wind-speed">
            <div class="wind-speed__content" v-if="singleElement.wind">
                <h6>{{windType}}</h6>
                <span>{{singleElement.wind.speed | speedFilter}} km/h </span>
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
                if (this.singleElement.wind.speed * 3.6 > 20) {
                    return 'Mocny'
                } else if (this.singleElement.wind.speed * 3.6 > 10) {
                    return 'Umiar.'
                } else {
                    return 'Słaby'
                }
            },
            dateConvert() {
                if (this.singleElement.dt_txt === this.dateBreakpoints[0]) {
                    return 'Jutro'
                } else if (this.singleElement.dt_txt === this.dateBreakpoints[1]) {
                    return 'Pojutrze'
                } else {
                    return null;
                }
            },
            degConvert() {
                switch (true) {
                    case (this.singleElement.wind.deg < 46):
                        return 'Północny'
                    case (this.singleElement.wind.deg < 91):
                        return 'Pn.-Wsch'
                    case (this.singleElement.wind.deg < 136):
                        return 'Wschodni'
                    case (this.singleElement.wind.deg < 181):
                        return 'Pd.-Wsch'
                    case (this.singleElement.wind.deg < 226):
                        return 'Południowy'
                    case (this.singleElement.wind.deg < 271):
                        return 'Pd.-Zach.'
                    case (this.singleElement.wind.deg < 316):
                        return 'Zachodni'
                    case (this.singleElement.wind.deg < 360):
                        return 'Pn.-Zach.'
                    default:
                        return null
                }
            }

        },
    }
</script>

<style lang="scss">
    .single-hour {
        @extend %column-base;

        * {
            user-select: none;
        }

        div {
            @extend %flex-cc;
            width: 14rem;
            text-align: center;
            border-right: 2px solid $grey-border;
        }

        .day {
            font-size: 1.6rem;
            text-transform: uppercase;
            color: $grey-txt;
            font-weight: bold;
            border-right: none;

            &--border {
                position: relative;
                left: -2px;
                border-left: 2px solid $grey-border;
            }
        }

        .hour,
        .wind-speed {
            font-size: 2rem;
            font-weight: bold;
        }

        .rain {
            @extend %flex-col-cc;
            justify-content: flex-end;

            &__content {
                @extend %flex-col-cc;
                border-right: none;

                span {
                    font-size: 2rem;
                    font-weight: bold;
                    padding-bottom: 0.2rem;
                }
            }

            &__level {
                width: 100%;
                border-left: 2px solid $grey-border;
                background: $blue-one;
                max-height: 9rem;
            }
        }

        .wind-dir {
            background: $grey-bg;
            border-right: 2px solid #fff;

            &__content {
                @extend %flex-col-cc;
                justify-content: space-between;
                height: 60%;
                margin-top:1rem;

                img {
                    width: 3rem;
                }

                span {
                    font-size: 1.8rem;
                    font-weight: bold;
                }
            }
        }

        .wind-speed {
            background: $grey-bg;
            border-right: 2px solid #fff;

            &__content {
                @extend %flex-col-cc;

                h6 {
                    margin: -1rem 0 0.7rem;
                    font-size: 1.8rem;
                }
            }
        }

    }
</style>