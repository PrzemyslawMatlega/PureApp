<template>
    <div class="hour-wrapper">

        <div class="hour-wrapper__content" :class="{'hour-wrapper__content--scroll' : scrollActive  }"
            @mousedown.prevent="startScrollOnWrapper" @mouseup.prevent="stopScrollOnWrapper"
            @mousemove.prevent="doScrollOnwrapper" @mouseleave.prevent="stopScrollOnWrapper">
            <HourSingle v-for="n in 20" :key="n" />
        </div>
        <h1>
            {{scrollStartValue}}
        </h1>
    </div>
</template>

<script>
    import HourSingle from './HourSingle';

    export default {
        data() {
            return {
                scrollActive: false,
                scrollStartValue: 0,
                api: 'https://api.openweathermap.org/data/2.5/forecast?id=3094802&appid=ba6ac05450e5ab4c05207b3f61ccc518'
            }
        },

        methods: {
            startScrollOnWrapper(event) {
                this.scrollActive = true;
                this.scrollStartValue = event.clientX;
            },
            doScrollOnwrapper(event) {
                if (this.scrollActive) {
                    const scrollDiff = (this.scrollStartValue - event.clientX) / 40
                    document.querySelector('.hour-wrapper__content').scrollBy(scrollDiff, 0)
                }
            },
            stopScrollOnWrapper() {
                this.scrollActive = false;
                this.scrollStartValue = 0;
            }
        },
        mounted() {
            window.addEventListener('mouseup', this.stopScrollingWrapper);
        },
        components: {
            HourSingle
        }
    }
</script>


<style lang="scss">
    .hour-wrapper {
        width: 140rem;

        &__content {
            display: flex;
            justify-content: flex-start;
            overflow-x: scroll;
            border: 1px solid black;
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