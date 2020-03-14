<template>
    <ZForm
        :id="id"
        :axios="axios"
        v-on="listeners"
        :controls="controls"
        :blank-form="form"
        v-bind="attrs"
    ></ZForm>
</template>

<script>
import ZForm from '@/components/ZForm.vue'

export default {
    name: 'PrepForm',
    inheritAttrs: false,
    components: {
        ZForm,
    },
    props: {
        id: {
            type: [Number, String],
            default: '',
        },
    },
    watch: {
        id: {
            immediate: true,
            handler(val) {
                console.log({ prep_form_watch_id: val })
            },
        },
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
    data() {
        return {
            controls: {
                form_textarea: [
                    { label: 'description', rows: 30, type: 'markdown' },
                ],
                form_tags: [{ label: 'tags' }],
                form_input: [
                    { label: 'session_id', type: 'number' },
                    // { label: 'session_date', type: 'date' },
                ],
                form_datepicker: [{ label: 'session_date', resetButton: true }],
            },
            form: {
                name: '',
                description: '',
                session_id: null,
                session_date: '',
                tags: [],
            },
            axios: {
                url: 'prep',
                method: 'get',
                data: {},
            },
        }
    },
    created() {},
}
</script>
