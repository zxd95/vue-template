<template>
  <transition name="cqto-notification-fade">
    <div
      :class="['cqto-notification', customClass, horizontalClass]"
      v-show="visible"
      :style="positionStyle"
      @mouseenter="clearTimer()"
      @mouseleave="startTimer()"
      @click="click"
      role="alert">
      <i class="cqto-notification-icon eui-icon" :class="[ typeClass, iconClass ]" v-if="type || iconClass">
      </i>
      <div class="cqto-notification-group" :class="{ 'is-with-icon': typeClass || iconClass }">
        <h2 class="cqto-notification-title" v-text="title"></h2>
        <div class="cqto-notification-content" v-if="message">
          <slot>
            <!-- <p v-if="!dangerouslyUseHTMLString">{{ message }}</p> -->
            <p v-html="message"></p>
          </slot>
        </div>
        <div class="cqto-notification-closeBtn eui-icon eui-icon-close" v-if="showClose" @click.stop="close"></div>
      </div>
    </div>
  </transition>
</template>

<script>
let typeMap = {
  success: 'checkmark-circled',
  info: 'information-circled',
  warning: 'android-alert',
  error: 'close-circled'
}
export default {
  data () {
    return {
      visible: false,
      title: '',
      message: '',
      duration: 5000,
      type: '',
      showClose: true,
      customClass: '',
      iconClass: '',
      onClose: null,
      onClick: null,
      closed: false,
      verticalOffset: 30,
      timer: null,
      dangerouslyUseHTMLString: false,
      position: 'top-middle',
      moreFlag: false
    }
  },

  computed: {
    typeClass () {
      return this.type && typeMap[this.type] ? `eui-icon-${typeMap[this.type]}` : ''
    },

    horizontalClass () {
      return this.position.indexOf('right') > -1 ? 'right' : 'middle'
    },

    verticalProperty () {
      return /^top-/.test(this.position) ? 'top' : 'bottom'
    },

    positionStyle () {
      return {
        [this.verticalProperty]: `${this.verticalOffset}px`
      }
    }
  },
  watch: {
    closed (newVal) {
      if (newVal) {
        this.visible = false
        this.$el.addEventListener('transitionend', this.destroyElement)
      }
    }
  },
  methods: {
    destroyElement () {
      this.$el.removeEventListener('transitionend', this.destroyElement)
      this.$destroy(true)
      this.$el.parentNode.removeChild(this.$el)
    },

    click () {
      if (typeof this.onClick === 'function') {
        this.onClick()
      }
    },

    close () {
      this.closed = true
      if (typeof this.onClose === 'function') {
        this.onClose()
      }
    },

    clearTimer () {
      clearTimeout(this.timer)
    },

    startTimer () {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close()
          }
        }, this.duration)
      }
    },
    keydown (e) {
      if (e.keyCode === 46 || e.keyCode === 8) {
        this.clearTimer() // detele 取消倒计时
      } else if (e.keyCode === 27) { // esc关闭消息
        if (!this.closed) {
          this.close()
        }
      } else {
        this.startTimer() // 恢复倒计时
      }
    },
    showSpan (elem, name) {
      // console.log(elem)
      // console.log(typeof elem)
      let span = elem.nextSibling
      // //  elem.nextDom
      // console.log(span.style)
      // console.log(span.style.display)
      if (span.style.display === 'none') {
        span.style.display = 'block'
      } else {
        span.style.display = 'none'
      }
    }
  },
  mounted () {
    if (this.duration > 0) {
      this.timer = setTimeout(() => {
        if (!this.closed) {
          this.close()
        }
      }, this.duration)
    }
    document.addEventListener('keydown', this.keydown)

    window.Jalor = window.Jalor || {}
    window.Jalor.Common = window.Jalor.Common || {}
    window.Jalor.Common.toggle = this.showSpan
  },
  beforeDestroy () {
    document.removeEventListener('keydown', this.keydown)
  }

}
</script>

<style>
.cqto-notification {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: 330px;
  padding: 14px 26px 14px 13px;
  border-radius: 8px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border: 1px solid #ebeef5;
  position: fixed;
  background-color: #fff;
  -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  -webkit-transition: opacity 0.3s, left 0.3s, right 0.3s, top 0.4s, bottom 0.3s,
    -webkit-transform 0.3s;
  transition: opacity 0.3s, left 0.3s, right 0.3s, top 0.4s, bottom 0.3s,
    -webkit-transform 0.3s;
  transition: opacity 0.3s, transform 0.3s, left 0.3s, right 0.3s, top 0.4s,
    bottom 0.3s;
  transition: opacity 0.3s, transform 0.3s, left 0.3s, right 0.3s, top 0.4s,
    bottom 0.3s, -webkit-transform 0.3s;
  word-break: break-all;
  overflow: hidden;
}
.cqto-notification.right {
  right: 16px;
}
.cqto-notification.middle {
  left: 50%;
  margin-left: -165px;
}
.cqto-notification-group {
  margin-left: 6px;
  margin-right: 6px;
}
.cqto-notification-title {
  font-weight: 700;
  font-size: 16px;
  color: #303133;
  margin: 0;
}
.cqto-notification-content {
  font-size: 14px;
  line-height: 21px;
  margin: 6px 0 0;
  color: #606266;
  text-align: justify;
}
.cqto-notification-content p {
  margin: 0;
}
.cqto-notification-content a{
  cursor: pointer;
  color: #008BD0;
}
.cqto-notification-content a:hover{
  color: #17ACF6;
}
.cqto-notification-content a:visited{
  color: #888888;
}
.cqto-notification-icon {
  height: 30px;
  width: 30px;
  font-size: 30px;
  line-height: 30px;
  margin: auto 0;
  flex: 30px 0 0;
}
.cqto-notification-closeBtn {
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  color: #909399;
}
.cqto-notification-closeBtn:hover {
  color: #606266;
}
.cqto-notification .eui-icon-checkmark-circled {
  color: #67c23a;
}
.cqto-notification .eui-icon-close-circled {
  color: #f56c6c;
}
.cqto-notification .eui-icon-information-circled {
  color: #909399;
}
.cqto-notification .eui-icon-android-alert {
  color: #e6a23c;
}
.cqto-notification-fade-enter.right {
  right: 0;
  -webkit-transform: translateX(100%);
  transform: translateX(100%);
}
.cqto-notification-fade-enter.middle {
  top: 0;
  -webkit-transform: translateY(-300%);
  transform: translateY(-300%);
}
.cqto-notification-fade-leave-active {
  opacity: 0;
}
</style>
