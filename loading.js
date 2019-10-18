import Vue from 'vue'
import Main from './load.vue'

const LoadConstructor = Vue.extend(Main)

function hasOwn (obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key)
};
export function isVNode (node) {
  return node !== null && typeof node === 'object' && hasOwn(node, 'componentOptions')
};

let instance
let instances = []
let count = 0
let seed = 1
// let maxzindex = 0

function getMaxZindex () {
  debugger
  let arr = []
  let documentAll = document.all
  for (let index = 0; index < documentAll.length; index++) {
    arr.push(+window.getComputedStyle(documentAll.item(index)).zIndex || 0)
  }
  return arr.length ? Math.max(...arr) : 0
}

const Load = function (isFullScreem, message) {
  count++
  if (instances.length > 0) {
    if (isFullScreem) {
      instances[0].vm.fullScreem = true
      instances[0].vm.$nextTick(function () {
        instances[0].vm.zindex = getMaxZindex() + 1
      })
    }
    if (message) {
      instances[0].vm.message = message
    }
    return instances[0].vm
  }
  let options = {}
  options.message = message
  options.fullScreem = !!isFullScreem
  options.zindex = (getMaxZindex() + 1)

  const id = 'Load_' + seed++

  options.onClose = function () {
    count = 1
    Load.close()
  }

  instance = new LoadConstructor({
    propsData: options
  })

  if (isVNode(message)) {
    instance.$slots.default = [message]
    options.message = 'REPLACED_BY_VNODE'
  }
  instance.id = id
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  instance.vm.visible = true
  instance.dom = instance.vm.$el
  // instance.vm.zindex = (getMaxZindex() + 1)

  instances.push(instance)
  return instance.vm
}
Load.open = function (isFullScreem, message) {
  Load(isFullScreem, message)
}

Load.close = function () {
  if (count > 0) {
    count--
    if (instances.length > 0 && count === 0) {
      instances[0].vm.visible = false
      instances.splice(0, 1)
    }
  }
}
export default Load
