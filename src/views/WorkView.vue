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
                            :axios="{ url: 'work' }"
                            :blankForm="form"
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
                            ref="worklist"
                            :axios="axios"
                            :fields="fields"
                            @row-selected="onRowSelected"
                            :filter="tableFilter"
                            sticky-header="750px"
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
    name: 'Work',
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
                url: 'work',
                method: 'get',
                data: {},
            },
            fields: [{ key: 'title', sortable: true }, 'contributor'],
            tableFilter: '',
            form: {
                title: '',
                contents: '',
                description: '',
                contributor: '',
                mechanics: '',
                attune: null,
                prep: null,
                etools: null,
                tags: [],
            },
            controls: {
                form_textarea: [
                    { label: 'title' },
                    { label: 'description', rows: 4 },
                    { label: 'contents', rows: 4 },
                    { label: 'mechanics', rows: 4 },
                ],
                form_tags: [{ label: 'tags' }],
                form_input: [{ label: 'contributor', type: 'text' }],
                form_checkbox: [
                    { label: 'prep' },
                    { label: 'etools' },
                    { label: 'attune' },
                ],
            },
        }
    },
    components: {
        ZForm,
        ZTable,
    },
    created() {
        console.log('WorkView created')
    },
    mounted() {
        document.title = 'Work'
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
            this.$refs.worklist.loadItems()
        },
    },
}
</script>

<style></style>
