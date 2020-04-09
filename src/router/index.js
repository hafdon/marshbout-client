import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ErrorView from '../views/ErrorView.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/settings',
        name: 'Settings',
        component: () =>
            import(
                /* webpackChunkName: "settings" */ '../views/SettingsView.vue'
            ),
        props: true,
    },
    {
        path: '/blades',
        name: 'Blades',
        component: () =>
            import(/* webpackChunkName: "blades" */ '../views/BladesView.vue'),
        props: true,
    },
    {
        path: '/lexeme/:id?',
        name: 'Lexeme',
        component: () =>
            import(/* webpackChunkName: "lexeme" */ '../views/LexemeView.vue'),
        props: true,
    },
    {
        path: '/combat-tracker/:id?',
        name: 'CombatTracker',
        component: () =>
            import(
                /* webpackChunkName: "prep" */ '../views/CombatTrackerView.vue'
            ),
        props: true,
    },
    {
        path: '/recording/:id?',
        name: 'Recording',
        component: () =>
            import(
                /* webpackChunkName: "recording" */ '../views/RecordingView.vue'
            ),
        props: true,
    },
    {
        path: '/prep/:id?',
        name: 'Prep',
        component: () =>
            import(/* webpackChunkName: "prep" */ '../views/PrepView.vue'),
        props: true,
    },
    {
        path: '/improvisation',
        name: 'Improvisation',

        component: () =>
            import(
                /* webpackChunkName: "improvisation" */ '../views/ImprovisationView.vue'
            ),
    },
    {
        path: '/work/:id?',

        props: true,

        component: () =>
            import(/* webpackChunkName: "work" */ '../views/WorkView.vue'),
    },

    {
        path: '/npc/:id?',
        name: 'Npc',

        props: true,
        // route level code-splitting
        // this generates a separate chunk (continuity.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "npc" */ '../views/NpcView.vue'),
    },

    {
        path: '/faction/:id?',
        name: 'Faction',

        props: true,
        // route level code-splitting
        // this generates a separate chunk (continuity.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(
                /* webpackChunkName: "faction" */ '../views/FactionView.vue'
            ),
    },

    {
        path: '/description/:id?',
        name: 'Description',

        props: true,
        // route level code-splitting
        // this generates a separate chunk (continuity.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(
                /* webpackChunkName: "description" */ '../views/DescriptionView.vue'
            ),
    },

    {
        path: '/bible/:id?',
        name: 'Bible',
        props: true,
        // route level code-splitting
        // this generates a separate chunk (continuity.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "bible" */ '../views/BibleView.vue'),
    },

    {
        path: '/transcript/:id?',
        name: 'Transcript',
        props: true,
        // route level code-splitting
        // this generates a separate chunk (continuity.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(
                /* webpackChunkName: "transcript" */ '../views/TranscriptView.vue'
            ),
    },
    {
        path: '/location/:id?',
        name: 'Location',

        props: true,
        // route level code-splitting
        // this generates a separate chunk (continuity.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(
                /* webpackChunkName: "location" */ '../views/LocationView.vue'
            ),
    },

    {
        path: '/position/:id?',
        name: 'Position',

        props: true,
        // route level code-splitting
        // this generates a separate chunk (continuity.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(
                /* webpackChunkName: "position" */ '../views/PositionView.vue'
            ),
    },

    {
        path: '/clock/:id?',
        name: 'Clock',

        props: true,
        // route level code-splitting
        // this generates a separate chunk (continuity.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(
                /* webpackChunkName: "clock" */ '../views/FactionClockView.vue'
            ),
    },

    {
        path: '/recap/:id?',
        name: 'Recap',
        props: true,
        // route level code-splitting
        // this generates a separate chunk (continuity.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "recap" */ '../views/RecapView.vue'),
    },
    {
        path: '/campaigndash',
        name: 'CampaignDash',
        props: false,
        // route level code-splitting
        // this generates a separate chunk (continuity.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(
                /* webpackChunkName: "campaigndash" */ '../views/CampaignDashView.vue'
            ),
    },
    {
        path: '*',
        name: '404',
        component: ErrorView,
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router
