<template>
    <div class="calendar-container">
        <div class="calendar-header">
            <!-- 월 선택 -->
            <div class="select-box">
                <div class="select-box__current" tabindex="1">
                    <div class="select-box__value" v-for="(monthName, idx) in monthsName" :key="monthName.id">
                        <input class="select-box__input" type="radio" :id="idx" :value="idx + 1" v-if="monthName === 'January'" checked="checked" />
                        <input class="select-box__input" type="radio" :id="idx" :value="idx + 1" v-else/>
                        <p class="select-box__input-text">{{ monthName }}</p>
                    </div>
                    <img class="select-box__icon" src="http://cdn.onlinewebfonts.com/svg/img_295694.svg" alt="Arrow Icon" aria-hidden="true" />
                </div>

                <ul class="select-box__list">
                    <li v-for="(monthName, idx) in monthsName" :key="monthName.id">
                        <label class="select-box__option" :for="idx" aria-hidden="aria-hidden">{{ monthName }}</label>
                    </li>
                </ul>
            </div>
            <select>
                <option v-for="year in years" :key="year.id">{{ year }}</option>
            </select>
        </div>

        <!-- 달력 -->
        <div class="calendar">
            <span class="day-name" v-for="dayName in daysName" :key="dayName.id">{{ dayName }}</span>
            <div class="day day--disabled">30</div>
            <div class="day day--disabled">31</div>
            <div class="day" v-for="day in days" :key="day.id">{{ day }}</div>
            <div class="day day--disabled">1</div>
            <div class="day day--disabled">2</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            days: [],
            daysName: [],
            monthsName: [],
            years: [],
        }
    },
    methods: {
        dateInit() {
            const week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

            for (let i = 1; i <= 31; i++) {
                this.days.push(i)
            }
            for (let i = 0, len = week.length; i < len; i++) {
                this.daysName.push(week[i])
            }
            for (let i = 2010; i <= 2030; i++) {
                this.years.push(i)
            }
            for (let i = 0, len = month.length; i < len; i++) {
                this.monthsName.push(month[i])
            }
        },
    },
    created() {
        this.dateInit()
    },
}
</script>

<style lang="scss" scoped>
html,
body {
    width: 100%;
    height: 100%;
}

body {
    background: #f5f7fa;
    padding: 40px 0;
    box-sizing: border-box;
    font-family: Montserrat, "sans-serif";
    color: #51565d;
}

