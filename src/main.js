import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Paginate from 'vuejs-paginate'
import VueMeta from 'vue-meta'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import currencyFilter from '@/filters/currency.filter'
import langFilter from '@/filters/localize.filter'
import tooltipDirective from '@/directives/tooltip.directive'
import messagePlugin from './plugins/message.plugin'
import titlePlugin from './plugins/title.plugin'
import Loader from '@/components/LoaderItem'
import './registerServiceWorker'
// import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(titlePlugin)
Vue.use(Vuelidate)
Vue.use(VueMeta)
Vue.filter('date', dateFilter)
Vue.filter('localize', langFilter)
Vue.filter('currency', currencyFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.component('LoaderItem', Loader)
Vue.component('vuejsPaginate', Paginate)

firebase.initializeApp({
  apiKey: "AIzaSyC48uzlwIav0-bc8_5e2DL1AwH-l8o6yCg",
  authDomain: "vue-crm-9a77f.firebaseapp.com",
  databaseURL: "https://vue-crm-9a77f-default-rtdb.firebaseio.com",
  projectId: "vue-crm-9a77f",
  storageBucket: "vue-crm-9a77f.appspot.com",
  messagingSenderId: "442969164951",
  appId: "1:442969164951:web:454f04273f30d25da62dd2"
})

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
