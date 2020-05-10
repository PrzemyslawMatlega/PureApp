<template>
    <div class="btn" :class="{'btn--reverse' : isReverse}">
        <div class="btn__wrapper" @click="$emit('buttonClicked', isReverse ? 1 : -1 )">
            <img src="../assets/img/arrow-btn.png" alt="" class="btn__arrow">
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            isReverse: Boolean,
        }
    }
</script>

<style lang="scss" scoped>
    .btn {
        position: absolute;
        left: -6rem;
        top: 50%;
        transform: translateY(-50%);

        &__wrapper {
            position: relative;
            width: 12rem;
            height: 12rem;
            border-radius: 50%;
            background: rgba(0, 0, 0, 0.2);
            cursor: pointer;

        }

        img {
            position: absolute;
            right: 2.5rem;
            width: 2.5rem;
            top: 50%;
            transform: translateY(-50%);
            user-select: none;
        }

        &--reverse {
            left: initial;
            right: -6rem;

            img{
                right: initial;
                left:2.5rem;
                transform: translateY(-50%) rotate(180deg)
            }
        }
    }
</style>