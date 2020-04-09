<template>
    <b-container fluid>
        <!-- <b-row>
            <b-col xs="12" lg="6">
                <b-card no-body bg-variant="light">
                    <b-card-body>
                        <FactionForm
                            :id="selected_id"
                            @cancel="onCancel"
                            @submit="onSubmit"
                            @remove="onRemove"
                            :axios="{ url: 'faction' }"
                            :blank-form="form"
                        ></FactionForm>
                    </b-card-body>
                </b-card>
            </b-col>
            <b-col>
                <b-card no-body bg-variant="light">
                    <template v-slot:header>
                        <b-form-group class="m-0 p-0">
                            <b-form-input v-model="tableFilter"></b-form-input>
                        </b-form-group>
                        <b-form-group class="m-0 p-0">
                            <b-button block @click="selectRandom()"
                                >Random!</b-button
                            >
                        </b-form-group>
                    </template>
                    <b-card-body>
                        <ZTable
                            ref="ztable"
                            :axios="axios"
                            :fields="fields"
                            @row-selected="onRowSelected"
                            sticky-header="750px"
                            :no-border-collapse="true"
                            :filter="tableFilter"
                            :initial-field-options="fieldOptions"
                        />
                    </b-card-body>
                </b-card>
            </b-col>
        </b-row> -->
        <ZView
            :table-filter="tableFilter"
            :blank-form="form"
            :axios="axios"
            :controls="controls"
            :fields="fields"
            :selectedURL="axios.url"
            :initial-field-options="fieldOptions"
        ></ZView>
        <b-modal size="lg" scrollable hide-header id="info-modal" hide-footer
            ><div v-html="faction_info"></div
        ></b-modal>
    </b-container>
</template>

<script>
// import FactionForm from '@/components/FactionForm.vue'
// import ZTable from '@/components/ZTable.vue'
import faction_info from '@/assets/factions.md'
import { mapGetters } from 'vuex'

/**
 * name: '',
clocks: '',
description: '',
turf: '',
npcs: '',
assets: '',
allies: '',
enemies: '',
situation: '',
interactions: '',
last: ''
 */
export default {
    name: 'FactionView',
    data() {
        return {
            axios: {
                url: 'faction',
                method: 'get',
                data: {},
            },
            fields: [
                { key: 'name', value: 'Name', sortable: true },
                { key: 'prep', sortable: true },
                { key: 'claimed', sortable: true },
                { key: 'tags', formatter: n => (n ? n.toString() : '') },
            ],
            fieldOptions: ['name', 'prep', 'claimed', 'tags'],
            tableFilter: '',
            form: {
                name: '',
                clocks: '',
                description: '',
                turf: '',
                npcs: '',
                assets: '',
                prep: false,
                claimed: false,
                tags: [],
            },
            controls: {
                form_textarea: [
                    { label: 'name' },
                    { label: 'description', rows: 12, type: 'markdown' },
                    { label: 'turf', rows: 3 },
                    { label: 'npcs', rows: 2 },
                    { label: 'assets', rows: 2 },
                ],
                form_tags: [{ label: 'tags' }],

                form_checkbox: [
                    { label: 'prep' },
                    { label: 'claimed' },
                    { label: 'etools' },
                ],
            },

            faction_info,
        }
    },
    components: {
        // FactionForm,
        // ZTable,
    },
    created() {
        console.log('FactionView created')
    },
    mounted() {
        document.title = 'Faction'
        window.addEventListener('keypress', this.onKeypress, false)
    },
    beforeDestroy() {
        document.title = 'Marshbout'
        window.removeEventListener('keypress', this.onKeypress, false)
    },
    computed: {
        ...mapGetters({ controlpressed: 'controlpressed' }),
    },
    methods: {
        onRowSelected({ row }) {
            this.selected_id = row?.id
        },
        onCancel() {
            this.selected_id = undefined
        },
        onSubmit() {
            this.refreshList()
        },
        onRemove() {
            this.refreshList()
        },
        refreshList() {
            this.$refs.ztable.loadItems()
        },
        selectRandom() {
            this.$refs.ztable.selectRandom()
        },

        onKeypress({ key }) {
            try {
                console.log({ onKeypress: key })

                if (this.controlpressed && ['i', 'I'].includes(key)) {
                    this.$bvModal.show('info-modal')
                }
                console.log({ index: this.row_selected_index })
            } catch (e) {
                console.log(e)
            }
        },
    },
}
</script>

<style></style>
