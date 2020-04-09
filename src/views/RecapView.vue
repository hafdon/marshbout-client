<template>
    <!-- <b-container fluid>
        <b-row>
            <b-col xs="12" sm="3">
                <b-table
                    class="text-left"
                    selectable
                    select-mode="single"
                    :items="recaps"
                    :fields="fields"
                    @row-selected="onRowSelected"
                    hover
                    responsive
                >
                   
                </b-table>
            </b-col>
            <b-col xs="12" lg="9">
                <b-card no-body v-if="!!selected">
                    <b-card-body>
                        <div class="text-left" v-html="selected"></div>
                    </b-card-body>
                </b-card>
            </b-col>
        </b-row>
      
    </b-container> -->
    <z-view
        :table-filter="tableFilter"
        :blank-form="form"
        :axios="axios"
        :controls="controls"
        :fields="fields"
        :selectedURL="axios.url"
        :initial-field-options="fieldOptions"
    ></z-view>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            axios: {
                url: 'recap',
                method: 'get',
                data: {},
            },
            fields: [
                { key: 'session_ordinal', label: '#', sortable: true },
                { key: 'session_date', label: 'Date', sortable: true },

                { key: 'session_title', label: 'Title' },
                { key: 'session_author', label: 'Author' },
                { key: 'session_day', label: 'Game day', sortable: true },
                { key: 'player_level', label: 'Level' },
            ],
            fieldOptions: [
                'session_date',
                'session_ordinal',
                'session_title',
                'player_level',
                'session_day',
            ],
            tableFilter: '',
            filters: {
                //     claimed: null,
                //     prep: null,
                //     etools: null,
                tags: [],
            },
            form: {
                session_date: '',
                id: null,
                tags: [],
                prep: false,
                session_ordinal: null,
                session_title: '',
                session_title_contenders: [],
                session_author: '',
                session_day: '',
                session_recap: '',
                player_level: '',
            },
            controls: {
                form_datepicker: [{ label: 'session_date' }],
                form_textarea: [
                    { label: 'session_recap', rows: 30, type: 'markdown' },
                    //     { label: 'habitus', rows: 3 },
                    //     { label: 'fluff', rows: 2 },
                    //     { label: 'quotes', rows: 2 },
                ],
                form_tags: [{ label: 'tags' }],
                form_input: [
                    { label: 'session_title' },
                    { label: 'session_author' },
                    { label: 'session_ordinal', type: 'number' },
                    { label: 'session_day' },
                    { label: 'player_level' },
                ],
                // form_checkbox: [
                //     { label: 'prep' },
                //     { label: 'claimed' },
                //     { label: 'etools' },
                // ],
            },
        }
    },
    computed: {
        ...mapGetters({
            compiledMarkdown: 'compiledMarkdown',
        }),
    },
}
</script>

<style scoped>
input:focus,
textarea:focus,
select:focus {
    outline: none;
}
</style>