.calendar {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(7, minmax(120px, 1fr));
    grid-template-rows: 50px;
    grid-auto-rows: 120px;
    overflow: auto;
    &-container {
        width: 90%;
        margin: auto;
        overflow: hidden;
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        background: #fff;
        max-width: 1200px;
    }
    &-header {
        text-align: center;
        padding: 20px 0;
        background: linear-gradient(to bottom, rgb(250, 251, 253) 0%, rgba(255, 255, 255, 0) 100%);
        border-bottom: 1px solid rgba(166, 168, 179, 0.12);
        h1 {
            margin: 0;
            font-size: 18px;
        }
        p {
            margin: 5px 0 0 0;
            font-size: 13px;
            font-weight: 600;
            color: rgba(#51565d, .4);
        }
        button {
            background: 0;
            border: 0;
            padding: 0;
            color: rgba(#51565d, .7);
            cursor: pointer;
            outline: 0;
        }
    }
}

.day {
    border-bottom: 1px solid rgba(166, 168, 179, 0.12);
    border-right: 1px solid rgba(166, 168, 179, 0.12);
    text-align: right;
    padding: 14px 20px;
    letter-spacing: 1px;
    font-size: 12px;
    box-sizing: border-box;
    color: #98a0a6;
    position: relative;
    pointer-events: none;
    z-index: 1;
    &:nth-of-type(7n + 7) {
        border-right: 0;
    }
    &:nth-of-type(n + 1):nth-of-type(-n + 7) {
        grid-row: 2;
    }
    &:nth-of-type(n + 8):nth-of-type(-n + 14) {
        grid-row: 3;
    }
    &:nth-of-type(n + 15):nth-of-type(-n + 21) {
        grid-row: 4;
    }
    &:nth-of-type(n + 22):nth-of-type(-n + 28) {
        grid-row: 5;
    }
    &:nth-of-type(n + 29):nth-of-type(-n + 35) {
        grid-row: 6;
    }
    &:nth-of-type(7n + 1) {
        grid-column: 1/1;
    }
    &:nth-of-type(7n + 2) {
        grid-column: 2/2;
    }
    &:nth-of-type(7n + 3) {
        grid-column: 3/3;
    }
    &:nth-of-type(7n + 4) {
        grid-column: 4/4;
    }
    &:nth-of-type(7n + 5) {
        grid-column: 5/5;
    }
    &:nth-of-type(7n + 6) {
        grid-column: 6/6;
    }
    &:nth-of-type(7n + 7) {
        grid-column: 7/7;
    }
    &-name {
        font-size: 12px;
        text-transform: uppercase;
        color: #99a1a7;
        text-align: center;
        border-bottom: 1px solid rgba(166, 168, 179, 0.12);
        line-height: 50px;
        font-weight: 500;
    }
    &--disabled {
        color: rgba(#98a0a6, 0.6);
        background-color: #ffffff;
        background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f9f9fa' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E");
        cursor: not-allowed;
    }
}

.task {
    border-left-width: 3px;
    padding: 8px 12px;
    margin: 10px;
    border-left-style: solid;
    font-size: 14px;
    position: relative;
    &--warning {
        border-left-color: #fdb44d;
        grid-column: 4 / span 3;
        grid-row: 3;
        background: #fef0db;
        align-self: center;
        color: darken(#fdb44d, 12%);
        margin-top: -5px;
    }
    &--danger {
        border-left-color: #fa607e;
        grid-column: 2 / span 3;
        grid-row: 3;
        margin-top: 15px;
        background: rgba(#fdc5d0, 0.7);
        align-self: end;
        color: darken(#fa607e, 12%);
    }
    &--info {
        border-left-color: #4786ff;
        grid-column: 6 / span 2;
        grid-row: 5;
        margin-top: 15px;
        background: rgba(#dae7ff, 0.7);
        align-self: end;
        color: darken(#4786ff, 12%);
    }
    &--primary {
        background: #4786ff;
        border: 0;
        border-radius: 4px;
        grid-column: 3 / span 3;
        grid-row: 4;
        align-self: end;
        color: #fff;
        box-shadow: 0 10px 14px rgba(#4786ff, 0.4);
    }
    &__detail {
        position: absolute;
        left: 0;
        top: calc(100% + 10px);
        background: #fff;
        border: 1px solid rgba(166, 168, 179, 0.2);
        color: #000;
        padding: 20px;
        box-sizing: border-box;
        border-radius: 4px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
        z-index: 2;
        &:after,
        &:before {
            bottom: 100%;
            left: 30%;
            border: solid transparent;
            content: " ";
            height: 0;
            width: 0;
            position: absolute;
            pointer-events: none;
        }
        &:before {
            border-bottom-color: rgba(166, 168, 179, 0.2);
            border-width: 8px;
            margin-left: -8px;
        }
        &:after {
            border-bottom-color: #fff;
            border-width: 6px;
            margin-left: -6px;
        }
        h2 {
            font-size: 15px;
            margin: 0;
            color: #51565d;
        }
        p {
            margin-top: 4px;
            font-size: 12px;
            margin-bottom: 0;
            font-weight: 500;
            color: rgba(#51565d, .7);
        }
    }
}

.select-box {
    position: relative;
    display: block;
    width: 100%;
    margin: 0 auto;
    font-family: 'Open Sans', 'Helvetica Neue', 'Segoe UI', 'Calibri', 'Arial', sans-serif;
    font-size: 18px;
    color: #60666d;
    @media (min-width: 768px) {
        width: 70%;
    }
    @media (min-width: 992px) {
        width: 50%;
    }
    @media (min-width: 1200px) {
        width: 30%;
    }
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