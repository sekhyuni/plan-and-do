<template>
    <div class="select-box">
        <div class="select-box__current" tabindex="1">
            <div class="select-box__value" v-for="(monthName, idx) in monthNames" :key="monthName.id">
                <input class="select-box__input" type="radio" @change="monthChange(idx + 1)" :id="idx" :value="idx + 1" name="Month" :checked="month === idx + 1" />
                <p class="select-box__input-text">{{ monthName }}</p>
            </div>
            <img class="select-box__icon" src="http://cdn.onlinewebfonts.com/svg/img_295694.svg" alt="Arrow Icon" aria-hidden="true" />
        </div>
    
        <ul class="select-box__list">
            <li v-for="(monthName, idx) in monthNames" :key="monthName.id">
                <label class="select-box__option" :for="idx" aria-hidden="aria-hidden">{{ monthName }}</label>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        month: {
            type: Number,
            required: true,
        }
    },
    data() {
        return {
            monthNames: [],
        }
    },
    methods: {
        monthNamesInit() {
            const monthOptions = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

            for (let i = 0, len = monthOptions.length; i < len; i++) {
                this.monthNames.push(monthOptions[i])
            }
        },
        monthChange(month) {
            this.$emit('monthEmitted', month)
        },
    },
    created() {
        this.monthNamesInit()
    },
}
</script>

<style lang="scss" scoped>
html,
body {
    min-height: 100%;
    margin: 0;
}

body {
    padding: 30px;
    background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    box-sizing: border-box;
}

.select-box {
    position: relative;
    display: block;
    width: 20%;
    margin: 0 auto;
    font-family: 'Open Sans', 'Helvetica Neue', 'Segoe UI', 'Calibri', 'Arial', sans-serif;
    font-size: 18px;
    color: #60666d; // @media (min-width: 768px) {
    //     width: 20%;
    // }
    // @media (min-width: 992px) {
    //     width: 20%;
    // }
    // @media (min-width: 1200px) {
    //     width: 20%;
    // }
    &__current {
        position: relative;
        box-shadow: 0 15px 30px -10px transparentize(#000, 0.9);
        cursor: pointer;
        outline: none;
        &:focus {
            &+.select-box__list {
                opacity: 1; // We have to set "animation-name: none;" to make the list visible (read below how it works)
                animation-name: none;
                .select-box__option {
                    cursor: pointer;
                }
            }
            .select-box__icon {
                transform: translateY(-50%) rotate(180deg);
            }
        }
    }
    &__icon {
        position: absolute;
        top: 50%;
        right: 15px;
        transform: translateY(-50%);
        width: 20px;
        opacity: 0.3;
        transition: 0.2s ease;
    }
    &__value {
        display: flex;
    }
    &__input {
        display: none;
        &:checked+.select-box__input-text {
            display: block;
        }
    }
    &__input-text {
        display: none;
        width: 100%;
        margin: 0;
        padding: 15px;
        background-color: #fff;
    }
    &__list {
        position: absolute;
        width: 100%;
        padding: 0;
        list-style: none;
        opacity: 0; // We need to use animation with delay.
        // Otherwise the click event will not have time to run on label, because this element disapears immediately when .select-box__current element loses the focus.
        // This delay will not be noticed because we set "opacity" to "0".
        // We also use "animation-fill-mode: forwards" to make the list stay hidden.
        animation-name: HideList;
        animation-duration: 0.5s;
        animation-delay: 0.5s;
        animation-fill-mode: forwards;
        animation-timing-function: step-start;
        box-shadow: 0 15px 30px -10px transparentize(#000, 0.9);
    }
    &__option {
        display: block;
        padding: 15px;
        background-color: #fff;
        &:hover,
        &:focus {
            color: #546c84;
            background-color: #fbfbfb;
        }
        z-index: 2; // day--disabled보다 앞에 나오도록
        position: relative;
    }
}

@keyframes HideList {
    from {
        transform: scaleY(1);
    }
    to {
        transform: scaleY(0);
    }
}
</style>