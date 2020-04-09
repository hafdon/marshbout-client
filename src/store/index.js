/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Vuex from 'vuex'
// import marked from 'marked'
import { Remarkable } from 'remarkable'
var marked = new Remarkable()
const createDOMPurify = require('dompurify')
const DOMPurify = createDOMPurify()
const clean = function(n) {
    return DOMPurify.sanitize(n)
}
import router from '@/router/index.js'

var md = require('markdown-it')()
    .use(require('markdown-it-footnote'))
    .use(require('markdown-it-deflist'))
    .use(require('markdown-it-task-lists'))

Vue.use(Vuex)

const getRandomInt = function(max) {
    return Math.floor(Math.random() * Math.floor(max)) + 1
}

export default new Vuex.Store({
    state: {
        controlpressed: false,
        dirty: false,
        keyboard_shortcuts: true,
        show_randomize_button: true,
        // todo: use this
        autoHideDelay: 10000,
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
        getAutoHideDelay(state) {
            return state.autoHideDelay
        },

        compiledMarkdown: state => value => {
            if (value) {
                // return marked(value, { sanitized: true })
                // return clean(marked.render(value))
                return clean(md.render(value))
            }
            return ''
        },

        show: state => element => {
            if (element.name === 'z-table-random-btn') {
                return true
            }
        },
        getRandomEl: state => arr => {
            return arr[Math.floor(Math.random() * arr.length)]
        },
        parseSelection: state => text => {
            text = String(text)
            let orig, num, die, plus
            try {
                ;[orig, num, die, plus] = [
                    ...text.matchAll(/([\d]+)?d([\d]+)[\s]*\+?[\s]*([\d]+)?/g),
                ][0]
                plus = +plus ? +plus : 0
            } catch (e) {
                console.log('Not in ndx+y form')
            }

            // if we didn't get any result from that
            // then try just a +x (where we're rolling 1d20 + x)
            if (!num) {
                console.log('!num')
                console.log(text)
                console.log([...text.matchAll(/[\s]*\+[\s]*([\d]+)[\s]*/g)])
                ;[orig, plus] = [
                    ...text.matchAll(/[\s]*\+[\s]*([\d]+)[\s]*/g),
                ][0]
                plus = +plus ? +plus : 0
                if (plus) {
                    num = 1
                    die = 20
                    orig = '1d20' + orig
                }
            }
            console.log({ orig, num, die, plus })

            //    let total = +num * +die + (+plus ? +plus : 0)

            let rolls = new Array(+num)
                .fill(+die)
                .map(val => getRandomInt(val), 0)

            let total = plus + rolls.reduce((p, c) => p + c, 0)
            console.log({ total })

            return `${orig} : ${rolls.toString()} + ${plus}  : ${total}`
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
        setAutoHideDelay(state, val) {
            // console.log(state)
            state.autoHideDelay = +val
        },
    },
    actions: {},
    modules: {},
})
