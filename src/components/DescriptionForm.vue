<template>
    <ZForm v-on="listeners" :controls="controls" :blank-form="form" v-bind="attrs"></ZForm>
</template>

<script>
import ZForm from '@/components/ZForm.vue'

export default {
    name: 'DescriptionForm',
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
                form_textarea: [{ label: 'content', rows: 10 }],
                form_tags: [{ label: 'tags' }],
            },
            form: {
                content: '',
                tags: [],
            },
        }
    },
    created() {},
}
</script>

