<template>
    <div class="hour-wrapper">

        <div class="hour-wrapper__content" 
            @mousedown="startScrollOnWrapper" 
            @mouseup="stopScrollOnWrapper" 
            @mousemove="doScrollOnwrapper" >
            <HourSingle v-for="n in 13" :key="n" />
        </div>
        <h1>
            {{x}}
        </h1>
    </div>
</template>

<script>
    import HourSingle from './HourSingle';

    export default {
        data() {
            return {
                scrollingWrapper: false,
                x: 0
            }
        },

        methods: {
            startScrollOnWrapper() {
                this.scrollingWrapper = true;
                this.x = 0;
            },
            doScrollOnwrapper(event) {
                if (this.scrollingWrapper) {
                    this.x = event.clientX;
                }
            },
            stopScrollOnWrapper() {
                this.scrollingWrapper = false;
                this.x = 0;
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

            &:hover {
                cursor: grab;
            }
        }
    }
</style>