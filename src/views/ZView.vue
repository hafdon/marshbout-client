<template>
    <b-container fluid>
        <h4 class="text-left">{{ heading }}</h4>
        <b-row>
            <b-col xs="12" lg="6">
                <b-card no-body bg-variant="light">
                    <b-card-body>
                        <ZForm
                            :id="selected_id"
                            @cancel="onCancel"
                            @submit="onSubmit"
                            @remove="onRemove"
                            :axios="axios"
                            :blank-form="blankForm"
                            :controls="controls"
                        ></ZForm>
                    </b-card-body>
                </b-card>
            </b-col>
            <b-col>
                <b-card no-body bg-variant="light">
                    <template v-slot:header>
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
                    </template>
                    <b-card-body>
                        <ZTable
                            ref="ztable"
                            :axios="axios"
                            :fields="fields"
                            @row-selected="onRowSelected"
                            sticky-header="750px"
                            :no-border-collapse="true"
                            :filter="tableFilter"
                        />
                    </b-card-body>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
    name: 'ZView',
    props: {
        heading: String,
        title: String,
        id: {
            required: false,
            default: undefined,
        },
        filterDebounce: {
            required: false,
            default: '200',
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
    },
    watch: {
        id: {
            immediate: true,
            handler: function(val, old) {
                console.log({ workview: { id: { val, old } } })
                this.selected_id = +val
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
    },
    created() {
        console.log('ZView created')
    },
    mounted() {
        document.title = this.title
    },
    data() {
        return {
            selected_id: undefined,
        }
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
    },
}
</script>

<style></style>
