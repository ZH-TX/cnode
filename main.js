import Vue from 'vue'
import App from './App'
import { http } from '@/static/luch-request/index.js'

Vue.config.productionTip = false

Vue.prototype.$http=http
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
