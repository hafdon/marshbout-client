<template>
    <ZView
        :table-filter="tableFilter"
        :blank-form="blankForm"
        :axios="axios"
        :controls="controls"
        :fields="fields"
        :selectedURL="axios.url"
        :initial-field-options="fieldOptions"
        v-on:update:form="onUpdateForm"
    ></ZView>
</template>

<script>
import { evaluate } from 'mathjs'
import { mapGetters } from 'vuex'
export default {
    name: 'CombatTrackerView',

    data() {
        return {
            axios: {
                url: 'combat-tracker',
                method: 'get',
                data: {},
            },
            fields: [
                { key: 'name', sortable: true },

                { key: 'init', sortable: true },
                { key: 'ac' },
                { key: 'ssdc' },
                { key: 'hp' },
                { key: 'pc', sortable: true },
                { key: 'concentrating', sortable: true, label: 'C' },
            ],
            fieldOptions: ['name', 'init', 'ac', 'ssdc', 'pc', 'concentrating'],
            tableFilter: '',
            filters: {
                // claimed: null,
                // prep: null,
                // etools: null,
                // tags: [],
            },
            blankForm: {
                name: '',
                init: null,
                ac: null,
                ssdc: null,
                hp: null,
                pc: false,
                conditions: '',
                test: 0,
                test1: 1,

                concentrating: false,
            },
            form: {},
            controls: {
                form_textarea: [
                    { label: 'conditions', rows: 3, controlClass: 'danger' },
                    {
                        label: 'stats',
                        type: 'markdown',
                        rows: 20,
                    },
                ],
                form_checkbox: [{ label: 'pc' }, { label: 'concentrating' }],
                form_spinbutton: [
                    { label: 'init' },
                    { label: 'ac' },
                    { label: 'ssdc' },
                ],

                form_input: [
                    { label: 'name' },
                    {
                        label: 'hp',
                        formatter: this.changeHp,
                    },
                ],
            },
        }
    },
    computed: {
        ...mapGetters({
            parseSelection: 'parseSelection',
        }),
    },
    methods: {
        //'this' will be this (combat-tracker) component, and I'm not sure how to change that
        onChangeHp({ result: newHp, deduction }) {
            console.log({ onChangeHp: newHp })
            let oldHp = this.form.hp,
                concentrating = !!this.form.concentrating

            // if they've lost hit points
            // console.log({ result, hp, concentrating: this.form.concentrating })
            if (newHp < oldHp && concentrating) {
                this.$bvToast.toast(
                    `Decrease in HP (${oldHp} => ${newHp}) : 1d20: ${this.parseSelection(
                        '1d20'
                    )} vs. ${Math.max(10, Math.floor(+deduction / 2))}`,
                    {
                        title: 'Check for Concentration',
                        variant: 'danger',
                        noAutoHide: true,
                        toaster: 'b-toaster-top-full',
                    }
                )
            } else {
                // this.$bvToast.toast('nope')
                // console.log(this)
            }
            return
        },
        /**
         * Ok, so since this = combat-tracker,
         * we can call local functions without the need to emit anything
         *
         * oh, i see the problem -- the form values (form.hp) are all blank
         */
        changeHp(n) {
            let result = String(evaluate(n)),
                deduction = /.*?-.*?([\d]+).*/.exec(n)[1]
            this.onChangeHp({ result, deduction })
            return result
        },

        onUpdateForm({ form }) {
            console.log({ onUpdateForm: form })
            this.form = { ...form }
        },
    },
}
</script>

<style></style>
