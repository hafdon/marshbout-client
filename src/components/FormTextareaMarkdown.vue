<template>
    <b-card no-body>
        <b-card-header class="m-0 p-1 form-textarea-markdown-border">
            <slot></slot>
        </b-card-header>
        <b-tabs card>
            <b-tab
                no-body
                title="Markdown"
                :active.sync="activeTab.markdown"
                class="m-0 p-0"
            >
                <b-form-textarea
                    class="form-textarea-markdown"
                    v-on="listeners"
                    v-bind="attrs"
                    :value="value"
                    @input="input"
                    :rows="RowsCalc"
                ></b-form-textarea>
            </b-tab>
            <b-tab no-body title="Preview" :active.sync="activeTab.preview">
                <b-card-text class="text-left">
                    <div v-html="cm"></div>
                </b-card-text>
            </b-tab>

            <b-tab
                title="Turndown Markdown"
                :active.sync="activeTab.turndownMarkdown"
            >
                <b-card-text class="text-left">
                    <div v-html="tmd"></div>
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
    props: ['value', 'rows'],

    mounted() {
        document.addEventListener('paste', this.onPaste)
    },
    beforeDestroy() {
        document.removeEventListener('paste', this.onPaste)
    },
    data() {
        return {
            tmd: '',
            activeTab: {
                turndownMarkdown: false,
                preview: false,
                markdown: true,
            },
        }
    },
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

        RowsCalc() {
            return Math.min(String(this.value).split(/\n/g).length, this.rows)
        },
    },
    methods: {
        input(value) {
            this.$emit('input', value)
        },

        // async pasteClipboardAsMarkdown() {
        //     try {
        //         let items = await navigator.clipboard.read()
        //         const textBlob = await items[0].getType('text/plain')
        //         const text = await new Response(textBlob).text()

        //         console.log({
        //             pasteClipboardAsMarkdown: { items, textBlob, text },
        //         })
        //         this.tmd = this.$turndown.turndown(text)
        //     } catch (e) {
        //         console.log({ pasteClipboardAsMarkdown_error: e })
        //     }
        // },
        onPaste(e) {
            if (this.activeTab.turndownMarkdown) {
                console.log('this.turndownMarkdownTabActive')

                e.preventDefault()
                let pastedText = ''

                if (window.clipboardData && window.clipboardData.getData) {
                    // IE

                    pastedText = window.clipboardData.getData('Text')
                } else if (e.clipboardData && e.clipboardData.getData) {
                    pastedText = e.clipboardData.getData('text/html')
                }
                console.log({ onPaste: { pastedText } })

                this.tmd = this.$turndown
                    .turndown(pastedText)
                    .replace(/\(javascript:void\(0\)\)/g, '')
                console.log({ tmd: this.tmd })
            }
        },
    },
}
</script>

<style scoped>
/* .form-textarea-markdown {
    height: auto;
} */
.form-textarea-markdown-border {
    /* border-style: solid;
    border-color: red;
    border-width: 2px; */
}
</style>
