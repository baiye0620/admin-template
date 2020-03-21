import Vue from 'vue'

import 'normalize.css/normalize.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import _ from 'lodash'

import '@/styles/index.scss' // global css
console.log(process.env)
import App from './App'
import store from './store'
import router from './router'
import api from '@/api/index'

import '@/icons' // icon
import '@/permission' // permission control

Vue.prototype.$api = api
Vue.prototype._ = _

Vue.use(ElementUI);

((requireContext) => {
  const arr = requireContext.keys().map(requireContext);
  (arr || []).forEach((directive) => {
    directive = directive.__esModule && directive.default ? directive.default : directive
    Vue.use(directive)
  })
})(require.context('./directives', false, /^\.\/.*\.js$/))

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
