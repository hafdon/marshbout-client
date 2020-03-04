/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        controlpressed: false,
        dirty: false,
        keyboard_shortcuts: true,
        show_randomize_button: true,
        // todo: use this
    },
    getters: {
        controlpressed(state) {
            return state.keyboard_shortcuts && state.controlpressed
        },
        keyboardShortcuts(state) {
            debugger
            return state.keyboard_shortcuts
        },
        dirty(state) {
            return state.dirty
        },
        clean(state) {
            return !state.dirty
        },

        compiledMarkdown: state => html => {
            return this.$marked(html, { sanitize: true })
        },
        show: state => element => {
            if (element.name === 'z-table-random-btn') {
                return true
            }
        },
        getRandomEl: state => arr => {
            return arr[Math.floor(Math.random() * arr.length)]
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
        toggleKeyboardShortcuts(state) {
            debugger
            state.keyboard_shortcuts = !state.keyboard_shortcuts
        },
    },
    actions: {},
    modules: {},
})
