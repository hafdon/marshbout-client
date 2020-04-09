<template>
    <ZView
        :table-filter="tableFilter"
        :blank-form="blankForm"
        :id="id"
        :axios="axios"
        :controls="controls"
        :fields="fields"
        :initial-field-options="fieldOptions"
        routeName="Bible"
        :selectedURL="axios.url"
        heading="Bible"
    ></ZView>
</template>

<script>
export default {
    name: 'BibleView',
    props: {
        id: [String, Number],
    },
    data() {
        return {
            tableFilter: '',
            axios: {
                url: 'bible',
                method: 'get',
                data: {},
            },
            fields: [
                { key: 'name', sortable: true },

                {
                    key: 'tags',
                    formatter: n => (n ? n.toString() : ''),
                },
                { key: 'prep', sortable: true },
                { key: 'id', sortable: true },
            ],
            fieldOptions: ['name', 'tags', 'prep'],

            blankForm: {
                alpha: '',
                name: '',
                'short description': '',
                tags: [],
                prep: null,
            },
            controls: {
                form_textarea: [
                    { label: 'alpha', rows: 2 },
                    { label: 'name', rows: 2 },
                    { label: 'short description', rows: 10, type: 'markdown' },
                ],
                form_tags: [{ label: 'tags' }],
                form_checkbox: [{ label: 'prep' }],
            },
        }
    },
}
</script>

<style></style>
