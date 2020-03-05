<template>
    <b-card no-body>
        <template v-slot:header><slot></slot></template>
        <b-tabs card>
            <b-tab title="Markdown" active>
                <b-form-textarea
                    class="form-textarea-markdown"
                    v-on="listeners"
                    v-bind="attrs"
                    :value="value"
                    @input="input"
                    :rows="Rows"
                ></b-form-textarea>
            </b-tab>
            <b-tab title="Preview">
                <b-card-text class="text-left">
                    <div v-html="cm"></div>
                </b-card-text>
            </b-tab>
        </b-tabs>
    </b-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'FormTextareaMarkdown',
    inheritAttrs: false,
    props: ['value'],
    computed: {
        ...mapGetters({
            compiledMarkdown: 'compiledMarkdown',
        }),
        listeners() {
            const { ...listeners } = this.$listeners
            return listeners
        },
        attrs() {
            const { ...attrs } = this.$attrs
            return attrs
        },
        cm() {
            return this.compiledMarkdown(this.value)
        },
        Rows() {
            return Math.min(String(this.value).split(/\n/g).length, 10)
        },
    },
    methods: {
        input(value) {
            this.$emit('input', value)
        },
    },
}
</script>

<style scoped>
/* .form-textarea-markdown {
    height: auto;
} */
</style>
