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
                            :axios="{ url: 'bible' }"
                            :blank-form="form"
                            :controls="controls"
                        ></ZForm>
                    </b-card-body>
                </b-card>
            </b-col>
            <b-col>
                <b-card no-body bg-variant="light">
                    <template v-slot:header>
                        <b-form-group class="m-0 p-0">
                            <b-form-input
                                :debounce="filterDebounce"
                                v-model="tableFilter"
                            ></b-form-input>
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
import ZForm from '@/components/ZForm.vue'
import ZTable from '@/components/ZTable.vue'

export default {
    name: 'BibleView',
    props: {
        id: {
            required: false,
            default: undefined,
        },
        filterDebounce: {
            required: false,
            default: '200',
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
                url: 'bible',
                method: 'get',
                data: {},
            },
            fields: [
                { key: 'name', sortable: true },

                { key: 'tags', formatter: n => (n ? n.toString() : '') },
                { key: 'prep', sortable: true },
                { key: 'id', sortable: true },
            ],
            tableFilter: '',
            form: {
                alpha: '',
                name: '',
                'short description': '',
                tags: [],
                prep: null,
            },
            controls: {
                form_textarea: [
                    { label: 'alpha', rows: 2 },
                    { label: 'name', rows: 2 },
                    { label: 'short description', rows: 4 },
                ],
                form_tags: [{ label: 'tags' }],
                form_checkbox: [{ label: 'prep' }],
            },
        }
    },
    components: {
        ZForm,
        ZTable,
    },
    created() {
        console.log('BibleView created')
    },
    mounted() {
        document.title = 'Bible'
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
    },
}
</script>

<style></style>
