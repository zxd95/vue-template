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
              <span class="modal-text">{{ percent }}%</span>
              <div class="modal-processbar">
                <div :style="style"></div>
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
  name: 'progressBar',
  props: {
    options: {
      type: Object,
      default () {
        return {
          normalColor: '#2d8cf0', // 正常颜色
          succColor: '#19be6b', // 成功颜色
          failColor: '#ed4014', // 失败颜色
          position: 'top', // 进度条位置
          transition: {
            widthSpeed: 100,
            opacitySpeed: 400,
            duration: 5000  // 定义消失时间 ms
          },
          thickness: 10,  // 进度条的高度
        }
      }
    }
  },
  data () {
    return {
      percent: 0, // 进度条长度
      show: false, // 显示和隐藏
      canSuccess: true, // 是否是成功的状态
      popShow: false
    }
  },
  computed: {
    style () {
      const { normalColor, succColor, failColor, transition, thickness } = this.options
      const { widthSpeed, opacitySpeed } = transition
      const { canSuccess, percent, show } = this

      const style = {
        backgroundColor: canSuccess ? succColor : normalColor,
        opacity: show ? 1 : 0,
      }
      style.width = percent + '%'  // 设置进度条长度
      style.height = thickness + 'px'  // 设置显示高度
      style.zIndex = 9999
      style.borderRadius = '100px'
      style.transition = `width ${widthSpeed}ms, opacity ${opacitySpeed}ms` // 设置过度样式

      return style
    },
    title () {
      return '正在获取商务结论，倒计时60s...'
    },
  },
  watch: {
    popShow (newVal, oldVal) {
      if (newVal) {
        return true
      }
    },
    percent (newVal, oldVal) {
      return newVal
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
  z-index: 998;
  background-color: rgba(55, 55, 55, 0.6);
}
.modal-fade-enter-active {
  animation: confirm-fadein 0.3s;
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
  z-index: 999;
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
  padding: 100px 16px;
}
.modal-text {
  display: block;
  line-height: 22px;
  text-align: center;
  font-size: 14px;
  color: #515a6e;
}
.modal-processbar {
  padding: 14px 0;
}
.processbar-bg {
  display: inline-block;
  width: 100%;
  background-color: #f3f3f3;
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
