<template>
    <div>
        <!-- <div>
            TableFieldsFormGroupCheckboxOptions:<br />
            {{ TableFieldsFormGroupCheckboxOptions }}
        </div>
        <br />
        <div>
            tableFieldsFormGroupCheckboxesVModel:<br />
            {{ tableFieldsFormGroupCheckboxesVModel }}
            <b-button @click="tableFieldsFormGroupCheckboxesVModel = []"
                >click</b-button
            >
        </div>
        <br />
        <div>
            TableFields:<br />
            {{ TableFields }}
        </div>
        <div>
            Fields:<br />
            {{ Fields }}
        </div>
        <div>
            initialFieldOptions:<br />
            {{ initialFieldOptions }}
        </div>
        <div>
            fieldOptions:<br />
            {{ fieldOptions }}
        </div> -->

        <b-table
            outlines
            selectable
            select-mode="single"
            @row-selected="onRowSelected"
            @row-clicked="onRowClicked"
            class="m-0 p-0 z-border"
            striped
            hover
            small
            responsive
            fixed
            :items="Items"
            :fields="TableFields"
            :ref="ZTableRef"
            id="z-table"
            tbody-class="text-left"
            :table-class="tableClass"
            :sticky-header="stickyHeader"
            :no-border-collapse="noBorderCollapse"
            :filter="filter"
            primary-key="id"
            @filtered="onFiltered"
            caption-top
            :sort-compare-options="{ numeric: true, sensitivity: 'base' }"
            :filterByFormatted="true"
            :sort.sync="sortBy"
        >
            <!-- eslint-disable-next-line vue/no-unused-vars -->
            <template v-slot:table-caption>
                <span class="float-right m-0 p-0">
                    <b-button-toolbar class="m-0 p-0">
                        <b-button-group>
                            <b-dd dropleft no-caret>
                                <template v-slot:button-content>
                                    <b-icon-list
                                        font-scale="1.5"
                                        variant="light"
                                    ></b-icon-list>
                                </template>
                                <b-dropdown-form>
                                    <b-form-checkbox-group
                                        v-model="
                                            tableFieldsFormGroupCheckboxesVModel
                                        "
                                        :options="
                                            TableFieldsFormGroupCheckboxOptions
                                        "
                                    ></b-form-checkbox-group>
                                </b-dropdown-form>
                            </b-dd>
                        </b-button-group>
                    </b-button-toolbar>
                </span>
            </template>
            <template v-slot:table-colgroup="scope">
                <col
                    v-for="field in scope.fields"
                    :key="field.key"
                    :style="{
                        width:
                            (colWidthMap[field.key]
                                ? colWidthMap[field.key]
                                : 30) + 'px',
                    }"
                />
            </template>
        </b-table>
    </div>
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
            mousepressed: false,
            tableClass: 'table-resizable',
            startWidth: 0,
            startX: 0,
            colWidthMap: {
                name: 180,
                content: 180,
                tags: 50,
            },
            tableFieldsFormGroupCheckboxesVModel: [],
            fieldOptions: [],
        }
    },
    props: {
        sortBy: String,
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
            required: true,
            type: Array,
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
        initialFieldOptions: {
            required: false,
            default: () => ['id'],
            type: Array,
        },
    },
    watch: {
        initialFieldOptions: {
            immediate: true,
            deep: true,
            handler(val, old) {
                console.log({ initialFieldOptions: { val, old } })

                this.tableFieldsFormGroupCheckboxesVModel = [...val]
                return
            },
        },
        items: {
            immediate: true,
            deep: true,
            handler(val) {
                // console.log({ items: { val, old } })
                this.filteredLength = val.length || 0
                return
            },
        },
        apiItems: {
            immediate: true,
            deep: true,
            handler(val) {
                // console.log({ apiItems: { val, old } })
                this.filteredLength = val.length || 0
                return
            },
        },
        fields: {
            immediate: true,
            deep: true,
            // eslint-disable-next-line no-unused-vars
            handler(val) {
                console.log({ fields: { val } })

                this.fieldOptions = this.Fields.map(({ key }) => key)
                return
            },
        },
        axios: {
            immediate: true,
            deep: true,
            handler(val, old) {
                console.log({ Ztable_axios: { val, old } })
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
        tableClass: {
            immediate: true,
            handler() {
                return
            },
        },
        tableFieldsFormGroupCheckboxesVModel: {
            immediate: true,
            deep: true,
            handler(val, old) {
                if (val.length === 0 && old) {
                    window.alert('You must have at least one field showing')

                    // have to update on nextTick or else the <b-dd> v-model doesn't recognize that
                    // the v-model value has been changed  to 'old
                    this.$nextTick(function() {
                        this.tableFieldsFormGroupCheckboxesVModel = old.splice(
                            0
                        )
                    })
                }
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
        window.addEventListener('mousedown', this.onMousedown, false)
        window.addEventListener('mousemove', this.onMousemove, false)
        window.addEventListener('mouseup', this.onMouseup, false)
    },
    beforeDestroy() {
        window.removeEventListener('keypress', this.onKeypress, false)
        window.removeEventListener('keydown', this.onKeydown, false)
        window.removeEventListener('keyup', this.onKeyup, false)
        window.removeEventListener('mousedown', this.onMousedown, false)
        window.removeEventListener('mousemove', this.onMousemove, false)
        window.removeEventListener('mouseup', this.onMouseup, false)
    },
    computed: {
        ZTableRef() {
            return 'z-table'
        },
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
            return this.fields
        },

        TableFields() {
            let using = this.Fields

            // if there are elements in Fields,
            // then return (as the visible table columns)

            let fields = using.length
                ? using.filter(({ key }) =>
                      this.tableFieldsFormGroupCheckboxesVModel.includes(key)
                  )
                : []
            console.log({ Fields: fields })
            return fields
        },
        wraparoundMod() {
            return Math.min(this.Items.length, this.filteredLength)
        },
        TableFieldsFormGroupCheckboxOptions() {
            //
            return this.fieldOptions
        },
    },
    methods: {
        onMousedown(event) {
            console.log({
                mousedown: {
                    event,
                    target: event.target,
                    tpn: Object.getOwnPropertyNames(event.target),
                    tpn_prevcalss: event.target._prevClass,
                    tpn__vue: event.target.__vue__,
                    0: Object.getOwnPropertyNames(event.path[0]),
                },
            })

            if (event.target._prevClass === 'table-b-table-default') {
                // console.log(
                //     `event.target._prevClass === 'table-b-table-default'`
                // )
                this.mousepressed = true
                this.startX = event.pageX
                this.startWidth = this.colWidthMap[
                    event.target.__vue__.$vnode.key
                ]
                // console.log({ ztable: this.$refs[this.ZTableRef] })
                this.tableClass = this.tableClass.includes('resizing')
                    ? this.tableClass
                    : this.tableClass + ' resizing'
            }
        },

        onMousemove(event) {
            // console.log({ onMousemove: event, mousepressed: this.mousepressed })

            if (this.mousepressed) {
                let x = this.startWidth + (event.pageX - this.startX)
                // console.log({ onMousemove: x })
                this.colWidthMap[event.target.__vue__.$vnode.key] = Math.max(
                    20,
                    x
                )
            }
        },
        onMouseup() {
            if (this.mousepressed) {
                this.tableClass = this.tableClass.replace('resizing', '')
                this.mousepressed = false
            }
        },
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
            this.$refs[this.ZTableRef].clearSelected()
        },
        selectRow(index) {
            this.$refs[this.ZTableRef].selectRow(index)
        },
        unselectRow(index) {
            this.$refs[this.ZTableRef].unselectRow(index)
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
                console.log({ ztable_loaditems_: { method, url, data } })
                let results = await this.$axios.request({
                    method,
                    url,
                    data,
                })
                this.apiItems = results.data
                console.log({ ztable_loaditems_results: results.dad })
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

<style scoped>
th.table-resizable {
    position: relative;
}

td.table-resizable {
    max-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.resizing {
    cursor: col-resize;
    user-select: none;
}
</style>
