<template>
    <!-- <b-container fluid>
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
                            :initial-field-options="fieldOptions"
                        />
                    </b-card-body>
                </b-card>
            </b-col>
        </b-row>
    </b-container>-->
    <ZView
        :table-filter="tableFilter"
        :blank-form="form"
        :axios="axios"
        :controls="controls"
        :fields="fields"
        :selectedURL="axios.url"
        :initial-field-options="fieldOptions"
    ></ZView>
</template>

<script>
export default {
    name: 'WorkView',

    data() {
        return {
            axios: {
                url: 'work',
                method: 'get',
                data: {},
            },
            fields: [
                { key: 'title', sortable: true },
                { key: 'contributor' },
                { key: 'tags', formatter: n => (n ? n.toString() : '') },
                { key: 'real', sortable: true },
            ],
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
                real: null,
                tags: [],
            },
            fieldOptions: ['title', 'contributor'],
            controls: {
                form_textarea: [
                    { label: 'title' },
                    { label: 'description', rows: 4 },
                    { label: 'contents', rows: 4, type: 'markdown' },
                    { label: 'mechanics', rows: 4 },
                ],
                form_tags: [{ label: 'tags' }],
                form_input: [{ label: 'contributor', type: 'text' }],
                form_checkbox: [
                    { label: 'prep' },
                    { label: 'etools' },
                    { label: 'attune' },
                    { label: 'real' },
                ],
            },
        }
    },
    components: {
        // ZForm,
        // ZTable,
    },
    created() {
        console.log('WorkView created')
    },
    mounted() {
        document.title = 'Works'
    },
    methods: {},
}
</script>

<style></style>
