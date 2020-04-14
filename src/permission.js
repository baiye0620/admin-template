import router from './router'
import store from './store'
// import utils from './utils/utils'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (store.getters.authorization && store.getters.authorization.token === 'adminToken') {
    if (to.path === '/login') {
      // 免登录
      window.location.href = window.location.origin + '/#/'
      next()
      NProgress.done()
    } else {
      next()
      NProgress.done()
      // 校验当前页面访问权限
      // store.dispatch('setAuthorMenu').then(res => {
      //   if (res.data.code === 200) {
      //     const menuList = res.data.data
      //     const list = {
      //       menuArr: [],
      //       btnsArr: []
      //     }
      //     const currentAuth = utils.checkMenu(menuList, to.meta.key, list)
      //     if (currentAuth.menuArr.length > 0) {
      //       store.dispatch('setAuthorBtns', currentAuth.btnsArr)
      //       next()
      //     } else {
      //       // 没有当前页面权限，重定向到登录页面
      //       if (whiteList.indexOf(to.path) !== -1) {
      //         next()
      //       } else {
      //         store.commit('SET_AUTHOR', {})
      //         next(`/login?redirect=/`)
      //         NProgress.done()
      //       }
      //     }
      //   }
      // })
      // 保存当前页面的按钮集合
      // store.dispatch('setAuthorBtns', ['_add', '_edit'])
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
      // next()
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
