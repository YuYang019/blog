import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'normalize.css'
import VueRouter from 'vue-router'
import store from './store'

import App from './App.vue'
import Home from './components/home.vue'
import Work from './components/work.vue'
import Detail from './components/detail.vue'

Vue.use(ElementUI)
Vue.use(VueRouter)

const routes = [
    {
      path: '/',
      component: Home
    },
    {
        path: '/detail',
        component: Detail
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/work',
      component: Work
    }
]

const router = new VueRouter({
    routes
})

new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
})
