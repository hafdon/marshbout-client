<template>
    <b-container fluid>
        <b-row>
            <b-col xs="12" lg="6">
                <b-card no-body bg-variant="light">
                    <b-card-body>
                        <ZForm
                            :id="selected_id"
                            @cancel="onCancel"
                            @submit="onSubmit"
                            @remove="onRemove"
                            :axios="{ url: 'npc' }"
                            :blank-form="form"
                            :controls="controls"
                        >
                            <b-card no-body>
                                <template v-slot:header>
                                    <span>
                                        <span class="float-left">Legendary Actions</span>
                                        <span class="float-right">
                                            <b-button
                                                @click="show_legendary_body = !show_legendary_body"
                                                variant="outline-dark"
                                            >
                                                <b-icon-plus></b-icon-plus>
                                            </b-button>
                                        </span>
                                    </span>
                                </template>
                                <b-card-body v-if="show_legendary_body">
                                    <NpcLegendaryActionForm
                                        @submit.stop.prevent="() => {}"
                                        class="text-left"
                                        :live-form="liveForm"
                                    ></NpcLegendaryActionForm>
                                </b-card-body>
                            </b-card>
                        </ZForm>
                    </b-card-body>
                </b-card>
            </b-col>
            <b-col xs="12" lg="6">
                <b-card no-body bg-variant="light">
                    <template v-slot:header>
                        <b-form-group class="m-0 p-0">
                            <b-form-input v-model="tableFilter"></b-form-input>
                        </b-form-group>
                        <b-form-group class="m-0 p-0">
                            <b-button block @click="selectRandom()">Random!</b-button>
                        </b-form-group>
                        <b-card no-body class="m-0 p-0 text-left">
                            <!-- <template v-slot:header>Filters</template> -->
                            <b-card-body class="m-0 p-0">
                                <Threebox :pressed.sync="filters.claimed">Claimed</Threebox>
                                <Threebox :pressed.sync="filters.prep">Prep</Threebox>
                                <Threebox :pressed.sync="filters.etools">Etools</Threebox>
                                <b-form-tags
                                    separator=" ,;"
                                    no-add-on-enter
                                    remove-on-delete
                                    :input-id="`view_form_tag`"
                                    v-model="filters.tags"
                                    class="mb-2"
                                ></b-form-tags>
                            </b-card-body>
                        </b-card>
                    </template>
                    <b-card-body>
                        <ZTable
                            ref="ztable"
                            :axios="axios"
                            :fields="fields"
                            @row-selected="onRowSelected"
                            sticky-header="750px"
                            :filter="tableFilter"
                        ></ZTable>
                    </b-card-body>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import NpcLegendaryActionForm from '@/components/NpcLegendaryActionForm.vue'

export default {
    name: 'NpcView',
    props: {
        id: {
            required: false,
            default: undefined,
        },
    },
    watch: {
        id: {
            immediate: true,
            handler: function(val, old) {
                console.log({ npcview: { id: { val, old } } })
                this.selected_id = +val
                return
            },
        },
        filters: {
            immediate: true,
            deep: true,
            handler(val) {
                console.log({ npc_view_filters: val })
                this.axios = {
                    url: this.Url,
                    method: 'get',
                    data: {},
                }
                return
            },
        },
        liveForm: {
            immediate: true,
            deep: true,
            handler(val) {
                console.log({ npc_view_liveForm: val })
                return
            },
        },
    },
    data() {
        return {
            selected_id: undefined,
            show_legendary_body: false,
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
            tableFilter: '',
            filters: {
                claimed: null,
                prep: null,
                etools: null,
                tags: [],
            },
            form: {
                name: '',
                claimed: false,
                fluff: '',
                description: '',
                habitus: '',
                quotes: '',
                pronunciation: '',
                prep: false,
                tags: [],
                etools: false,
                etools_url: '',
            },
            liveForm: {
                legendary: {
                    name: '',
                    description: '',
                    cost: null,
                },
            },
            controls: {
                form_textarea: [
                    { label: 'name' },
                    { label: 'description', rows: 8 },
                    // { label: 'habitus', rows: 3 },
                    { label: 'legendary', rows: 4 },
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
    components: {
        NpcLegendaryActionForm,
    },
    created() {
        console.log('NpcView created')
    },
    mounted() {
        document.title = 'Npc'
    },
    computed: {
        Url() {
            let { claimed, etools, prep, tags } = this.filters

            let q = []

            q.push(this.booleanQuerySlug(claimed))

            if (etools !== null) {
                q.push(`etools=${etools}`)
            }
            if (prep !== null) {
                q.push(`prep=${prep}`)
            }

            q.push(...tags.map(tag => 'tags=' + tag))
            console.log({ q })

            return 'npc' + (q.length ? '?' + q.join('&') : '')
        },
    },
    methods: {
        onRowSelected({ row }) {
            this.selected_id = row?.id
        },
        onCancel() {
            this.selected_id = undefined
        },
        onSubmit() {
            this.refreshList()
        },
        onRemove() {
            this.refreshList()
        },
        refreshList() {
            this.$refs.ztable.loadItems()
        },
        selectRandom() {
            this.$refs.ztable.selectRandom()
        },
        booleanQuerySlug(val = null) {
            let slug = ''
            val = '' + val
            console.log({ val })

            if (val === 'true') {
                slug = 'claimed=true'
            } else if (['false'].includes(val)) {
                slug = 'claimed=false'
            }

            console.log({ slug })
            return slug
        },
    },
}
</script>

<style></style>
