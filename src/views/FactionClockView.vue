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
    name: 'FactionClockView',

    data() {
        return {
            axios: {
                url: 'clock',
                method: 'get',
                data: {},
            },
            fields: [
                { key: 'name', sortable: true, visible: true },
                { key: 'tags', formatter: n => n.toString(), visible: true },
                { key: 'prep', sortable: true, visible: true },
            ],
            fieldOptions: ['name', 'tags', 'prep'],
            tableFilter: '',
            controls: {
                form_textarea: [
                    { label: 'name' },
                    { label: 'description', rows: 10 },
                ],
                form_tags: [{ label: 'tags' }],
                form_input: [
                    { label: 'start_date', type: 'number' },
                    { label: 'protension', type: 'number' },
                ],
                form_checkbox: [{ label: 'prep' }],
            },
            form: {
                name: '',
                description: '',
                tags: [],
                start_date: null,
                protension: null,
                faction_id: null,
                prep: null,
            },
        }
    },
}
</script>

<style></style>
