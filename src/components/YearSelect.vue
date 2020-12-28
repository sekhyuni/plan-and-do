<template>
    <select @change="yearChange">
        <option v-for="yearOption in yearOptions" :key="yearOption.id" :selected="year === yearOption">{{ yearOption }}</option>
    </select>
</template>

<script>
export default {
    props: {
        year: {
            type: Number,
            required: true,
        }
    },
    data() {
        return {
            yearOptions: [],
        }
    },
    methods: {
        yearOptionsInit() {
            for (let i = 2010; i <= 2030; i++) {
                this.yearOptions.push(i)
            }
        },
        yearChange(event) {
            this.$emit('yearEmitted', Number(event.target.value))
        },
    },
    created() {
        this.yearOptionsInit()
    },
}
</script>

<style lang="scss" scoped>

</style>