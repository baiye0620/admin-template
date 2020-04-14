import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import VuexPersistense from 'vuex-persistedstate'

import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import tagsView from './modules/tagsView'
import errorLog from './modules/errorLog'

const vuexLocal = new VuexPersistense({
  storage: localStorage,
  reducer: val => {
    return {
      app: {
        sidebar: val.app.sidebar,
        device: val.app.device
      },
      user: {
        authorization: val.user.authorization,
        userInfo: val.user.userInfo
      }
    }
  }
})

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    tagsView,
    user,
    errorLog
  },
  getters,
  plugins: [vuexLocal]
})

export default store
