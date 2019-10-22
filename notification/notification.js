import Vue from 'vue'
import Main from './notification.vue'

const NotificationConstructor = Vue.extend(Main)

function hasOwn (obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key)
};
export function isVNode (node) {
  return node !== null && typeof node === 'object' && hasOwn(node, 'componentOptions')
};

let instance
let instances = []
let seed = 1
// let maxzindex = 0

function getMaxZindex () {
  let arr = []
  let documentAll = document.all
  for (let index = 0; index < documentAll.length; index++) {
    arr.push(+window.getComputedStyle(documentAll.item(index)).zIndex || 0)
  }
  return arr.length ? Math.max(...arr) : 0
}

const Notification = function (options) {
  if (Vue.prototype.$isServer) return
  options = options || {}
  const userOnClose = options.onClose
  const id = 'notification_' + seed++
  const position = options.position || 'top-middle'

  options.onClose = function () {
    Notification.close(id, userOnClose)
  }

  instance = new NotificationConstructor({
    data: options
  })

  if (isVNode(options.message)) {
    instance.$slots.default = [options.message]
    options.message = 'REPLACED_BY_VNODE'
  }
  instance.id = id
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  instance.vm.visible = true
  instance.dom = instance.vm.$el
  instance.dom.style.zIndex = (getMaxZindex() + 1)

  let verticalOffset = options.offset || 0
  instances.filter(item => item.position === position).forEach(item => {
    verticalOffset += item.$el.offsetHeight + 48
  })
  verticalOffset += 48
  instance.verticalOffset = verticalOffset
  instances.push(instance)
  return instance.vm
}
let types = ['success', 'warning', 'info', 'error']
types.forEach(type => {
  Notification[type] = options => {
    if (typeof options === 'string' || isVNode(options)) {
      options = {
        message: options
      }
    }
    options.type = type
    return Notification(options)
  }
})

Notification.close = function (id, userOnClose) {
  let index = -1
  const len = instances.length
  const instance = instances.filter((instance, i) => {
    if (instance.id === id) {
      index = i
      return true
    }
    return false
  })[0]
  if (!instance) return

  if (typeof userOnClose === 'function') {
    userOnClose(instance)
  }
  instances.splice(index, 1)

  if (len <= 1) return
  const position = instance.position
  const removedHeight = instance.dom.offsetHeight
  for (let i = index; i < len - 1; i++) {
    if (instances[i].position === position) {
      instances[i].dom.style[instance.verticalProperty] = parseInt(instances[i].dom.style[instance.verticalProperty], 10) - removedHeight - 48 + 'px'
    }
  }
}
Notification.closeAll = function () {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].close()
  }
}

export default Notification
