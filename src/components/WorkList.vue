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
        :items="Items"
        :fields="Fields"
        ref="worklist-table"
    >
        <template v-slot:cell(title)="data">
            <div class="text-left font-italic">{{data.item.title}}.</div>
        </template>
        <template v-slot:cell(contributor)="data">
            <div class="text-left">{{data.item.contributor}}</div>
        </template>
    </b-table>
</template>

<script>
export default {
    name: 'WorkList',
    data() {
        return {
            apiItems: [],
            row_selected_index: null,
        }
    },
    props: {
        items: {
            immediate: true,
            deep: true,
            handler(val, old) {
                console.log({ items: { val, old } })
                return
            },
            required: false,
            default: () => [],
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
    },
    beforeDestroy() {
        window.removeEventListener('keypress', this.onKeypress, false)
    },
    computed: {
        Items(ctx) {
            // this ctx object is the component, but you can access
            // the data props (such as current page and page size)
            // for passing to the api
            console.log({ 'Items provider function ': { ctx } })
            if (this.items.length) {
                return this.items
            }
            return this.apiItems
        },
        Fields() {
            // return this.Items?.length
            //     ? Object.keys(this.Items[0]).filter(k => k !== 'id')
            //     : []
            return ['title', 'contributor']
        },
    },
    methods: {
        onKeypress({ key }) {
            console.log(key)
            let ref = 'worklist-table'
            if (['j', 'J'].includes(key)) {
                this.$refs[ref].unselectRow(this.row_selected_index)
                this.row_selected_index =
                    (this.row_selected_index + 1 + this.Items.length) %
                    this.Items.length
                this.$refs[ref].selectRow(this.row_selected_index)
            } else if (['k', 'K'].includes(key)) {
                this.$refs[ref].unselectRow(this.row_selected_index)
                this.row_selected_index =
                    (this.row_selected_index - 1 + this.Items.length) %
                    this.Items.length

                this.$refs[ref].selectRow(this.row_selected_index)
            } else if (['x', 'X'].includes(key)) {
                this.$refs[ref].clearSelected()
            }
            console.log({ index: this.row_selected_index })
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
                let results = await this.$axios.request({
                    method: 'get',
                    url: 'work',
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
    },
}
</script>

<style>
</style>
