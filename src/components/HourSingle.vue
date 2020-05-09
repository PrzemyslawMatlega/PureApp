<template>
    <div class="single-hour">
        <div class="day"></div>
        <div class="hour"></div>
        <div class="forecast"></div>
        <div class="temp"></div>
        <div class="rain"></div>
        <div class="wind-dir"></div>
        <div class="wind-speed"></div>
        <div class="pressure"></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
    }
</script>

<style lang="scss">
    .single-hour {
        @extend %column-base;
        border: 1px solid #cecece;

        div {
            @extend %flex-cc;
            width: 14rem;
            text-align: center;
            border-right: 1px solid #fafafa;
        }

        div:first-of-type {
            border-right: none;
        }

    }
</style>