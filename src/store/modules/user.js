import api from '@/api'
import {
  resetRouter
} from '@/router'

const user = {
  state: {
    name: '',
    avatar: '',
    authorization: {},
    userInfo: {}
  },
  mutations: {
    SET_AUTHOR: (state, data) => {
      state.authorization = data
    },
    SET_USERINFO: (state, data) => {
      state.userInfo = data
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    }
  },
  actions: {
    login({
      commit
    }, userInfo) {
      return new Promise((resolve, reject) => {
        commit('SET_AUTHOR', {
          token: 'adminToken'
        })
        resolve()
        // api.login(userInfo).then(response => {
        //   response.messageId === 200 && commit('SET_AUTHOR', response)
        //   resolve(response)
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    setUserInfo: ({
      commit
    }, data) => {
      commit('SET_USERINFO', data)
    },

    // get user info
    getInfo({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        api.getInfo(state.token).then(response => {
          const {
            data
          } = response
          const {
            name,
            avatar
          } = data

          commit('SET_NAME', name)
          commit('SET_AVATAR', avatar)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // user logout
    logout({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        console.log(123)
        commit('SET_AUTHOR', {})
        resetRouter()
        resolve()
        // api.logout(state.authorization.access_token).then(() => {
        //   resetRouter()
        //   resolve()
        // }).catch(error => {
        //   reject(error)
        // })
      })
    }
  }
}

export default user
