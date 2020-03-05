<template>
    <b-form @submit.stop.prevent="onSubmit" @change.stop.prevent="onChange">
        <div class="text-right mb-1">
            <b-form-checkbox v-model="form.prep">prep</b-form-checkbox>
            <b-form-checkbox v-model="form.claimed">claimed</b-form-checkbox>
        </div>
        <b-form-group>
            <label class="float-left" for="input-name">Name</label>
            <b-form-textarea
                v-model="form.name"
                id="input-name"
                rows="2"
            ></b-form-textarea>
        </b-form-group>

        <b-form-group>
            <label class="float-left" rows="2" for="input-clocks">Clocks</label>
            <b-form-textarea
                v-model="form.clocks"
                id="input-clocks"
                type="text"
            ></b-form-textarea>
        </b-form-group>

        <b-form-group>
            <form-textarea-markdown
                v-model="form.description"
                id="input-description"
            >
                <label class="float-left m-0 p-0" for="input-description"
                    >Description</label
                ></form-textarea-markdown
            >
        </b-form-group>

        <b-form-group>
            <label class="float-left m-0 p-0" for="input-turf">Turf</label>
            <b-form-textarea
                class="m-0 p-0"
                rows="3"
                v-model="form.turf"
                id="input-turf"
            ></b-form-textarea>
        </b-form-group>
        <b-form-group>
            <form-textarea-markdown v-model="form.npcs" id="input-npcs"
                ><label class="float-left  m-0 p-0" for="input-npcs"
                    >NPCs</label
                ></form-textarea-markdown
            >
        </b-form-group>
        <b-form-group>
            <label class="float-left" for="input-assets">Assets</label>
            <b-form-textarea
                rows="5"
                v-model="form.assets"
                id="input-assets"
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
    name: 'NpcForm',
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
    },
    watch: {
        id: {
            immediate: true,
            // eslint-disable-next-line no-unused-vars
            handler: async function(val, old) {
                console.log({ watch: { id: { val, old } } })
                try {
                    console.log({ dirty: this.dirty })

                    // if the form is dirty, ask if they want to discard changes
                    // if they do want to discard changes (result = true)
                    // then act like the form's not dirty

                    // TODO: fix inability to actually change the "id" prop here?
                    if (this.dirty) {
                        {
                            if (
                                window.confirm(
                                    'You have unsaved changes. Click "ok faction form" to discard changes.'
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
                    url: this.axios.url,
                    params: { id },
                })
                console.log({ getById: { results } })
                this.form = { ...results.data[0] }
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
            this.form = {
                ...this.blankForm,
            }
            this.dirty = false
        },
        async onRemove() {
            try {
                let results = await this.$axios.request({
                    method: 'delete',
                    url:
                        this.axios.url +
                        (this.form?.id ? '/' + this.form.id : ''),
                })
                console.log({ results })
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
