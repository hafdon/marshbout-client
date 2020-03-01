<template>
    <b-container fluid id="prep_view_container">
        <b-row>
            <b-col cols="12">
                <b-card-group columns>
                    <b-card no-body bg-variant="dark" text-variant="light" class="mb-2 p-0">
                        <b-card-body class="m-0 p-1">
                            <div class="cheatsheet m-0 p-0" v-html="prepCheatsheet"></div>
                        </b-card-body>
                    </b-card>
                    <b-card no-body class="text-left">
                        <b-card-body>
                            <b-form-checkbox inline v-model="show_tooltips">Show Tooltips</b-form-checkbox>
                        </b-card-body>
                    </b-card>
                </b-card-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col xs="12" lg="6">
                <b-card no-body></b-card>
                <b-card-body class="m-0 p-0">
                    <b-table
                        :items="items"
                        :fields="Fields"
                        small
                        hover
                        striped
                        fixed
                        responsive
                        sticky-header="1000px"
                        no-border-collapse
                    >
                        <template v-slot:table-colgroup="scope">
                            <col
                                v-for="field in scope.fields"
                                :key="field.key"
                                :style="{
                                    width:
                                        field.key === 'name' ? '180px' : '40px',
                                }"
                            />
                        </template>
                        <template v-slot:cell(name)="row">
                            <div class="td_name">
                                <router-link
                                    :id="`tooltip_target_${row.item.resource}_${row.item.id}`"
                                    :to="{
                                        path: `/${row.item.resource}/${row.item.id}`,
                                    }"
                                >{{ displayName(row.item) }}</router-link>
                                <b-tooltip
                                    container="prep_view_container"
                                    v-if="show_tooltips"
                                    placement="bottom"
                                    :target="`tooltip_target_${row.item.resource}_${row.item.id}`"
                                >
                                    <b-card no-body>
                                        <b-card-body>
                                            <EndpointDisplay
                                                :url="`${row.item.resource}/${row.item.id}`"
                                            ></EndpointDisplay>
                                        </b-card-body>
                                    </b-card>
                                </b-tooltip>
                            </div>
                        </template>
                        <template v-slot:cell(description)="row">
                            <div class="description">
                                {{ row.item.description }}
                                {{ row.item['short description'] }}
                            </div>
                        </template>
                        <template v-slot:cell(prep)="row">
                            <b-button
                                class="m-0 p-0"
                                variant="transparent"
                                @click="togglePrep(row.item, row.index)"
                            >
                                <b-icon-toggle-on v-if="row.item.prep"></b-icon-toggle-on>
                                <b-icon-toggle-off v-else></b-icon-toggle-off>
                            </b-button>
                        </template>
                    </b-table>
                </b-card-body>
            </b-col>

            <b-col xs="12" lg="6">
                <b-card no-body class="p-0">
                    <template v-slot:header>
                        <h4 class="text-left">Session Prep Notes</h4>
                    </template>
                    <b-card-body>
                        <PrepForm
                            :id="$route.params.id"
                            @error="onError"
                            @cancel="onCancel"
                            @clear="onClear"
                            @submit="onSubmit"
                        ></PrepForm>
                    </b-card-body>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import PrepForm from '@/components/PrepForm.vue'
import prepCheatsheet from '@/assets/prep_cheatsheet.md'
import EndpointDisplay from '@/components/EndpointDisplay.vue'
export default {
    name: 'PrepView',
    data() {
        return {
            items: [],
            prepCheatsheet,
            tooltip_target: null,
            show_tooltips: true,
        }
    },
    props: {
        id: {
            type: [Number, String],
        },
    },
    components: {
        PrepForm,
        EndpointDisplay,
    },
    watch: {
        items: {
            deep: true,
            immediate: true,
            async handler(val, old) {
                console.log({ items: { val, old } })
                return
            },
        },
    },
    mounted() {
        document.title = 'Prep'
    },
    beforeDestroy() {
        document.title = 'Marshbout'
    },
    async created() {
        try {
            let { data = {} } = await this.$axios.request({
                method: 'get',
                url: '/db',
            })

            let endpoints = Object.getOwnPropertyNames(data)
            console.log({ endpoints, data })
            let items = []

            endpoints.forEach(endpoint => {
                items = [
                    ...items,
                    ...data[endpoint]
                        .filter(el => !!el?.prep)
                        .map(el => {
                            el.resource = endpoint
                            return el
                        }),
                ]
            })

            console.log({ items })

            this.items = items
        } catch (e) {
            console.log(e)
        }
    },
    computed: {
        Fields() {
            return [
                { key: 'resource', sortable: true },
                'name',

                { key: 'tags', formatter: n => (n ? n.toString() : '') },
                'prep',
                // 'description',
            ]
        },
    },
    methods: {
        displayName(item) {
            return item.name
                ? item.name
                : item.title
                ? item.title
                : item.content
                ? item.content
                : '<link />'
        },
        async togglePrep(item, index) {
            try {
                // extract the resource prop
                // and don't send in patch body
                let { resource, ...data } = item

                // toggle the prep value
                data.prep = !item.prep

                // send patch request
                let results = await this.$axios.request({
                    method: 'patch',
                    data,
                    url: `/${resource}/${item.id}`,
                })

                console.log({ results })

                // create splice element from returned results
                let { data: element } = results

                // set the element's resource properly
                // for future server requests
                element.resource = resource

                // splice that element into the table
                this.items.splice(index, 1, element)
            } catch (e) {
                console.log(e)
            }
            return
        },
        onError({ statusCode }) {
            console.log('onError')
            if (statusCode === 404) {
                this.$router.push({ name: 'Prep' })
                this.$bvToast.toast(
                    'Resource with this id could not be found',
                    {
                        title: '404',
                        variant: 'warning',
                    }
                )
            }
        },
        onCancel() {
            this.$router.push({ name: 'Prep' })
        },
        onClear() {
            console.log('onClear bubbles to prepview', {
                params: this.$route.params,
            })
        },
        onSubmit() {
            console.log('onSubmit bubbles to prepview', {
                params: this.$route.params,
            })
            this.$router.go()
        },
    },
}
</script>
<style>
.description {
    text-align: left;
    font-size: 0.75em;
}
.td_name {
    text-align: left;
}
.cheatsheet {
    font-size: 0.75em;
    text-align: left;
    opacity: 0.9;
}
.tooltip .tooltip-inner {
    max-width: 700px !important;
    width: 700px !important;
    color: black;
    /* opacity: 1 !important; */
}
.tooltip.show {
    /* opacity: 1 !important; */
}
</style>
