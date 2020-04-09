<template>
    <ZView
        :table-filter="tableFilter"
        :blank-form="form"
        :id="id"
        :axios="axios"
        :controls="controls"
        :fields="fields"
        :initial-field-options="fieldOptions"
        :selectedURL="axios.url"
    ></ZView>
</template>

<script>
export default {
    name: 'LocationView',

    data() {
        return {
            axios: {
                url: 'location',
                method: 'get',
                data: {},
            },
            fields: [
                { key: 'name', sortable: true },
                { key: 'tags', formatter: n => (n ? n.toString() : '') },
                {
                    key: 'description',
                    sortable: true,
                    formatter: n => (n ? n.substring(0, 20) : ''),
                },
                { key: 'prep', sortable: true },
                { key: 'claimed', sortable: true },
            ],
            fieldOptions: ['name', 'tags'],
            tableFilter: '',
            controls: {
                form_textarea: [
                    { label: 'name' },
                    { label: 'description', rows: 20, type: 'markdown' },
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
}
</script>

<style></style>
