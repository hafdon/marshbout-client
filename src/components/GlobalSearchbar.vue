<template>
    <!-- <b-form-input
        v-on="$listeners"
        v-bind="$attrs"
        :value="value"
        @input="input"
        debounce="1000"
    ></b-form-input> -->
    <b-form-input
        ref="searchbar-input"
        :id="id"
        debounce="500"
        v-model="value"
    ></b-form-input>
</template>

<script>
import _ from 'lodash'
export default {
    name: 'GlobalSearchbar',
    props: ['id'],
    watch: {
        value: {
            immediate: true,
            // eslint-disable-next-line no-unused-vars
            async handler(query, old) {
                console.log({ GlobalSearchbar_value_change: query })
                if (!query) {
                    this.$emit('submit', { items: [] })
                    return
                }
                try {
                    let { data: db = {} } = await this.$axios.request({
                        method: 'get',
                        url: '/db',
                    })

                    //TODO: we're already getting all the data here anyway;
                    // think about just ... using that
                    let searchableResources = Object.getOwnPropertyNames(db)

                    delete searchableResources.lexeme

                    let items = [],
                        axios = this.$axios
                    await Promise.all(
                        searchableResources.map(async resource => {
                            console.log({ resource })
                            let { data } = await axios.request({
                                method: 'get',
                                url: `/${resource}/?q=${query}`,
                            })

                            items = [
                                ...items,
                                ...(Array.isArray(data)
                                    ? data.map(({ ...rest }) => ({
                                          resource,
                                          ...rest,
                                      }))
                                    : []),
                            ]
                        })
                    )

                    this.$emit('submit', { items })
                    return
                } catch (e) {
                    console.log(e)
                }
            },
        },
    },
    data() {
        return {
            value: '',
        }
    },
    computed: {
        // listeners() {
        //     const { ...listeners } = this.$listeners
        //     return listeners
        // },
        // attrs() {
        //     const { ...attrs } = this.$attrs
        //     return attrs
        // },
    },
    methods: {
        // input(value) {
        //     console.log({ globalsearchbar_input_value: value })
        //     this.$emit('input', value)
        // },
        input: _.debounce(function(value) {
            console.log({ source: 'DebouncedInput component', value })
            // if using <input> element instead of <b-form-input>
            // then the evt object has evt.target.value
            // b-form-input only passes value
            this.$emit('input', value)
        }, 500),
        clear() {
            this.value = ''
        },
        focus() {
            this.$refs['searchbar-input'].focus()
        },
    },
}
</script>

<style></style>
