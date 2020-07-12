import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import discovery from './components/03.discovery.vue'
import playlists from './components/04.playlists'
import songs from './components/05.songs'
import mvs from './components/06.mvs'
import results from './components/07.results.vue'
Vue.use(ElementUI);
Vue.use(VueRouter)
Vue.config.productionTip = false
let router =new VueRouter({
  routes:[
    {
      path:"/",
      component:mvs
    },{
      path:"/discovery",
      component:discovery
    },{
      path:"/playlists",
      component:playlists
    },{
      path:"/songs",
      component:songs
    },{
      path:"/mvs",
      component:mvs
    },{
      path:"/results",
      component:results
    },
  ]
})
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
