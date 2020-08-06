<template>
  <div>
    <div class="chat-main">
      <div class="chat-head">
        <div class="head-content">
          <div class="user-name">
            <span>漂漂亮亮广东银</span>
          </div>
        </div>
      </div>
      <div class="chat-body">
        <div class="body-left">
          <div class="body-left-content">
            <div class="content-inner">
              <div class="guest-inner">Hi，你好。</div>
              <div class="owner-inner">Hello，我叫可可爱爱酱油君。</div>
            </div>
            <div class="content-input">
              <div class="input">
                <input type="text" v-model="content">
              </div>
              <div class="button">
                <button>发送</button>
              </div>
            </div>
          </div>
        </div>
        <div class="body-right">
          <div>族谱</div>
          <div>笔记本</div>
          <div>note</div>
          <div>自动AI语句</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: '今天天气真好啊，约吗？'
    }
  }
}
</script>

<style lang="scss" scoped>
.chat-main {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.chat-head {
  height: 50px;
  line-height: 50px;
  background-color: #3eb8ff;
}
.user-name {
  font-size: 18px;
  color: #fff;
}
.chat-body {
  height: 640px;
  display: flex;
}
.body-left {
  flex: 65%;
  box-sizing: content-box;
  border-right: 1px solid #eee;
}
.body-left-content {
  height: 640px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.content-inner {
  flex: 1;
  padding: 14px;
}
.content-inner .guest-inner {
  padding: 8px 10px;
  margin-bottom: 10px;
  border-radius: 6px;
  background-color: #93f9c0;
}
.content-inner .owner-inner {
  display: flex;
  flex-direction: row-reverse;
  padding: 8px 10px;
  margin-bottom: 10px;
  border-radius: 6px;
  background-color: #f5f5f5;
}
.content-input {
  height: 40px;
  display: flex;
  border-top: 1px solid #eee;
  background-color: aquamarine;
}
.content-input .input {
  flex: 1;
}
.content-input .input input {
  width: 100%;
  height: 100%;
  outline: none;
  border: 0px;
}
.content-input .button {
  width: 80px;
}
.content-input .button button {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  outline: none;
  border: 1px solid transparent;
  background-color: #000;
  color: #fff;
}
.body-right {
  flex: 35%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-content: stretch;
}
.body-right div {
  flex: 50%;
  height: auto;
  box-sizing: content-box;
}
.body-right div:nth-child(1) {
  background-color: #ffff91;
}
.body-right div:nth-child(2) {
  background-color: #91ffa9;
}
.body-right div:nth-child(3) {
  background-color: #91b4ff;
}
.body-right div:nth-child(4) {
  background-color: #ff919a;
}
</style>
