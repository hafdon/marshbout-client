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
                form_textarea: [{ label: 'description', rows: 30 }],
                form_tags: [{ label: 'tags' }],
                form_input: [{ label: 'session_id', type: 'number' }],
            },
            form: {
                name: '',
                description: '',
                session_id: null,
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
