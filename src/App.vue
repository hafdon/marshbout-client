<template>
    <b-container id="app" fluid>
        <b-navbar variant="dark" type="light" class="mb-4">
            <!-- <b-navbar-brand href="#">rpg.tools</b-navbar-brand> -->
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
                        <b-dropdown-item to="/campaigndash">
                            <span class="shortcut-key">D</span>ashboard
                        </b-dropdown-item>
                        <b-dropdown-item :to="{ name: 'Prep' }"
                            >Prep</b-dropdown-item
                        >
                        <b-dropdown-item to="/recap">Recaps</b-dropdown-item>
                        <b-dropdown-item to="/improvisation"
                            >Improvisation</b-dropdown-item
                        >
                        <b-dropdown-item to="/work">
                            <span class="shortcut-key">W</span>orks
                        </b-dropdown-item>
                        <b-dropdown-item to="/faction"
                            >Factions</b-dropdown-item
                        >
                        <b-dropdown-item to="/clock">Clocks</b-dropdown-item>
                        <b-dropdown-item to="/description">
                            D
                            <span class="shortcut-key">e</span>scription
                        </b-dropdown-item>
                        <b-dropdown-item
                            class="pl-4"
                            to="/bible"
                            v-html="keyHighlight('Bible', 'B')"
                        ></b-dropdown-item>
                        <b-dropdown-item to="/transcript"
                            >Transcripts</b-dropdown-item
                        >
                        <b-dropdown-item to="/location"
                            >Locations</b-dropdown-item
                        >
                        <b-dropdown-item to="/position"
                            >Positions</b-dropdown-item
                        >
                        <b-dropdown-item to="/npc">
                            <span class="shortcut-key">N</span>PCs
                        </b-dropdown-item>
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
    beforeRouteLeave() {
        // eslint-disable-next-line no-console
        console.log('leaving route')
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
    },
    data() {
        return {
            search_items: [],
            search_bar: '',
            breadcrumbs: [],
            threebox: null,
        }
    },
    watch: {
        // controlpressed: {
        //     immediate: true,
        //     handler(val, old) {
        //         console.log({ controlpressed: { val, old } })
        //     },
        // },
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
        onKeypress({ key }) {
            try {
                // eslint-disable-next-line no-console
                console.log({ onKeypress: key })

                if (this.controlpressed) {
                    if (/h/i.exec(key) !== null) {
                        this.pushRoute({ route: '/' })
                    } else if (/d/i.exec(key) !== null) {
                        this.pushRoute({ route: '/campaigndash' })
                    } else if (/n/i.exec(key) !== null) {
                        this.pushRoute({ route: '/npc' })
                    } else if (/l/i.exec(key) !== null) {
                        this.pushRoute({ route: '/location' })
                    } else if (/f/i.exec(key) !== null) {
                        this.pushRoute({ route: '/faction' })
                    } else if (/c/i.exec(key) !== null) {
                        this.pushRoute({ route: '/clock' })
                    } else if (/e/i.exec(key) !== null) {
                        this.pushRoute({ route: '/description' })
                    } else if (/w/i.exec(key) !== null) {
                        this.pushRoute({ route: '/work' })
                    } else if (/b/i.exec(key) !== null) {
                        this.pushRoute({ route: '/bible' })
                    } else if (/s/i.exec(key) !== null) {
                        this.setFocus('globalsearchbar')
                    } else if (/p/i.exec(key) !== null) {
                        this.pushRoute({ route: '/prep' })
                    } else if (/r/i.exec(key) !== null) {
                        this.pushRoute({ route: '/recap' })
                    }
                }
            } catch (e) {
                console.log(e)
            }
        },
        pushRoute({ route }) {
            if (this.dirty) {
                if (
                    window.confirm(
                        'You have unsaved changes. Click "ok" to discard changes.'
                    )
                ) {
                    this.makeClean()
                }
            }
            if (this.clean) {
                this.$router.push(route)
            }
        },
        keyHighlight(word, letter) {
            let splitted = String(word).split(letter)
            return `${splitted[0]}<span class="shortcut-key">${letter}</span>${splitted[1]}`
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
