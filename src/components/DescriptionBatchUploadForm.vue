<template>
    <b-form-textarea
        v-on="listeners"
        v-bind="attrs"
        :value="value"
        @input="input"
    ></b-form-textarea>
</template>

<script>
export default {
    name: '',
    inheritAttrs: false,
    props: ['value'],
    data() {
        return {}
    },
    computed: {
        listeners() {
            const { ...listeners } = this.$listeners
            return listeners
        },
        attrs() {
            const { ...attrs } = this.$attrs
            return attrs
        },
    },
    methods: {
        input(value) {
            this.$emit('input', value)
        },
    },
}
</script>

<style></style>
