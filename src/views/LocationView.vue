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
                            :controls="controls"
                            :blank-form="form"
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
                        ></ZTable>
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
    name: 'LocationView',
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
                url: 'location',
                method: 'get',
                data: {},
            },
            fields: [
                { key: 'name', sortable: true },
                { key: 'tags', formatter: n => n.toString() },
            ],
            tableFilter: '',
            controls: {
                form_textarea: [
                    { label: 'name' },
                    { label: 'description', rows: 10 },
                ],
                form_tags: [{ label: 'tags' }],
                form_checkbox: [{ label: 'prep' }, { label: 'claimed' }],
            },
            form: {
                name: '',
                description: '',
                tags: [],
                prep: false,
                claimed: false,
            },
        }
    },
    components: {
        ZForm,
        ZTable,
    },
    created() {
        console.log('LocationView created')
    },
    mounted() {
        document.title = 'Location'
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
