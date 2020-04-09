<template>
    <ZView
        :table-filter="tableFilter"
        :blank-form="form"
        :axios="axios"
        :controls="controls"
        :fields="fields"
        :selectedURL="axios.url"
        heading="Positions"
        :initial-field-options="fieldOptions"
    ></ZView>
</template>

<script>
export default {
    name: 'PositionView',

    data() {
        return {
            axios: {
                url: 'position',
                method: 'get',
                data: {},
            },
            fields: [
                { key: 'name', sortable: true },
                { key: 'tags', formatter: n => (n ? n.toString() : '') },
            ],
            fieldOptions: ['name', 'tags'],
            filters: {
                claimed: null,
                prep: null,
                etools: null,
                tags: [],
            },
            controls: {
                form_textarea: [
                    { label: 'name', rows: 3 },
                    { label: 'description', rows: 15, type: 'markdown' },
                ],
                form_tags: [{ label: 'tags' }],
                form_checkbox: [
                    { label: 'prep' },
                    { label: 'claimed' },
                    { label: 'etools' },
                ],
            },
            form: {
                name: '',
                description: '',
                tags: [],
            },
            tableFilter: '',
        }
    },
}
</script>

<style></style>
