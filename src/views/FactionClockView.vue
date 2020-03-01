<template>
    <b-container fluid>
        <b-row>
            <b-col xs="12" lg="6">
                <b-card no-body bg-variant="light">
                    <b-card-body>
                        <ZForm
                            :id="selected_id"
                            @cancel="onCancel"
                            @submit="onSubmit"
                            @remove="onRemove"
                            :axios="axios"
                            :blank-form="form"
                            :controls="controls"
                        ></ZForm>
                    </b-card-body>
                </b-card>
            </b-col>
            <b-col>
                <b-card no-body bg-variant="light">
                    <template v-slot:header>
                        <b-form-input v-model="tableFilter"></b-form-input>
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
import ZForm from '@/components/ZForm.vue'
import ZTable from '@/components/ZTable.vue'

export default {
    name: 'FactionClockView',
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
                url: 'clock',
                method: 'get',
                data: {},
            },
            fields: [
                { key: 'name', sortable: true },
                { key: 'tags', formatter: n => n.toString() },
                { key: 'prep', sortable: true },
            ],
            tableFilter: '',
            controls: {
                form_textarea: [
                    { label: 'name' },
                    { label: 'description', rows: 10 },
                ],
                form_tags: [{ label: 'tags' }],
                form_input: [
                    { label: 'start_date', type: 'number' },
                    { label: 'protension', type: 'number' },
                ],
                form_checkbox: [{ label: 'prep' }],
            },
            form: {
                name: '',
                description: '',
                tags: [],
                start_date: null,
                protension: null,
                faction_id: null,
                prep: null,
            },
        }
    },
    components: {
        ZForm,
        ZTable,
    },
    created() {
        console.log('FactionClockView created')
    },
    mounted() {
        document.title = 'Clock'
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
    },
}
</script>

<style></style>
