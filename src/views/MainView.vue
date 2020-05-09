<template>
    <div class="main-view">
            <div class="main-view__content" >
                <DescriptionColumn/>
                <HourWrapper/>
            </div>
    </div>
</template>

<script>
import DescriptionColumn from '../components/DescriptionColumn';
import HourWrapper from '../components/HourWrapper';
export default {
    components:{
        DescriptionColumn,
        HourWrapper
    }
}
</script>

<style lang="scss">
    .main-view{
        @extend %main-grid;
        justify-items: start;
        margin: 5rem 0;
        &__content{
            display: flex;
            grid-column: 2/3;
        }
    }
</style>