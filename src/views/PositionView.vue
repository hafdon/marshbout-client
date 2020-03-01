<template>
    <b-container fluid>
        <b-row>
            <b-col xs="12" lg="6">
                <b-card no-body bg-variant="light">
                    <b-card-body>
                        <PositionForm
                            :id="selected_id"
                            @cancel="onCancel"
                            @submit="onSubmit"
                            @remove="onRemove"
                            :axios="{ url: 'position' }"
                        ></PositionForm>
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
    </b-container>
</template>

<script>
import PositionForm from '@/components/PositionForm.vue'
import ZTable from '@/components/ZTable.vue'

export default {
    name: 'PositionView',
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
    },
    data() {
        return {
            selected_id: undefined,
            axios: {
                url: 'position',
                method: 'get',
                data: {},
            },
            fields: [
                { key: 'name', sortable: true },
                { key: 'tags', formatter: n => (n ? n.toString() : '') },
            ],
            tableFilter: '',
        }
    },
    components: {
        PositionForm,
        ZTable,
    },
    created() {
        console.log('PositionView created')
    },
    mounted() {
        document.title = 'Position'
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
            console.log({ event })
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
