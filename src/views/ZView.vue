<template>
    <b-container fluid class="z-border">
        <h4 class="m-0 p-1 text-center">{{ heading }}</h4>

        <b-row>
            <b-col xs="12" lg="6">
                <b-card no-body bg-variant="light">
                    <b-card-body class="z-border">
                        <ZForm
                            :id="$route.params.id"
                            @cancel="onCancel"
                            @submit="onSubmit"
                            @remove="onRemove"
                            @error="onError"
                            @clear="onClear"
                            :axios="axios"
                            :blank-form="blankForm"
                            :controls="controls"
                            @update="onUpdateForm"
                        ></ZForm>
                    </b-card-body>
                </b-card>
            </b-col>
            <b-col>
                <b-card no-body bg-variant="light" class="m-0 p-0">
                    <b-card-header class="m-0 p-0">
                        <b-form-group class="m-0 p-0">
                            <b-form-input
                                :debounce="filterDebounce"
                                v-model="tableFilter"
                            ></b-form-input>
                        </b-form-group>
                        <b-form-group
                            class="m-0 p-0"
                            v-if="show({ name: 'z-table-random-btn' })"
                        >
                            <b-button block @click="selectRandom()"
                                >Random!</b-button
                            >
                        </b-form-group>
                        <b-card no-body class="m-0 p-0 text-left">
                            <!-- <template v-slot:header>Filters</template> -->
                            <b-card-body class="m-0 p-0">
                                <Threebox :pressed.sync="filters.claimed"
                                    >Claimed</Threebox
                                >
                                <Threebox :pressed.sync="filters.prep"
                                    >Prep</Threebox
                                >
                                <Threebox :pressed.sync="filters.etools"
                                    >Etools</Threebox
                                >
                                <Threebox :pressed.sync="filters.real"
                                    >Real</Threebox
                                >
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
                    </b-card-header>
                    <b-card-body class="m-0 p-0">
                        <ZTable
                            class="m-0 p-0"
                            ref="ztable"
                            :axios="axiosTable"
                            :fields="fields"
                            @row-selected="onRowSelected"
                            sticky-header="750px"
                            :no-border-collapse="true"
                            :filter="tableFilter"
                            :filters="filters"
                            :initial-field-options="initialFieldOptions"
                            :sort-by.sync="sortBy"
                        />
                    </b-card-body>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'ZView',

    props: {
        heading: String,
        title: String,
        sortBy: String,
        filterDebounce: {
            required: false,
            default: '200',
        },
        initialFieldOptions: {
            required: false,
            type: Array,
            default: () => ['id'],
        },
        axios: {
            required: true,
            type: Object,
        },
        fields: {
            required: true,
            type: Array,
        },
        blankForm: {
            required: true,
            type: Object,
        },
        controls: {
            required: true,
            type: Object,
        },
        tableFilter: {
            required: true,
            type: String,
        },
        selectedURL: {
            required: true,
            type: String,
        },
        filters: {
            required: false,
            type: Object,
            default: () => ({
                claimed: null,
                prep: null,
                etools: null,
                real: null,
                tags: [],
            }),
        },
    },
    watch: {
        $route: {
            immediate: true,
            deep: true,
            handler: () => {
                return
            },
        },
        initialFieldOptions: {
            immediate: true,
            deep: true,
            handler(val, old) {
                console.log({ initialFieldOptions_zview: { val, old } })
                return
            },
        },
        blankForm: {
            immediate: true,
            deep: true,
            handler() {
                return
            },
        },
        axios: {
            immediate: true,
            deep: true,
            handler() {
                return
            },
        },
        controls: {
            immediate: true,
            deep: true,
            handler() {
                return
            },
        },
        fields: {
            immediate: true,
            deep: true,
            handler() {
                return
            },
        },
        filters: {
            immediate: true,
            deep: true,
            handler() {
                return
            },
        },
    },
    created() {
        console.log('ZView created')
    },
    mounted() {
        document.title = this.title
    },
    beforeDestroy() {
        document.title = 'Marshbout'
    },
    data() {
        return {
            pasteText: '',
            copyToCBText: '',
        }
    },
    computed: {
        ...mapGetters({
            show: 'show',
        }),

        axiosTable() {
            try {
                let { claimed, etools, prep, tags, real } = this.filters
                let q = []

                q.push(this.booleanQuerySlug(claimed))

                if (etools !== null) {
                    q.push(`etools=${etools}`)
                }
                if (prep !== null) {
                    q.push(`prep=${prep}`)
                }
                if (real !== null) {
                    q.push(`real=${real}`)
                }

                q.push(...tags.map(tag => 'tags=' + tag))
                console.log({ q })

                let { method, data } = this.axios
                let url = this.axios.url + (q.length ? '?' + q.join('&') : '')
                return { method, data, url }
            } catch (e) {
                console.log(e)
                return this.axios
            }
        },
    },
    methods: {
        onRowSelected(args) {
            console.log({ onRowSelected: args })
            let { row } = args
            try {
                this.$router.push(`/${this.selectedURL}/${row.id}`)
            } catch (e) {
                console.log(e)
            }
        },
        onCancel() {
            try {
                // if we're already on the bare /endpoint (without /:id)
                // then don't send them here again; it will throw
                // and error, which apparently I can't catch here
                if (this.$route.params?.id) {
                    this.$router.push({ name: this.$route.name })
                    this.$emit('cancel')
                }
            } catch (e) {
                console.log(e)
            }
        },
        /**
         * On submit, id should not change
         */
        onSubmit({ id, created, data }) {
            console.log({ data })
            console.log('onSubmit bubbles to ZView', {
                params: this.$route.params,
            })

            if (created) {
                this.$router.push(`/${this.selectedURL}/${id}`)
            }

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
        onClear() {
            console.log('onClear bubbles to ZView', {
                params: this.$route.params,
            })
        },
        onError({ statusCode }) {
            console.log('onError')
            if (statusCode === 404) {
                try {
                    this.$router.push({ name: 'Prep' })

                    this.$bvToast.toast(
                        'Resource with this id could not be found',
                        {
                            title: '404',
                            variant: 'warning',
                        }
                    )
                } catch (e) {
                    console.log(e)
                }
            }
        },
        onUpdateForm(args) {
            this.$emit('update:form', args)
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

        async copyToClipboard(text) {
            let result = await navigator.clipboard.write(text)

            console.log({ copyToClipboard: result })

            this.$bvToast.toast('Copied the text to your clipboard.' + text)
        },

        async copyFromClipboard() {
            /* Copy the text inside the text field */
            let text = await navigator.clipboard.read()

            this.pasteText = text

            /* Alert the copied text */
            this.$bvToast.toast('Copied the text from your clipboard.' + text)
        },
    },
}
</script>

<style>
.z-border {
    border-style: solid;
    border-color: red;
    border-width: 2px;
}
</style>
