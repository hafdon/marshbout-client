<template>
    <b-table responsive sticky-header :items="Items"></b-table>
</template>

<script>
export default {
    name: 'ContinuityList',
    data() {
        return {
            apiItems: [],
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
    computed: {
        Items() {
            if (this.items.length) {
                return this.items
            }
            return this.apiItems
        },
    },
    methods: {
        async loadItems() {
            try {
                let results = await this.$axios.request({
                    method: 'get',

                    url: 'continuity',
                })
                this.apiItems = results.data
            } catch (e) {
                console.log(e)
            }
        },
    },
}
</script>

<style></style>
