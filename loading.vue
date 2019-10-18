<template>
  <div v-show="visible">
    <div class="qto-load-fullscreen" v-if="isFullScreem"></div>
    <div class="qto-load" @mouseover="showClose" @mouseout="hideClose">
      <span class="qto-load-closeBtn eui-icon eui-icon-close" v-show="isShowClose" @click.stop="close"></span>
      <!-- <span class="eui-spin-load-c eui-icon"></span> -->
      <div class="qto-loading">
        <div class="loading-effect loading-show small">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div>
        <slot>
          <p v-if="!message">加载中...</p>
          <P v-else v-html="message">
          </p>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    fullScreem: {
      type: Boolean,
      default () {
        return false
      }
    },
    zindex: {
      type: Number,
      default: 999999
    },
    message: String,
    onClose: Function
  },
  data () {
    return {
      isShowClose: false,
      visible: true
    }
  },
  computed: {
    isFullScreem () {
      return this.visible && this.fullScreem
    }
  },
  methods: {
    destroyElement () {
      this.$destroy(true)
      this.$el.parentNode.removeChild(this.$el)
    },
    showClose () {
      this.isShowClose = true
    },
    hideClose () {
      this.isShowClose = false
    },
    close () {
      this.visible = false
      if (typeof this.onClose === 'function') {
        this.onClose()
      }
    }
  },
  mounted () {
    // console.log(this.$el.getElementsByClassName('qto-load-fullscreen'))
    if (this.$el.getElementsByClassName('qto-load-fullscreen')[0]) {
      this.$el.getElementsByClassName('qto-load-fullscreen')[0].style.zIndex = this.zindex
    }
    if (this.$el.getElementsByClassName('qto-load')[0]) {
      this.$el.getElementsByClassName('qto-load')[0].style.zIndex = this.zindex + 1
    }
  },
  watch: {
    visible (newValue, oldValue) {
      if (!newValue) {
        this.destroyElement()
      }
    },
    zindex (val) {
      if (this.$el.getElementsByClassName('qto-load-fullscreen')[0]) {
        this.$el.getElementsByClassName('qto-load-fullscreen')[0].style.zIndex = val
      }
      if (this.$el.getElementsByClassName('qto-load')[0]) {
        this.$el.getElementsByClassName('qto-load')[0].style.zIndex = val + 1
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.qto-load-fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
}
.qto-load {
  top: calc((100vh - 80px)/2);
  left: calc((100vw - 120px)/2);
  width: 140px;
  height: 80px;
  color: #000;
  text-align: center;
  padding-top: 10px;
  font-size: 14px;
  border-radius: 8px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border: 1px solid #dee8f1;
  position: fixed;
  background-color: #fff;
  -webkit-box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
.qto-load-closeBtn {
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
  color: #909399;
  font-size: 14px;
}
.qto-load-closeBtn:hover {
  color: #606266;
}
@keyframes load {
  0% {
    opacity: 1;
  }

  to {
    opacity: 0.1;
  }
}
.qto-loading {
  width: 100%;
  height: 35px;
  .small {
    transform: scale(0.5);
  }
  .loading-show {
    position: relative;
    width: 50px;
    height: 50px;
    left: 41px;
    top: -7px;
  }
  .loading-effect {
    p {
      text-align: center;
      padding-top: 59px;
      padding-left: 15px;
      font-size: 14px;
      color: #000;
      line-height: 1.5em;
    }
    span {
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: linear-gradient(#000, #000);
      position: absolute;
      animation: load 1s ease infinite;
      -webkit-animation: load 1s ease infinite;
    }
    span:first-child {
      top: 40px;
      left: 20px;
      /* margin-top: -8px; */
      animation-delay: 0s;
      -webkit-animation-delay: 0s;
    }
    span:nth-child(2) {
      top: 34px;
      left: 34px;
      animation-delay: 0.125s;
      -webkit-animation-delay: 0.125s;
    }
    span:nth-child(3) {
      top: 20px;
      left: 40px;
      animation-delay: 0.25s;
      -webkit-animation-delay: 0.25s;
    }
    span:nth-child(4) {
      top: 6px;
      left: 34px;
      animation-delay: 0.375s;
      -webkit-animation-delay: 0.375s;
    }
    span:nth-child(5) {
      top: 0px;
      left: 20px;
      animation-delay: 0.5s;
      -webkit-animation-delay: 0.5s;
    }
    span:nth-child(6) {
      top: 6px;
      left: 6px;
      animation-delay: 0.625s;
      -webkit-animation-delay: 0.625s;
    }
    span:nth-child(7) {
      top: 20px;
      left: 0px;
      animation-delay: 0.75s;
      -webkit-animation-delay: 0.75s;
    }
    span:nth-child(8) {
      top: 34px;
      left: 6px;
      animation-delay: 0.875s;
      -webkit-animation-delay: 0.875s;
    }
  }
}
// .qto-loading .small {
//   transform: scale(0.5);
// }

// .qto-loading .loading-show {
//   position: relative;
//   width: 50px;
//   height: 50px;
//   left: 41px;
//   top: -7px;
// }

// .qto-loading .loading-effect span:first-child {
//   top: 40px;
//   left: 20px;
//   /* margin-top: -8px; */
//   animation-delay: 0s;
//   -webkit-animation-delay: 0s;
// }

// .qto-loading .loading-effect span:nth-child(2) {
//   top: 34px;
//   left: 34px;
//   animation-delay: 0.125s;
//   -webkit-animation-delay: 0.125s;
// }

// .qto-loading .loading-effect span:nth-child(3) {
//   top: 20px;
//   left: 40px;
//   animation-delay: 0.25s;
//   -webkit-animation-delay: 0.25s;
// }

// .qto-loading .loading-effect span:nth-child(4) {
//   top: 6px;
//   left: 34px;
//   animation-delay: 0.375s;
//   -webkit-animation-delay: 0.375s;
// }

// .qto-loading .loading-effect span:nth-child(5) {
//   top: 0px;
//   left: 20px;
//   animation-delay: 0.5s;
//   -webkit-animation-delay: 0.5s;
// }

// .qto-loading .loading-effect span:nth-child(6) {
//   top: 6px;
//   left: 6px;
//   animation-delay: 0.625s;
//   -webkit-animation-delay: 0.625s;
// }

// .qto-loading .loading-effect span:nth-child(7) {
//   top: 20px;
//   left: 0px;
//   animation-delay: 0.75s;
//   -webkit-animation-delay: 0.75s;
// }

// .qto-loading .loading-effect span:nth-child(8) {
//   top: 34px;
//   left: 6px;
//   animation-delay: 0.875s;
//   -webkit-animation-delay: 0.875s;
// }

// .qto-loading .loading-effect span {
//   display: inline-block;
//   width: 10px;
//   height: 10px;
//   border-radius: 50%;
//   background: linear-gradient(#000, #000);
//   position: absolute;
//   animation: load 1s ease infinite;
//   -webkit-animation: load 1s ease infinite;
// }

// .qto-loading .loading-effect p {
//   text-align: center;
//   padding-top: 59px;
//   padding-left: 15px;
//   font-size: 14px;
//   color: #000;
//   line-height: 1.5em;
// }
</style>
