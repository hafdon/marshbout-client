<template>
    <b-container id="app" fluid>
        <b-navbar variant="dark" type="light" class="mb-4">
            <!-- <b-navbar-brand href="#">rpg.tools</b-navbar-brand> -->
            <b-navbar-nav>
                <b-nav-item
                    ><b-icon-gear-fill
                        @click="$router.push('/settings')"
                        font-scale="2"
                        variant="light"
                    ></b-icon-gear-fill
                ></b-nav-item>
            </b-navbar-nav>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <!-- <b-nav-text
                ><b-breadcrumb :items="breadcrumbs"></b-breadcrumb
            ></b-nav-text>-->

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="ml-auto">
                    <b-nav-form>
                        <GlobalSearchbar
                            ref="globalsearchbar"
                            id="global-search-bar"
                            @submit="onSubmit"
                            v-model="search_bar"
                        ></GlobalSearchbar>
                        <GlobalResultsbar
                            class="m-0 p-0"
                            target="global-search-bar"
                            :items="search_items"
                            @click="onResultsClick"
                            triggers="hover focus click"
                            :show="!!search_items.length"
                        ></GlobalResultsbar>
                    </b-nav-form>

                    <b-nav-item-dropdown
                        dropleft
                        text="routes"
                        variant="primary"
                    >
                        <template v-slot:button-content>
                            <b-button
                                :variant="
                                    controlpressed
                                        ? 'outline-danger'
                                        : 'outline-light'
                                "
                                >routes</b-button
                            >
                        </template>
                        <b-dropdown-item to="/">
                            <span class="shortcut-key">H</span>ome
                        </b-dropdown-item>

                        <b-dropdown-item
                            v-for="(d, index) in DropdownLinks"
                            :to="d.to"
                            :key="index"
                            ><div
                                v-html="keyHighlight(d.label, d.shortkey)"
                            ></div
                        ></b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>

        <router-view class="m-0 p-0" />
    </b-container>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
import GlobalSearchbar from '@/components/GlobalSearchbar.vue'
import GlobalResultsbar from '@/components/GlobalResultsbar.vue'

export default {
    mounted() {
        window.addEventListener('keypress', this.onKeypress, false)
        window.addEventListener('keydown', this.onKeydown, false)
        window.addEventListener('keyup', this.onKeyup, false)
    },
    beforeDestroy() {
        window.removeEventListener('keypress', this.onKeypress, false)
        window.removeEventListener('keydown', this.onKeydown, false)
        window.removeEventListener('keyup', this.onKeyup, false)
    },
    // eslint-disable-next-line no-unused-vars
    beforeRouteUpdate(to, from, next) {
        console.log({ app_beforeRouteLeave: { to, from, next } })

        let response = false

        if (this.dirty) {
            response = window.confirm(
                'You have unsaved changes. Click "ok app" to discard changes.'
            )

            if (response === true) {
                this.makeClean()
            }
        }

        if (this.clean) {
            next()
            return
        }
    },
    components: {
        GlobalSearchbar,
        GlobalResultsbar,
    },
    computed: {
        ...mapGetters({
            controlpressed: 'controlpressed',
            dirty: 'dirty',
            clean: 'clean',
        }),
        DropdownLinks() {
            return this.dropdown_links
                .map(el => el)
                .sort((a, b) => {
                    return a.label.localeCompare(b.label)
                })
        },
    },
    data() {
        return {
            search_items: [],
            search_bar: '',
            breadcrumbs: [],
            threebox: null,
            dropdown_links: [
                {
                    to: '/combat-tracker',
                    shortkey: 'T',
                    label: 'Combat Tracker',
                },
                {
                    to: '/prep',
                    shortkey: 'P',
                    label: 'Prep',
                },
                {
                    to: '/improvisation',
                    shortkey: 'I',
                    label: 'Improv',
                },
                {
                    to: '/work',
                    shortkey: 'W',
                    label: 'Works',
                },
                {
                    to: '/clock',
                    shortkey: 'C',
                    label: 'Clocks',
                },
                {
                    to: '/faction',
                    shortkey: 'F',
                    label: 'Factions',
                },
                {
                    to: '/blades',
                    shortkey: 'a',
                    label: 'Blades',
                },
                {
                    to: '/bible',
                    shortkey: 'B',
                    label: 'Bible',
                },
                {
                    to: '/recap',
                    shortkey: 'e',
                    label: 'Recaps',
                },
                {
                    to: '/lexeme',
                    shortkey: 'x',
                    label: 'Lexems',
                },
                {
                    to: '/settings',
                    shortkey: 'g',
                    label: 'Settings',
                },
            ],
        }
    },
    watch: {
        // controlpressed: {
        //     immediate: true,
        //     handler(val, old) {
        //         console.log({ controlpressed: { val, old } })
        //     },
        // },
        // eslint-disable-next-line no-unused-vars
        $route(to, from) {
            console.log('route switched', to, from)
        },
        threebox: {
            immediate: true,
            handler(val) {
                // eslint-disable-next-line no-console
                console.log({ app_watch_threebox: val })
            },
        },
    },

    methods: {
        ...mapMutations({
            controlUp: 'controlUp',
            controlDown: 'controlDown',
            makeDirty: 'makeDirty',
            makeClean: 'makeClean',
        }),
        setFocus: function(ref) {
            // Note, you need to add a ref="search" attribute to your input.
            this.$refs[ref].focus()
        },
        onSubmit({ items }) {
            // eslint-disable-next-line no-console
            console.log({ app_items_on_submit: items })
            this.search_items = items
        },
        onResultsClick() {
            this.search_bar = ''
            this.$refs.globalsearchbar.clear()
        },
        onKeydown({ keyCode }) {
            if ([17, 18].includes(keyCode)) {
                this.controlDown()
            }
        },
        onKeyup({ keyCode }) {
            if ([17, 18].includes(keyCode)) {
                this.controlUp()
            }
        },

        handleControlPressed(key) {
            let hash1 = Object.fromEntries(
                this.dropdown_links.map(({ shortkey, to }) => ({
                    [shortkey.toLowerCase()]: to.replace('/', ''),
                }))
            )
            console.log({ hash1 })

            let hash = {
                t: '',
                n: 'npc',
                l: 'location',
                f: 'faction',
                c: 'clock',
                d: 'description',
                w: 'work',
                b: 'bible',
                p: 'prep',
                e: 'recap',
                x: 'lexeme',
                o: 'position',
                a: 'blades',
                g: 'settings',
            }
            return hash[key.toLowerCase()] || null
        },
        onKeypress({ key }) {
            try {
                // eslint-disable-next-line no-console
                console.log({ onKeypress: key })

                if (this.controlpressed) {
                    if (/s/i.exec(key) !== null) {
                        this.setFocus('globalsearchbar')
                    } else if (this.handleControlPressed(key) !== null) {
                        this.$router.push('/' + this.handleControlPressed(key))
                    }
                }
            } catch (e) {
                console.log(e)
            }
        },

        keyHighlight(word, letter) {
            console.log({ keyHighlight: { word, letter } })
            let index = String(word).indexOf(letter)

            return `${word.slice(
                0,
                index
            )}<span class="shortcut-key">${letter}</span>${word.slice(
                index + 1
            )}`
        },
    },
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

/* #nav {
    padding: 30px;
    vertical-align: middle;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.b-dropdown-item-exact-active {
    color: #42b983;
} */
.brand {
    color: white;
}
.shortcut-key {
    text-decoration: underline;
    font-weight: bold;
}
</style>
