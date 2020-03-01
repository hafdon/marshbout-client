<template>
    <b-container fluid>
        <b-row>
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
                        />
                    </b-card-body>
                </b-card>
            </b-col>
        </b-row>
        <b-modal size="lg" scrollable hide-header id="info-modal" hide-footer
            ><div v-html="faction_info"></div
        ></b-modal>
    </b-container>
</template>

<script>
import FactionForm from '@/components/FactionForm.vue'
import ZTable from '@/components/ZTable.vue'
import faction_info from '@/assets/factions.md'

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
    props: {
        id: {
            required: false,
            default: undefined,
        },
    },
    watch: {
        id: {
            immediate: true,
            handler: function(val, old) {
                console.log({ workview: { id: { val, old } } })
                this.selected_id = +val
                return
            },
        },
        controlpressed: {
            immediate: true,
            handler(val, old) {
                console.log({ controlpressed: { val, old } })
                return
            },
        },
    },
    data() {
        return {
            selected_id: undefined,
            axios: {
                url: 'faction',
                method: 'get',
                data: {},
            },
            fields: [
                { key: 'name', value: 'Name', sortable: true },
                { key: 'prep', sortable: true },
                { key: 'claimed', sortable: true },
            ],
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
            },
            controlpressed: false,
            faction_info,
        }
    },
    components: {
        FactionForm,
        ZTable,
    },
    created() {
        console.log('FactionView created')
    },
    mounted() {
        document.title = 'Faction'
        window.addEventListener('keypress', this.onKeypress, false)
        window.addEventListener('keydown', this.onKeydown, false)
        window.addEventListener('keyup', this.onKeyup, false)
    },
    beforeDestroy() {
        document.title = 'Marshbout'
        window.removeEventListener('keypress', this.onKeypress, false)
        window.removeEventListener('keydown', this.onKeydown, false)
        window.removeEventListener('keyup', this.onKeyup, false)
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
        onKeydown(event) {
            console.log({ onKeyDown: { event } })
            let { keyCode } = event
            if ([17, 18].includes(keyCode)) {
                this.controlpressed = true
            }
        },
        onKeyup({ keyCode }) {
            if ([17, 18].includes(keyCode)) {
                this.controlpressed = false
            }
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
