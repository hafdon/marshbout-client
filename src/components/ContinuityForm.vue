<template>
    <b-form @submit.stop.prevent="onSubmit">
        <b-form-group>
            <b-row>
                <b-col xs="12" lg="4">
                    <label for="input-pc">PC name</label>
                </b-col>
                <b-col xs="12">
                    <b-form-input
                        v-model="form.pc_name"
                        id="input-pc"
                        type="text"
                    ></b-form-input>
                </b-col>
            </b-row>
        </b-form-group>
        <b-form-group>
            <b-row>
                <b-col xs="12" lg="4">
                    <label for="input-roll">Rolled</label>
                </b-col>
                <b-col xs="12">
                    <b-form-input
                        v-model="form.rolled"
                        id="input-roll"
                        type="number"
                    ></b-form-input>
                </b-col>
            </b-row>

            <b-form-radio-group
                v-model="form.nat_radio"
                :options="nat_radio_options"
                class="float-right"
            ></b-form-radio-group>
        </b-form-group>
        <b-form-group>
            <label for="textarea-notes">Notes</label>

            <b-form-textarea
                v-model="form.notes"
                id="textarea-notes"
            ></b-form-textarea>
        </b-form-group>

        <b-button type="submit">Submit</b-button>
    </b-form>
</template>

<script>
export default {
    name: 'ContinuityForm',
    props: {},
    data() {
        return {
            form: {
                pc_name: '',
                rolled: null,
                nat_radio: null,
                notes: '',
            },
            nat_radio_options: [20, 1, null],
        }
    },
    computed: {
        formToApiData() {
            return {
                pc_name: this.form.pc_name,
                roll_calc: this.form.rolled,
                roll_nat: this.form.nat_radio,
                notes: this.form.notes,
            }
        },
    },
    methods: {
        async onSubmit(evt) {
            this.$emit('submit', { form: this.form })
            console.log({ evt, form: this.form })
            try {
                let results = await this.$axios.request({
                    method: 'post',
                    url: 'continuity',

                    data: this.formToApiData,
                })
                console.log({ results })
                this.handleOnSubmitSuccess({ results })
            } catch (e) {
                console.log({ e })
                this.handleOnSubmitError({ error: e })
            }
        },
        handleOnSubmitSuccess({ results }) {
            console.log(results)
            this.$bvToast.toast(`Successfully added`)
        },
        handleOnSubmitError({ error }) {
            this.$bvToast.toast(`could not send ${error}`)
        },
    },
}
</script>

<style></style>
