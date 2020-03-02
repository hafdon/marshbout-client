<template>
    <b-form @submit.stop.prevent="onSubmit" @change.stop.prevent="onChange">
        <b-form-group>
            <b-form-checkbox class="float-right" v-model="form.attune"
                >Attune</b-form-checkbox
            >
        </b-form-group>
        <b-form-group>
            <label class="float-left" for="input-title">Title</label>
            <b-form-textarea
                v-model="form.title"
                id="input-title"
                rows="2"
            ></b-form-textarea>
        </b-form-group>
        <b-form-group>
            <label class="float-left" for="input-contributor"
                >Contributor</label
            >
            <b-form-input
                v-model="form.contributor"
                id="input-contributor"
                type="text"
            ></b-form-input>
        </b-form-group>
        <b-form-group>
            <label class="float-left" for="input-description"
                >Description</label
            >
            <b-form-textarea
                rows="5"
                v-model="form.description"
                id="input-description"
                type="text"
            ></b-form-textarea>
        </b-form-group>
        <b-form-group>
            <label class="float-left" for="input-contents">Contents</label>
            <b-form-textarea
                rows="5"
                v-model="form.contents"
                id="input-contents"
                type="text"
            ></b-form-textarea>
        </b-form-group>
        <b-form-group>
            <label class="float-left" for="input-mechanics">Mechanics</label>
            <b-form-textarea
                rows="3"
                v-model="form.mechanics"
                id="input-mechanics"
                type="text"
            ></b-form-textarea>
        </b-form-group>

        <span v-if="id" class="float-left">
            <b-button @click="onCancel" variant="outline-dark">Cancel</b-button>
        </span>
        <span v-if="id" class="float-right">
            <b-button type="submit" variant="primary" class="mr-2"
                >Save</b-button
            >
            <b-button @click="onRemove" variant="outline-danger"
                >Remove</b-button
            >
        </span>
        <span v-if="!id" class="float-right">
            <b-button type="submit" variant="primary" class="mr-2"
                >Submit</b-button
            >
            <b-button @click="onCancel" variant="outline-danger"
                >Cancel</b-button
            >
        </span>
    </b-form>
</template>

<script>
export default {
    name: 'WorkForm',
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
    },
    watch: {
        id: {
            immediate: true,
            // eslint-disable-next-line no-unused-vars
            handler: async function(val, old) {
                console.log({ watch_id: { val, old } })
                try {
                    // if the form is dirty, ask if they want to discard changes
                    // if they do want to discard changes (result = true)
                    // then act like the form's not dirty

                    // TODO: fix inability to actually change the "id" prop here?
                    if (this.dirty) {
                        {
                            if (
                                window.confirm(
                                    'You have unsaved changes. Click "ok work form" to discard changes.'
                                )
                            ) {
                                this.dirty = false
                            }
                        }
                    }
                    if (!this.dirty) {
                        if (val) {
                            this.getById(val)
                        } else {
                            this.clearForm()
                        }
                        this.dirty = false
                    }
                } catch (e) {
                    console.log(e)
                }
                console.log({ now_id: this.id })
                return
            },
        },
        blankForm: {
            immediate: true,
            deep: true,
            handler: (val, old) => {
                console.log({ watch_blankForm: { val, old } })
                return
            },
        },
        form: {
            immediate: true,
            deep: true,
            handler: function(val) {
                this.$emit('change', { form: val })
                return
            },
        },
        dirty: {
            immediate: true,
            handler: function(val, old) {
                console.log({ watch_dirty: { val, old } })
                return
            },
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
    },
    computed: {
        formToApiData() {
            console.log({ formToApiData: this.form })
            return this.form
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
                this.form = { ...results.data }
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
            this.form = { ...this.blankForm }
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
