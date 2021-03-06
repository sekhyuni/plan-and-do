<template>
    <div class="calendar-container">
        <div class="calendar-header">
            <!-- 년 선택 -->
            <YearSelect :year="year" @yearEmitted="yearChanged"></YearSelect>
    
            <br>
            <br>
    
            <!-- 월 선택 -->
            <MonthSelect :month="month" @monthEmitted="monthChanged"></MonthSelect>
        </div>
    
        <!-- 달력 -->
        <div class="calendar">
            <span class="day-name" v-for="dayName in daysName" :key="dayName.id">{{ dayName }}</span>
    
            <div class="day day--disabled" v-for="lastMonthDay in lastMonthDays" :key="lastMonthDay.id">{{ lastMonthDay }}</div>
            <div class="day" v-for="day in days" :key="day.id">{{ day }}</div>
            <div class="day day--disabled" v-for="nextMonthDay in nextMonthDays" :key="nextMonthDay.id">{{ nextMonthDay }}</div>
        </div>
    </div>
</template>

<script>
import MonthSelect from './MonthSelect'
import YearSelect from './YearSelect'

export default {
    components: { MonthSelect, YearSelect },
    data() {
        return {
            month: 8, // server data로 update 해야 함
            year: 2013, // server data로 update 해야 함
            days: null,
            daysName: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            daysOfMonth: [undefined, 31, undefined, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
            lastMonthDays: null,
            nextMonthDays: null,
        }
    },
    methods: {
        dayInit() {
            this.days = []

            this.daysOfMonth[2] = this.year % 4 === 0 ? 29 : 28

            for (let i = 1; i <= this.daysOfMonth[this.month]; i++) {
                this.days.push(i)
            }
        },
        computeMonthFirstDay(month, year) {
            const firstYear = 2010;
            let sumOfDays = 0

            for (let i = 1, len = year - firstYear; i <= len; i++) {
                sumOfDays += (2010 + i - 1) % 4 === 0 ? 366 : 365
            }

            for (let i = 1, len = month; i < len; i++) {
                sumOfDays += this.daysOfMonth[i]
            }

            return (sumOfDays + 4) % 7 // 0 -> Mon, 1 -> Tue, 2 -> Wed, ...
        },
        insertLastMonthDays() {
            const lastMonthLastDay = this.month === 1 ? this.daysOfMonth[12] : this.daysOfMonth[this.month - 1]
            const lastMonthDayLen = this.computeMonthFirstDay(this.month, this.year)

            this.lastMonthDays = []

            for (let i = lastMonthLastDay - lastMonthDayLen + 1; i <= lastMonthLastDay; i++) {
                this.lastMonthDays.push(i)
            }
        },
        insertNextMonthDays() {
            const nextMonth = this.month === 12 ? 1 : this.month + 1
            let nextMonthDayLen = this.computeMonthFirstDay(nextMonth, nextMonth === 1 ? this.year + 1 : this.year)

            if (nextMonthDayLen === 0) { // 다음 달 시작이 월요일일경우 이번 달 마지막 row에 다음 달 표시하지 않음
                nextMonthDayLen = 7;
            }

            this.nextMonthDays = []

            for (let i = 1; i <= 7 - nextMonthDayLen; i++) {
                this.nextMonthDays.push(i)
            }
        },
        monthChanged(month) {
            this.month = month

            this.dayInit()
            this.insertLastMonthDays()
            this.insertNextMonthDays()
        },
        yearChanged(year) {
            this.year = year

            this.dayInit()
            this.insertLastMonthDays()
            this.insertNextMonthDays()
        },
    },
    created() {
        this.dayInit()
        this.insertLastMonthDays()
        this.insertNextMonthDays()
    },
}
</script>

<style lang="scss" scoped>
$weekend-color: red;
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
</style>