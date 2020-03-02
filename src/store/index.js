import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        controlpressed: false,
        dirty: false,
    },
    getters: {
        // eslint-disable-next-line no-unused-vars
        controlpressed(state) {
            return state.controlpressed
        },
        dirty(state) {
            return state.dirty
        },
        clean(state) {
            return !state.dirty
        },
        // eslint-disable-next-line no-unused-vars
        compiledMarkdown: state => html => {
            return this.$marked(html, { sanitize: true })
        },
    },
    mutations: {
        controlUp(state) {
            console.log('controlUp')
            state.controlpressed = false
        },
        controlDown(state) {
            console.log('controlDown  ')
            state.controlpressed = true
        },
        makeDirty(state) {
            console.log('makeDirty')
            state.dirty = true
        },
        makeClean(state) {
            console.log('makeClean')
            state.dirty = false
        },
    },
    actions: {},
    modules: {},
})
