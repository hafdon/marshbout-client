<template>
    <ZView
        :table-filter="tableFilter"
        :blank-form="blankForm"
        :id="id"
        :axios="axios"
        :controls="controls"
        :fields="fields"
        routeName="Lexeme"
        :initial-field-options="fieldOptions"
        selectedURL="lexeme"
    ></ZView>
</template>

<script>
export default {
    name: 'LexemeView',
    props: {
        id: [String, Number],
    },
    data() {
        return {
            blankForm: {
                headword: '',
                etymology: '',
                pronunciation: '',
                language: '',
                definitions: '',
                tags: [],
            },
            controls: {
                form_input: [
                    { label: 'headword', type: 'text' },
                    { label: 'pronunciation', type: 'text' },
                    { label: 'language', type: 'text' },
                ],
                form_tags: [{ label: 'tags' }],
                form_textarea: [
                    { label: 'etymology', rows: 2 },
                    { label: 'definitions', rows: 20, type: 'markdown' },
                ],
            },
            axios: {
                url: 'lexeme',
                method: 'get',
                data: {},
            },
            fields: [
                { key: 'headword', sortable: true },
                { key: 'tags', formatter: n => (n ? n.toString() : '') },
            ],
            tableFilter: '',
            fieldOptions: ['headword', 'tags'],
        }
    },
}
</script>

<style></style>
