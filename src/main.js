import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import _ from 'lodash'

import '@/styles/index.scss' // global css
import App from './App'
import store from './store'
import router from './router'
import api from '@/api/index'
import ENUM from '@/utils/enumService'
import '@/utils/filters'

import i18n from './lang'
import '@/icons' // icon
import '@/permission' // permission control

Vue.prototype.$api = api
Vue.prototype.global = global
Vue.prototype.ENUM = ENUM
Vue.prototype._ = _

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
});
((requireContext) => {
  const arr = requireContext.keys().map(requireContext);
  (arr || []).forEach((directive) => {
    directive = directive.__esModule && directive.default ? directive.default : directive
    Vue.use(directive)
  })
})(require.context('./directives', false, /^\.\/.*\.js$/))

// 全局注册模板下载方法
Vue.prototype.downloadFile = function (data, name) {
  if (!data) {
    return
  }
  const url = window.URL.createObjectURL(new Blob([data]))
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  link.setAttribute('download', (name || '模板') + '.xls')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
