<template>
    <select>
        <option v-for="year in years" :key="year.id">{{ year }}</option>
    </select>
</template>

<script>
export default {
    data() {
        return {
            years: [],
        }
    },
    methods: {
        yearInit() {
            for (let i = 2010; i <= 2030; i++) {
                this.years.push(i)
            }
        },
    },
    created() {
        this.yearInit()
    },
}
</script>

<style lang="scss" scoped>

</style>