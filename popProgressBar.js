// popProgressBar.js
import popProgressBar from './popProgressBar.vue'
import Vue from 'vue'

function getMaxZindex() {
  let arr = []
  let documentAll = document.all
  for (let index = 0; index < documentAll.length; index++) {
    arr.push(+window.getComputedStyle(documentAll.item(index)).zIndex || 0)
  }
  return arr.length ? Math.max(...arr) : 0
}

popProgressBar.newInstance = properties => {
  const props = properties || {}

  const Instance = new Vue({
    data: props,
    render(h) {
      return h(popProgressBar, {
        props: props
      })
    }
  })

  const component = Instance.$mount()
  document.body.appendChild(component.$el)

  const alert = Instance.$children[0]

  return {
    start(obj) {
      let zIndex = (alert.zIndex = getMaxZindex() + 1)
      let newObj = Object.assign(obj, {
        zIndex: zIndex
      })
      alert.start(newObj)
    },
    close() {
      document.body.removeChild(component.$el)
      alert.close()
    }
  }
}

export default popProgressBar
