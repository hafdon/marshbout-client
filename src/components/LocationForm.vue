<template>
    <ZForm
        v-on="listeners"
        :controls="controls"
        :blank-form="form"
        v-bind="attrs"
    ></ZForm>
</template>

<script>
import ZForm from '@/components/ZForm.vue'

/*****
 *
 * TODO: delete file (not being used)
 *
 */

export default {
    name: 'LocationForm',
    inheritAttrs: false,
    components: {
        ZForm,
    },
    props: {},
    watch: {},
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
    data() {
        return {}
    },
    created() {},
}
</script>
