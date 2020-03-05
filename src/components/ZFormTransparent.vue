<template>
    <b-form @submit.stop.prevent="onSubmit" @change.stop.prevent="onChange">
        <slot></slot>
        <div>{{ formAddons }}</div>
        <div class="text-right mb-1">
            <b-form-checkbox
                v-for="(c, index) in controls.form_checkbox"
                :key="`checkbox_${index}`"
                v-model="form[c.label]"
                >{{ c.label }}</b-form-checkbox
            >
        </div>

        <b-form-group
            v-for="(c, index) in controls.form_tags"
            :key="`tags_${index}`"
        >
            <!-- <div>
                <label :for="`form_tag_${index}`" class="float-left">{{
                    c.label
                }}</label>
            </div>-->

            <b-form-tags
                separator=" ,;"
                no-add-on-enter
                remove-on-delete
                :input-id="`form_tag_${index}`"
                v-model="form[c.label]"
                class="mb-2"
            ></b-form-tags>
        </b-form-group>

        <b-form-group
            v-for="(c, index) in controls.form_input"
            :key="`input_${index}`"
        >
            <label class="float-left">{{ c.label }}</label>
            <b-form-input
                :type="c.type"
                v-model="form[c.label]"
                :rows="c.rows"
            ></b-form-input>
        </b-form-group>

        <b-form-group
            v-for="(c, index) in controls.form_textarea"
            :key="`textarea_${index}`"
        >
            <template v-if="!c.type">
                <label class="float-left">{{ c.label }}</label>
                <b-form-textarea
                    v-if="!c.type"
                    v-model="form[c.label]"
                    :rows="c.rows"
                ></b-form-textarea>
            </template>
            <template v-if="c.type === 'markdown'">
                <form-textarea-markdown v-model="form[c.label]" :rows="c.rows"
                    ><label class="float-left">{{
                        c.label
                    }}</label></form-textarea-markdown
                >
            </template>
        </b-form-group>

        <span v-if="id" class="float-left">
            <b-button @click="onCancel" variant="outline-dark">Cancel</b-button>
            <b-button disabled @click="onSaveAsNew" variant="outline-success"
                >Save as new</b-button
            >
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
import { mapGetters, mapMutations } from 'vuex'
export default {
    name: 'ZForm',
    props: {
        id: {
            type: [String, Number],
            required: false,
        },
        axios: {
            required: true,
            type: Object,
            // url: String,
            // method: String,
            // data: Object,
            default: () => ({ url: '', method: '', data: {} }),
        },
        blankForm: {
            required: true,
            type: Object,
        },
        controls: {
            required: true,
            type: Object,
            // form_textarea: Array,
        },
        formAddons: {
            type: Object,
            required: false,
        },
    },
    watch: {
        axios: {
            immediate: true,
            deep: true,
            handler() {
                return
            },
        },
        formAddons: {
            immediate: true,
            deep: true,
            handler(val) {
                console.log({ zform_formaddons: val })
            },
        },
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
                        let results = false
                        {
                            results = window.confirm(
                                'You have unsaved changes. Click "ok zform" to discard changes.'
                            )
                            console.log({ results })
                            if (results) {
                                console.log({ makingthingsclean: results })
                                this.makeClean()
                            }
                        }
                    }
                    console.log(
                        `about to test if this.clean is true, and it's ${this.clean}`
                    )
                    if (this.clean) {
                        console.log({ clean: this.clean, val })
                        if (val) {
                            this.getById(val)
                            this.makeClean()
                        } else {
                            this.clearForm()
                        }
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
                document.title =
                    this.axios.url +
                    (this.form?.name ? ': ' + this.form?.name : '')
                this.$emit('change', { form: val })
                return
            },
        },
    },
    data() {
        return {
            form: {},
        }
    },
    created() {
        console.log('zform created', this.axios.url)
        this.clearForm()
    },
    mounted() {
        // document.title = document.title + this.form?.name
        window.addEventListener('keypress', this.onKeypress, false)
    },
    beforeRouteEnter() {},
    beforeDestroy() {
        document.title = ''
        window.removeEventListener('keypress', this.onKeypress, false)
    },
    computed: {
        ...mapGetters({
            dirty: 'dirty',
            clean: 'clean',
            controlpressed: 'controlpressed',
        }),
        formToApiData() {
            console.log({ formToApiData: this.form })
            return this.form
        },
    },
    methods: {
        ...mapMutations({ makeDirty: 'makeDirty', makeClean: 'makeClean' }),
        async getById(id) {
            let results
            try {
                results = await this.$axios.request({
                    method: 'get',
                    url: this.axios.url + `/${id}`,
                })
                console.log({ getById: { results } })
                this.setForm(results.data)
            } catch (e) {
                console.log({ error: e })
                // if resource not found
                if (e?.response?.status === 404) {
                    // this.$router.push(this.$router.currentRoute.matched[0].path)
                    // this.$router.push({ name: '404' })
                    this.$emit('error', { statusCode: 404 })
                    console.log({ router: this.$router })
                }
            }
        },

        onCancel() {
            this.$emit('cancel')
        },
        onChange() {
            this.makeDirty()
        },
        clearForm() {
            console.log('clearForm')
            this.setForm(this.blankForm)
            this.makeClean()
            this.$emit('clear')
        },
        setForm(data) {
            this.form = { ...data }
            this.makeClean()
        },
        async onRemove() {
            let ask = window.confirm('Are you sure you want to remove this?')
            if (!ask) {
                return
            }
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
                    this.$bvToast.toast('Submitted', {
                        variant: 'success',
                        toaster: 'b-toaster-bottom-right',
                    })
                    this.clearForm()

                    this.$emit('submit', { form: this.form })
                }
            } catch (e) {
                console.log(e)
            }
        },
        onKeypress({ key }) {
            try {
                if (this.controlpressed && ['Enter'].includes(key)) {
                    this.onSubmit()
                }
            } catch (e) {
                console.log(e)
            }
        },
    },
}
</script>
