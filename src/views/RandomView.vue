<template>
    <b-container fluid></b-container>
</template>

<script>
export default {
    name: 'RandomView',
    data() {
        return {
            randomObject: {},
        }
    },
    watch: {
        randomObject: {
            immediate: true,
            deep: true,
            handler() {
                return
            },
        },
    },
}
</script>

<style>
</style>