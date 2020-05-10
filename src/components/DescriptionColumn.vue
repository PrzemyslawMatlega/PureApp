<template>
    <div class="description-column">
        <div class="day"><h6>Dzień</h6></div>        
        <div class="hour"><h6>Godzina</h6></div>        
        <div class="forecast"><h6>Prognoza</h6></div>        
        <div class="temp"><h6>Temperatura</h6></div>
        <div class="rain"><h6>Opady</h6></div>
        <div class="wind-dir"><h6>Kierunek <br> wiatru</h6></div>
        <div class="wind-speed"><h6>Prędkość <br> wiatru</h6></div>
        <div class="pressure"><h6>Ciśnienie</h6></div>
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

<style lang="scss" >
        .description-column{
            @extend %column-base;
            border-right: 2px solid $grey-border;
            box-shadow: 5px 0 5px -5px #333;
            z-index: 3;
            div{
                position: relative;
                @extend %flex-cc;
                width: 14rem;
                text-align: center;
                border-bottom: 2px solid $grey-border;                
                
            }
            div:last-of-type{
                border-bottom: none;
            }

            h6{
                font-size:1.7rem;
                color: $grey-txt;
            }
        }
</style>