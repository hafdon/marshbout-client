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
            v-for="(c, index) in controls.form_datepicker"
            :key="`datepicker_${index}`"
        >
            <b-form-datepicker
                v-model="form[c.label]"
                :reset-button="c.resetButton"
            ></b-form-datepicker>
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
                :class="c.labelClass ? c.labelClass : ''"
                lazy-formatter
                :formatter="
                    typeof c.formatter === 'function' ? c.formatter : n => n
                "
            ></b-form-input>
        </b-form-group>

        <b-form-row>
            <b-form-group
                v-for="(c, index) in controls.form_spinbutton"
                :key="`input_${index}`"
                class="mr-3"
            >
                <label class="float-left pr-2">{{ c.label }}</label>
                <b-form-spinbutton
                    v-model="form[c.label]"
                    :class="c.controlClass ? c.controlClass : ''"
                    inline
                    style="width: 10rem;"
                    min="0"
                ></b-form-spinbutton>
            </b-form-group>
        </b-form-row>

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
                    :class="c.controlClass ? c.controlClass : ''"
                ></b-form-textarea>
            </template>
            <template v-if="c.type === 'markdown'">
                <form-textarea-markdown v-model="form[c.label]" :rows="c.rows">
                    <label class="float-left">{{ c.label }}</label>
                </form-textarea-markdown>
            </template>
        </b-form-group>

        <span v-if="id" class="float-left">
            <b-button
                @click.stop.prevent="onCancel"
                variant="outline-dark"
                class="mr-2"
                >Cancel</b-button
            >
            <b-button
                disabled
                @click.stop.prevent="onSaveAsNew"
                variant="outline-success"
                >Save as new</b-button
            >
        </span>
        <span v-if="id" class="float-right">
            <b-button type="submit" variant="primary" class="mr-2"
                >Save</b-button
            >
            <b-button @click.stop.prevent="onRemove" variant="outline-danger"
                >Remove</b-button
            >
        </span>
        <span v-if="!id" class="float-right">
            <b-button type="submit" variant="primary" class="mr-2"
                >Submit</b-button
            >
            <b-button @click.stop.prevent="onCancel" variant="outline-danger"
                >Cancel</b-button
            >
        </span>
    </b-form>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
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

                if (val) {
                    // fill the form with that id info
                    await this.getById(val)
                    // treat form as clean
                    this.makeClean()
                } else {
                    //if there's not a val ('undefined', etc)
                    this.clearForm()
                }

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
                console.log('form change in zform')
                this.$emit('update', { form: val })
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
        ...mapActions({ confirmOk: 'confirmOk' }),
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

        async onCancel() {
            try {
                if (
                    this.dirty &&
                    window.confirm(
                        'You have unsaved changes. Click OK to discard them.'
                    )
                ) {
                    this.clearForm()
                }
                if (this.clean) {
                    this.$emit('cancel')
                }
            } catch (e) {
                console.log(e)
            }
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

        async onSaveAsNew() {
            this.$bvToast.toast('This feature is not implemented yet', {
                title: 'WARNING',
                variant: 'danger',
            })
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

                    // Don't clear form anymore; let form stay populated
                    // this.clearForm()

                    // indicate that form is not "dirty" and
                    // has been saved
                    this.makeClean()

                    // emit to parent containers
                    this.$emit('submit', {
                        form: this.form,
                        data: results.data,

                        // return created = true if we just created the resource
                        created: !this.$route.params?.id,
                        id: results.data.id,
                    })
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
<style scoped>
.z-border {
    border-style: solid;
    border-color: red;
    border-width: 2px;
}
/* input[type=text] { */
.danger {
    background-color: rgb(255, 112, 112);
    color: white;
    font-weight: bold;
}
</style>
