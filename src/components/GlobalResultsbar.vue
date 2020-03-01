<template>
    <b-container v-if="popoverShow" class="m-0 p-0">
        <b-popover class="m-0 p-0" v-on="listeners" v-bind="attrs"
            ><b-list-group flush class="m-0 p-1">
                <b-list-group-item
                    flush
                    class="m-0 pl-1 pr-0 py-0 no-border"
                    v-for="i in my_items"
                    :key="`${i.resource}_${i.id}`"
                    action
                    :to="{
                        path: `/${i.resource}/${i.id}`,
                    }"
                    @click="onClick"
                >
                    {{ i.resource }}:
                    {{
                        i.name
                            ? i.name
                            : i.title
                            ? i.title
                            : i.content
                            ? i.content
                            : i.session_date
                            ? i.session_date
                            : ''
                    }}
                </b-list-group-item>
            </b-list-group></b-popover
        >
    </b-container>
</template>

<script>
export default {
    name: 'GlobalResultsbar',
    props: {
        items: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            my_items: [],
            popoverShow: false,
        }
    },
    watch: {
        items: {
            immediate: true,
            deep: true,
            handler(val) {
                console.log({ resultsbar_watcher_items: val })
                if (val?.length) {
                    this.my_items = val
                    this.popoverShow = true
                } else {
                    this.my_items = []
                    this.popoverShow = false
                }
                console.log({
                    resultsbar_data_items: this.my_items,
                    popoverShow: this.popoverShow,
                })

                return
            },
            popoverShow: {
                immediate: true,
                handler(val) {
                    console.log({ popoverShow: val })
                    return
                },
            },
        },
    },
    created() {
        console.log('Resultsbar created')
    },
    computed: {
        listeners() {
            const { ...listeners } = this.$listeners
            return listeners
        },
        attrs() {
            const { ...attrs } = this.$attrs

            return attrs
        },
    },
    methods: {
        onClick() {
            console.log({ resultsbar: 'onclick' })
            this.my_items = []
            this.$emit('click')
        },
    },
}
</script>

<style scoped>
.no-border {
    border-style: dotted;
}
.popover-body {
    padding: 0;
}
</style>
