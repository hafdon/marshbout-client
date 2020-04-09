<template>
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
    name: 'NpcView',

    data() {
        return {
            axios: {
                url: 'npc',
                method: 'get',
                data: {},
            },
            fields: [
                { key: 'name', value: 'Name', sortable: true },

                { key: 'tags', formatter: n => (n ? n.toString() : '') },
                { key: 'claimed', sortable: true },
            ],
            fieldOptions: ['name', 'tags', 'claimed'],
            tableFilter: '',
            filters: {
                claimed: null,
                prep: null,
                etools: null,
                tags: [],
            },
            form: {
                name: '',
                etools_url: '',
                quotes: '',
                pronunciation: '',

                fluff: '',
                description: '',
                habitus: '',

                tags: [],
                claimed: false,
                etools: false,
                prep: false,
            },
            controls: {
                form_textarea: [
                    { label: 'name' },
                    { label: 'description', rows: 12, type: 'markdown' },
                    { label: 'habitus', rows: 3 },
                    { label: 'fluff', rows: 2 },
                    { label: 'quotes', rows: 2 },
                ],
                form_tags: [{ label: 'tags' }],
                form_input: [
                    { label: 'pronunciation', type: 'text' },
                    { label: 'etools_url', type: 'url' },
                ],
                form_checkbox: [
                    { label: 'prep' },
                    { label: 'claimed' },
                    { label: 'etools' },
                ],
            },
        }
    },
}
</script>

<style></style>
