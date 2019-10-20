// popProgressBar.vue
<template>
  <div>
    <transition name="modal-fadein">
      <div
        class="modal"
        v-show="popShow"
      >
        <div class="modal-warpper">
          <div class="modal-content">
            <div class="modal-header">
              <span class="modal-title">{{ title }}</span>
            </div>
            <div class="modal-body">
              <span class="modal-text">正在计算中……</span>
              <div class="modal-processbar">
                <div class="processbar-bg"></div>
                <div
                  :style="processBarStyle"
                  class="processbar"
                >
                  <span class="progressbar-text">{{ percent }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'popProgressBar',
  data () {
    return {
      popShow: false,
      title: '',
      percent: 0,
      thickness: 20,
      zIndex: 0
    }
  },
  computed: {
    processBarStyle () {
      return {
        opacity: this.popShow ? 1 : 0,
        width: this.percent + '%',
        height: this.thickness + 'px'
      }
    }
  },
  watch: {
    percent (newVal, oldVal) {
      return newVal
    },
    zIndex (val) {
      if (this.$el.getElementsByClassName('modal')[0]) {
        this.$el.getElementsByClassName('modal')[0].style.zIndex = val + 1
      }
    }
  },
  methods: {
    percents (obj) {
      let percents = ''
      this.percent++
      if (obj.suspend) {
        if (this.percent >= 95) {
          return percents = 95
        }
      } else {
        if (this.percent >= 100) {
          return percents = 100
        }
      }
      return percents
    },
    start (obj) {
      this.popShow = true
      this.title = obj.title
      this.zIndex = obj.zIndex
      let timer = setInterval(() => {
        let data = this.percents(obj)
        if (obj.suspend) {
          if (data === 95) {
            clearInterval(timer)
          }
        } else {
          if (data = 1000) {
            clearInterval(timer)
          }
        }
      }, obj.duration * 100)
    },
    close () {
      this.popShow = false
    }
  }
}
</script>

<style scoped>
.modal {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 9999;
  background-color: rgba(55, 55, 55, 0.6);
}
.modal-fade-enter-active {
  animation: confirm-fadein 0.3s;
}
.modal-close {
  font-size: 12px;
  position: absolute;
  right: 24px;
  top: 16px;
  overflow: hidden;
  cursor: pointer;
}
.modal-header {
  border-bottom: 1px solid #e8eaec;
  padding: 14px 16px;
  line-height: 1;
}
.modal-title {
  display: inline-block;
  width: 100%;
  height: 20px;
  line-height: 20px;
  font-size: 16px;
  color: #17233d;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.modal-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
}
.modal-content {
  margin: 0 auto;
  position: relative;
  outline: 0;
  top: 100px;
  animation: confirm-zoom 0.3s;
  width: 520px;
  border-radius: 6px;
  background: #fff;
}
.modal-body {
  padding: 70px 16px 120px 16px;
}
.modal-text {
  display: block;
  line-height: 22px;
  text-align: center;
  font-size: 14px;
  color: #515a6e;
}
.modal-processbar {
  position: relative;
  padding: 14px 0;
}
.processbar-bg {
  position: absolute;
  display: inline-block;
  width: 100%;
  height: 20px;
  border-radius: 100px;
  background-color: #f3f3f3;
}
.processbar {
  position: absolute;
  border-radius: 100px;
  background-color: #2d8cf0;
}
.progressbar-text {
  position: absolute;
  left: 10px;
  color: #17233d;
}
@keyframes modal-fadein {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes modal-zoom {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
