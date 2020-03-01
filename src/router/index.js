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
        path: '/recording/:id?',
        name: 'Recording',
        component: () =>
            import(/* webpackChunkName: "prep" */ '../views/RecordingView.vue'),
        props: true,
    },
    {
        path: '/prep/:id?',
        name: 'Prep',
        component: () =>
            import(/* webpackChunkName: "prep" */ '../views/PrepView.vue'),
        props: true,

        // children: [
        //     {
        //         path: ':id',
        //         component: () =>
        //             import(
        //                 /* webpackChunkName: "improvisation" */ '../components/PrepForm.vue'
        //             ),
        //         props: true,
        //     },
        //     {
        //         path: '',
        //         name: 'Prep',
        //         component: () =>
        //             import(
        //                 /* webpackChunkName: "prep" */ '../views/PrepView.vue'
        //             ),
        //     },
        // ],
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
        path: '/work/:id',

        props: true,

        component: () =>
            import(/* webpackChunkName: "work" */ '../views/WorkView.vue'),
    },
    {
        path: '/work',
        name: 'Work',
        props: false,
        // route level code-splitting
        // this generates a separate chunk (continuity.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "work" */ '../views/WorkView.vue'),
    },
    {
        path: '/npc/:id',

        props: true,
        // route level code-splitting
        // this generates a separate chunk (continuity.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "npc" */ '../views/NpcView.vue'),
    },
    {
        path: '/npc',
        name: 'NPC',
        props: false,
        // route level code-splitting
        // this generates a separate chunk (continuity.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "npc" */ '../views/NpcView.vue'),
    },
    {
        path: '/faction/:id',

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
        path: '/faction',
        name: 'Faction',
        props: false,
        // route level code-splitting
        // this generates a separate chunk (continuity.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(
                /* webpackChunkName: "faction" */ '../views/FactionView.vue'
            ),
    },
    {
        path: '/description/:id',

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
        path: '/description',
        name: 'Description',
        props: false,
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
        path: '/transcript/:id',

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
        path: '/transcript',
        name: 'Transcript',
        props: false,
        // route level code-splitting
        // this generates a separate chunk (continuity.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(
                /* webpackChunkName: "transcript" */ '../views/TranscriptView.vue'
            ),
    },
    {
        path: '/location/:id',

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
        path: '/location',
        name: 'Location',
        props: false,
        // route level code-splitting
        // this generates a separate chunk (continuity.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(
                /* webpackChunkName: "location" */ '../views/LocationView.vue'
            ),
    },
    {
        path: '/position',
        name: 'Position',
        props: false,
        // route level code-splitting
        // this generates a separate chunk (continuity.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(
                /* webpackChunkName: "position" */ '../views/PositionView.vue'
            ),
    },
    {
        path: '/position/:id',

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
        path: '/clock',
        name: 'Clock',
        props: false,
        // route level code-splitting
        // this generates a separate chunk (continuity.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(
                /* webpackChunkName: "clock" */ '../views/FactionClockView.vue'
            ),
    },
    {
        path: '/clock/:id',

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
        path: '/recap',
        name: 'Recap',
        props: false,
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
