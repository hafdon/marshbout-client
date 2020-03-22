<template>
    <b-container fluid>
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
                    <!-- eslint-disable-next-line vue/no-unused-vars -->
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
        <!-- <b-row>
            <b-button class="float-left" @click="edit = !edit" disabled>Edit or not</b-button>
        </b-row>
        <div v-if="!edit" v-html="textarea"></div>
        <b-form-textarea v-else class="p-2" v-model="textarea"></b-form-textarea>-->
    </b-container>
</template>

<script>
import session001 from '@/assets/recaps/session001.md'
import session002 from '@/assets/recaps/session002.md'
import session017 from '@/assets/recaps/session017.md'
import session019 from '@/assets/recaps/session019.md'
import { mapGetters } from 'vuex'

export default {
    watch: {
        selected: {
            immediate: true,
            deep: true,
            handler() {
                return
            },
        },
    },
    data() {
        return {
            recaps: [
                { name: 'session 1', md: session001 },
                { name: 'session 2', md: session002 },
                { name: 'session 17', md: session017 },
                { name: 'session 19', md: session019 },
            ],
            fields: [{ key: 'name', label: 'Session' }],
            selected: null,
        }
    },
    computed: {
        ...mapGetters({
            compiledMarkdown: 'compiledMarkdown',
        }),
    },
    methods: {
        onRowSelected(v) {
            this.selected = v[0]?.md
        },
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
