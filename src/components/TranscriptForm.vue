<template>
    <ZForm v-on="listeners" :controls="controls" :blank-form="form" v-bind="attrs"></ZForm>
</template>

<script>
import ZForm from '@/components/ZForm.vue'

export default {
    name: 'TranscriptForm',
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
        return {
            controls: {
                form_textarea: [{ label: 'body', rows: 20 }],
            },
            form: {
                body: '',
            },
        }
    },
    created() {},
}
</script>
