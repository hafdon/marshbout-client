<template>
    <b-table
        selectable
        select-mode="single"
        @row-selected="onRowSelected"
        @row-clicked="onRowClicked"
        class="m-0 p-0"
        striped
        hover
        small
        responsive
        fixed
        :items="Items"
        :fields="Fields"
        ref="z-table"
        tbody-class="text-left"
        :sticky-header="stickyHeader"
        :no-border-collapse="noBorderCollapse"
        :filter="filter"
        primary-key="id"
        @filtered="onFiltered"
    >
        <template v-slot:table-colgroup="scope">
            <col
                v-for="field in scope.fields"
                :key="field.key"
                :style="{ width: field.key === 'name' ? '180px' : field.key === 'tags' ? '50px' : '30px' }"
            />
        </template>
    </b-table>
</template>

<script>
export default {
    name: 'ZTable',
    data() {
        return {
            apiItems: [],
            row_selected_index: null,
            controlpressed: false,
            filteredLength: 0,
        }
    },
    props: {
        filter: {
            required: false,
            default: '',
        },
        stickyHeader: {
            required: false,
            default: false,
        },
        noBorderCollapse: {
            required: false,
            default: true,
        },
        items: {
            required: false,
            default: () => [],
        },
        fields: {
            required: false,
            default: () => [],
        },
        axios: {
            required: true,
            validator: ({ url = '', method = 'get', data = {} }) => {
                return (
                    (typeof url === 'string' || url instanceof String) &&
                    (typeof method === 'string' || method instanceof String) &&
                    typeof data === 'object'
                )
            },
        },
    },
    watch: {
        items: {
            immediate: true,
            deep: true,
            handler(val, old) {
                console.log({ items: { val, old } })
                this.filteredLength = val.length || 0
                return
            },
        },
        apiItems: {
            immediate: true,
            deep: true,
            handler(val, old) {
                console.log({ apiItems: { val, old } })
                this.filteredLength = val.length || 0
                return
            },
        },
        fields: {
            immediate: true,
            deep: true,
            handler(val, old) {
                console.log({ fields: { val, old } })
                return
            },
        },
        axios: {
            immediate: true,
            deep: true,
            handler(val, old) {
                console.log({ axios: { val, old } })
                this.loadItems()

                return
            },
        },
        filteredLength: {
            immediate: true,
            handler(val, old) {
                console.log({ filteredLength: { val, old } })
                return
            },
        },
    },
    async created() {
        try {
            await this.loadItems()
        } catch (e) {
            console.log(e)
        }
    },
    mounted() {
        window.addEventListener('keypress', this.onKeypress, false)
        window.addEventListener('keydown', this.onKeydown, false)
        window.addEventListener('keyup', this.onKeyup, false)
    },
    beforeDestroy() {
        window.removeEventListener('keypress', this.onKeypress, false)
        window.removeEventListener('keydown', this.onKeydown, false)
        window.removeEventListener('keyup', this.onKeyup, false)
    },
    computed: {
        Items() {
            // this ctx object is the component, but you can access
            // the data props (such as current page and page size)
            // for passing to the api

            if (this.items.length) {
                return this.items
            }
            return this.apiItems
        },
        Fields() {
            let fields = this.fields.length
                ? this.fields
                : this.Items?.length
                ? Object.keys(this.Items[0]).filter(k => k !== 'id')
                : []
            console.log({ Fields: fields })
            return fields
        },
        wraparoundMod() {
            return Math.min(this.Items.length, this.filteredLength)
        },
    },
    methods: {
        onKeypress({ key }) {
            if (this.row_selected_index === null) {
                this.row_selected_index = 0
            }
            try {
                console.log({ onKeypress: key })

                if (this.controlpressed && ['j', 'J'].includes(key)) {
                    this.unselectRow(this.row_selected_index)
                    this.row_selected_index =
                        (this.row_selected_index + 1 + this.wraparoundMod) %
                        this.wraparoundMod
                    this.selectRow(this.row_selected_index)
                } else if (this.controlpressed && ['k', 'K'].includes(key)) {
                    this.unselectRow(this.row_selected_index)
                    this.row_selected_index =
                        (this.row_selected_index - 1 + this.wraparoundMod) %
                        this.wraparoundMod

                    this.selectRow(this.row_selected_index)
                } else if (this.controlpressed && ['x', 'X'].includes(key)) {
                    this.clearSelected()
                } else if (this.controlpressed && ['m', 'M'].includes(key)) {
                    this.selectRandom()
                }
                console.log({ index: this.row_selected_index })
            } catch (e) {
                console.log(e)
            }
        },
        clearSelected() {
            let ref = 'z-table'
            this.$refs[ref].clearSelected()
        },
        selectRow(index) {
            let ref = 'z-table'
            this.$refs[ref].selectRow(index)
        },
        unselectRow(index) {
            let ref = 'z-table'
            this.$refs[ref].unselectRow(index)
        },
        onKeydown({ keyCode }) {
            if ([17, 18].includes(keyCode)) {
                this.controlpressed = true
            }
        },
        onKeyup({ keyCode }) {
            if ([17, 18].includes(keyCode)) {
                this.controlpressed = false
            }
        },
        onRowClicked(data, index) {
            this.row_selected_index = index
        },
        getRef(ref) {
            return this.$refs[ref] || null
        },
        setFocus: function(ref) {
            // Note, you need to add a ref="search" attribute to your input.
            this.$refs[ref].focus()
        },
        async loadItems() {
            try {
                let { method, url, data } = this.axios
                let results = await this.$axios.request({
                    method,
                    url,
                    data,
                })
                this.apiItems = results.data
            } catch (e) {
                console.log(e)
            }
        },

        onRowSelected(args) {
            this.$emit('row-selected', { row: args[0] })

            if (args.length) {
                // we're handed an array, which only has one element
                // singe select-mode=single
                let data = args[0]
                this.selected_id = data.id
                this.selected_username = data.name
                this.selected_gid = data.g_id
            } else {
                this.selected_id = null
                this.selected_username = null
                this.selected_gid = null
            }
        },
        selectRandom() {
            this.clearSelected()
            this.row_selected_index = this.getRandomInt(this.filteredLength)
            this.selectRow(this.row_selected_index)
        },
        getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max))
        },

        onFiltered(filteredItems) {
            this.filteredLength = filteredItems.length || 0
            console.log({ 'after filter': this.filteredLength })
        },
    },
}
</script>

<style></style>
