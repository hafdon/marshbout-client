<template>
    <ZView
        :table-filter="tableFilter"
        :blank-form="form"
        :axios="axios"
        :controls="controls"
        :fields="fields"
        :selectedURL="axios.url"
        :initial-field-options="fieldOptions"
        :sort-by.sync="sortBy"
    ></ZView>
    <!-- <b-container fluid>
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
                            :initial-field-options="fieldOptions"
                            @row-selected="onRowSelected"
                            sticky-header="750px"
                            :no-border-collapse="true"
                            :filter="tableFilter"
                        />
                    </b-card-body>
                </b-card>
            </b-col>
        </b-row>
    </b-container> -->
</template>

<script>
export default {
    name: 'TranscriptView',

    data() {
        return {
            axios: {
                url: 'transcript',
                method: 'get',
                data: {},
            },
            fields: [
                { key: 'session_id', sortable: true, formatter: n => +n },
                { key: 'session_date', sortable: true },
                { key: 'tags', formatter: n => (n ? n.toString() : '') },
                { key: 'level' },
            ],
            fieldOptions: ['session_id', 'session_date'],
            sortBy: 'session_id',
            tableFilter: '',
            controls: {
                form_textarea: [{ label: 'body', rows: 30, type: 'markdown' }],
                form_input: [
                    { label: 'session_id', type: 'number' },
                    { label: 'level' },
                    { label: 'game_day' },
                ],
                form_tags: [{ label: 'tags' }],
                form_checkbox: [{ label: 'prep' }],
                form_datepicker: [{ label: 'session_date', resetButton: true }],
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
        }
    },
}
</script>

<style></style>
