import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import axios from '@/api/axios'
import moment from 'moment'
import VueAxios from 'vue-axios'

import Popper from 'popper.js'
import Threebox from '@/components/Threebox.vue'
import ZForm from '@/components/ZForm.vue'
import ZTable from '@/components/ZTable.vue'
import ZView from '@/views/ZView.vue'
import marked from 'marked'

// see: https://github.com/twbs/bootstrap/issues/23590
Popper.Defaults.modifiers.computeStyle.gpuAcceleration = !(
    window.devicePixelRatio < 1.5 && /Win/.test(navigator.platform)
)

Vue.config.productionTip = false

Vue.prototype.$axios = axios
Vue.prototype.$moment = moment
Vue.prototype.$marked = marked

Vue.use(VueAxios, axios)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.component('Threebox', Threebox)
Vue.component('ZForm', ZForm)
Vue.component('ZTable', ZTable)
Vue.component('ZView', ZView)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
