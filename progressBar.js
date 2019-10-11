import progressBar from './progressBar.vue'

export default {
  install(Vue, options = {}) {
    Vue.component(progressBar.name, progressBar)

    const Component = Vue.extend(progressBar)

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
      start() {
        if (Vue.$isServer) return
        vm.percent = 0
        vm.popShow = true
        vm.show = true
        vm.canSuccess = false
        vm.process
        timer = setInterval(() => {
          process = this.processbar()
          if (process === 100) {
            vm.canSuccess = true
            clearInterval(timer)
          }
        }, 1000)
      },
      processbar() {
        vm.percent++
        if (vm.percent >= 100) {
          vm.percent = 100
        }
        return vm.percent
      },
      hide() {
        clearInterval(timer)
        vm.popShow = false
        vm.show = false
        setTimeout(() => {
          vm.percent = 0
          timer = null
        }, vm.options.transition.opacitySpeed)
      },
      fail() {
        if (Vue.$isServer) return
        vm.canSuccess = false
        vm.percent = 100
        this.hide()
      }
    }

    Vue.prototype.$progress = progressMethods
  }
}
