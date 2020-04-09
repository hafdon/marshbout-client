<template>
    <ZView
        :table-filter="tableFilter"
        :blank-form="form"
        :axios="axios"
        :controls="controls"
        :fields="fields"
        :selectedURL="axios.url"
        :initial-field-options="fieldOptions"
        heading="Description"
    ></ZView>
</template>

<script>
export default {
    name: 'DescriptionView',

    data() {
        return {
            axios: {
                url: 'description',
                method: 'get',
                data: {},
            },
            fields: [
                { key: 'content', sortable: true, visible: true },
                {
                    key: 'tags',
                    formatter: n => (n ? n.toString() : ''),
                    visible: true,
                },
                { key: 'prep', visible: false },
            ],
            fieldOptions: ['content', 'tags'],
            filters: {
                claimed: null,
                prep: null,
                etools: null,
                tags: [],
            },
            tableFilter: '',
            controls: {
                form_textarea: [
                    { label: 'content', rows: 10, type: 'markdown' },
                ],
                form_tags: [{ label: 'tags' }],
                form_checkbox: [{ label: 'prep' }],
            },
            form: {
                content: '',
                tags: [],
                prep: null,
            },
        }
    },
}
</script>

<style></style>
