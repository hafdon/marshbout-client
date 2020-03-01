<template>
    <b-container fluid>
        <b-row>
            <b-col xs="12" lg="6">
                <b-card no-body bg-variant="light">
                    <b-card-body>
                        <TranscriptForm
                            :id="selected_id"
                            @cancel="onCancel"
                            @submit="onSubmit"
                            @remove="onRemove"
                            :axios="{ url: 'transcript' }"
                        ></TranscriptForm>
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
import TranscriptForm from '@/components/TranscriptForm.vue'
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
        }
    },
    components: {
        TranscriptForm,
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
