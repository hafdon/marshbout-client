<template>
    <b-container>
        <h1>Campaign Dash</h1>
        <b-card-group columns>
            <b-card no-body>
                <template v-slot:header>
                    <span class="float-left">
                        <h4>Active Clocks</h4>
                    </span>
                    <span class="float-right">
                        Day

                        <b-form-input
                            step="1"
                            type="number"
                            v-model="form.day"
                        ></b-form-input>
                    </span>
                </template>
                <b-card-body>
                    <ZTable
                        ref="ztable"
                        :axios="axios"
                        :fields="fields"
                        sticky-header="750px"
                        :no-border-collapse="true"
                        :filter="tableFilter"
                    ></ZTable>
                </b-card-body>
            </b-card>
        </b-card-group>
    </b-container>
</template>

<script>
import ZTable from '@/components/ZTable.vue'
export default {
    name: 'CampaignDash',
    components: { ZTable },
    data() {
        return {
            form: {
                day: 6,
            },
            selected_id: undefined,

            fields: [
                { key: 'name', value: 'Name', sortable: true },
                { key: 'start_date' },
                { key: 'protension' },
            ],
            tableFilter: '',

            controlpressed: false,
        }
    },
    watch: {
        form: {
            immediate: true,
            deep: true,
            handler(val, old) {
                console.log({ form: { val, old } })
                return
            },
        },
    },
    computed: {
        axios() {
            return {
                url: 'clock' + this.slug,
                method: 'get',
                data: {},
            }
        },
        slug() {
            let active_clocks_slug = `start_date_lte=${this.form.day}`
            return `?${active_clocks_slug}`
        },
    },
}
</script>

<style></style>
