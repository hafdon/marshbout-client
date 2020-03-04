<template>
    <ZForm
        v-on="listeners"
        :controls="controls"
        :blank-form="form"
        v-bind="attrs"
    ></ZForm>
</template>

<script>
export default {
    inheritAttrs: false,
    name: 'BibleForm',
    props: {
        id: {
            type: Number,
            required: false,
        },
        axios: {
            url: String,
            method: String,
            data: Object,
        },
        blankForm: {
            required: true,
            type: Object,
        },
        controls: {
            form_textarea: Array,
        },
    },

    data() {
        return {
            form: {},
            dirty: false,
        }
    },
    created() {
        this.clearForm()
        this.$bvToast('inherit attrs is false')
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
        async getById(id) {
            try {
                let results = await this.$axios.request({
                    method: 'get',
                    url: this.axios.url + `/${id}`,
                })
                console.log({ getById: { results } })
                this.setForm(results.data)
            } catch (e) {
                console.log(e)
            }
        },
        onCancel() {
            this.$emit('cancel')
        },
        onChange() {
            this.dirty = true
        },
        clearForm() {
            console.log('clearForm')
            this.setForm(this.blankForm)
        },
        setForm(data) {
            this.form = { ...data }
            this.dirty = false
        },
        async onRemove() {
            try {
                await this.$axios.request({
                    method: 'delete',
                    url:
                        this.axios.url +
                        (this.form?.id ? '/' + this.form.id : ''),
                })

                this.clearForm()
                this.$emit('remove')
            } catch (e) {
                console.log(e)
            }
        },

        async onSubmit() {
            console.log('onSubmit')
            try {
                if (Object.values(this.form).some(el => !!el)) {
                    let url =
                        this.axios.url +
                        (this.form.id ? '/' + this.form.id : '')
                    let results = await this.$axios.request({
                        method: this.form.id ? 'put' : 'post',
                        url,
                        data: this.formToApiData,
                    })

                    console.log({ results })
                    this.$bvToast.toast('Submission submitted', {
                        variant: 'success',
                    })
                    this.clearForm()
                    this.dirty = false

                    this.$emit('submit', { form: this.form })
                }
            } catch (e) {
                console.log(e)
            }
        },
    },
}
</script>
