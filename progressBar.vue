import qtoCommonPopProgress from './qtoCommonPopProgress.vue'

export default {
  install(Vue, options = {}) {
    Vue.component(qtoCommonPopProgress.name, qtoCommonPopProgress)

    const Component = Vue.extend(qtoCommonPopProgress)

    const { autoFinish, ...res } = options

    const vm = new Component({
      data: {
        autoFinish: typeof autoFinish === 'boolean' ? autoFinish : true
      }
    })
    options = Object.assign(vm.$props.options, { ...res })

    vm.$propsData = options
    vm.$mount()

    if (!vm.$isServer) {
      document.body.appendChild(vm.$el)
    }

    let timer = null

    const progressMethods = {
      processbar() {
        vm.percent++
        if (vm.percent >= 95) {
          vm.percent = 95
        }
        return vm.percent
      },
      start() {
        if (Vue.$isServer) return
        vm.percent = 0
        vm.popShow = true
        vm.show = true
        vm.canSuccess = false
        timer = setInterval(() => {
          if (this.processbar() === 95) {
            clearInterval(timer)
          }
        }, 1000)
      },
      close() {
        clearInterval(timer)
        vm.popShow = false
        vm.show = false
        setTimeout(() => {
          vm.percent = 0
          timer = null
          document.body.removeChild(vm.$el)
        }, vm.options.transition.opacitySpeed)
      },
      fail() {
        if (Vue.$isServer) return
        vm.canSuccess = false
        vm.percent = 100
        this.close()
      }
    }

    Vue.prototype.$PopProgress = progressMethods
  }
}
