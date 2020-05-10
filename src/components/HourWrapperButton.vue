<template>
    <div class="nav-btn" 
        :class="{'nav-btn--reverse' : isReverse}">
        <div class="nav-btn__wrapper" 
            @click="$emit('buttonClicked', isReverse ? 1 : -1 )">
                <img src="../assets/img/arrow-btn.png" alt="" class="nav-btn__arrow">
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

<style lang="scss">
    .nav-btn {
        position: absolute;
        left: -6rem;
        top: 50%;
        transition: 0.3s opacity ease-in;
        transform: translateY(-50%);
        opacity: 0;

        &__wrapper {
        z-index: 100;
            position: relative;
            width: 12rem;
            height: 12rem;
            border-radius: 50%;
            transition: 0.2s background ease-in;
            background: rgba(0, 0, 0, 0.2);
            cursor: pointer;

            &:hover {
                background: rgba(0, 0, 0, 0.4);

            }

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

            img {
                right: initial;
                left: 2.5rem;
                transform: translateY(-50%) rotate(180deg)
            }
        }
    }
</style>