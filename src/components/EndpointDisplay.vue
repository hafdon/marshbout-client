<template>
    <b-container>
        <div class="text-left" v-for="(d, index) of displayKeys" :key="index">
            <b-row v-if="show(display[d], d)">
                <strong>{{d}}:</strong>
                {{display[d]}}
            </b-row>
        </div>
    </b-container>
</template>

<script>
export default {
    name: 'EndpointDisplay',
    props: {
        url: {
            type: String,
            required: true,
        },
    },
    watch: {
        url: {
            immediate: true,
            handler(val) {
                this.getResource()
                console.log({ endpoint_display_watch_url: val })
            },
        },
    },
    data() {
        return {
            display: null,
        }
    },
    computed: {
        displayKeys() {
            return this.display !== null ? Object.keys(this.display) : []
        },
    },
    methods: {
        async getResource() {
            try {
                let { data } = await this.$axios.request({
                    method: 'get',
                    url: this.url,
                })
                this.display = data
                console.log({ display: this.display })
            } catch (e) {
                console.log(e)
            }
        },
        show(el, key) {
            console.log({ el, array_is_array: Array.isArray(el) })
            if (
                [
                    'id',
                    'prep',
                    'tags',
                    'claimed',
                    'name',
                    'title',
                    'contents',
                ].includes(key) ||
                el === null ||
                el === undefined ||
                !el
            ) {
                return false
            } else if (Array.isArray(el) && el.length === 0) {
                return false
            }
            return true
        },
    },
}
</script>

