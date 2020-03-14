<template>
    <b-container fluid>
        <b-row>
            <b-col xs="12" xl="6">
                <b-card no-body bg-variant="light">
                    <b-card-body>
                        <ZForm
                            :id="selected_id"
                            @cancel="onCancel"
                            @submit="onSubmit"
                            @remove="onRemove"
                            :axios="{ url: 'transcript' }"
                            :controls="zform.controls"
                            :blank-form="zform.form"
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
// import TranscriptForm from '@/components/TranscriptForm.vue'
import ZTable from '@/components/ZTable.vue'

export default {
    name: 'TranscriptView',
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
                url: 'transcript',
                method: 'get',
                data: {},
            },
            fields: [
                { key: 'session_id', sortable: true },
                { key: 'session_date', sortable: true },
            ],
            tableFilter: '',
            zform: {
                controls: {
                    form_textarea: [
                        { label: 'body', rows: 30, type: 'markdown' },
                    ],
                    form_input: [
                        { label: 'session_date', type: 'date' },
                        { label: 'session_id', type: 'number' },
                        { label: 'level' },
                        { label: 'game_day' },
                    ],
                    form_tags: [{ label: 'tags' }],
                    form_checkbox: [{ label: 'prep' }],
                },
                form: {
                    body: '',
                    session_date: '',
                    tags: [],
                    prep: false,
                    session_id: null,
                    level: null,
                    game_day: '',
                },
            },
        }
    },
    components: {
        // TranscriptForm,
        ZTable,
    },
    created() {
        console.log('TranscriptView created')
    },
    mounted() {
        document.title = 'Transcript'
    },
    methods: {
        onRowSelected({ row }) {
            // this.selected_id = row?.id
            this.$router.push('/transcript/' + row.id)
        },
        onCancel() {
            this.$router.push('/transcript')
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
