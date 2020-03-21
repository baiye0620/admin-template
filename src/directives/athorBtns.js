import store from '@/store'

export default Vue => {
  Vue.directive('has', {
    bind: function (el, code) {
      const btnMeau = store.getters.authorBtns
      var shouldHide = 0
      btnMeau.forEach(item => {
        if (item === code.value) {
          shouldHide = 1
        }
      })
      if (shouldHide === 0) {
        el.parentNode.removeChild(el)
      }
    }
  })
}
