<template>
    <b-button size="sm" :variant="variant" pill @click="onClick">
        <slot></slot>
    </b-button>
</template>

<script>
export default {
    name: 'Threebox',
    props: {
        map: {
            required: false,
            default: () => ({
                true: 'primary',
                false: 'danger',
                null: 'outline-dark',
            }),
        },
        pressed: {
            required: false,
            default: null,
        },
    },
    watch: {
        pressed: {
            immediate: true,
            handler(val) {
                this.value = val
                this.variant = this.map[this.value]
                return
            },
        },
    },
    data() {
        return {
            value: null,
            variant: 'outline-dark',
        }
    },
    methods: {
        onClick() {
            let v = this.value
            this.value = v === true ? false : v === false ? null : true
            this.variant = this.map[this.value]
            console.log({
                onClick: {
                    variant: this.variant,
                    value: this.value,
                },
            })
            this.$emit('update:pressed', this.value)
        },
    },
}
</script>
