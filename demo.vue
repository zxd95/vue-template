<template>
  <div>
    <div class="chat-main">
      <div class="chat-head">
        <div class="head-content">
          <div class="user-name">
            <span>可可爱爱广东银</span>
          </div>
        </div>
      </div>
      <div class="chat-body">
        <div class="body-left">
          <div class="body-left-content">
            <div class="content-inner"></div>
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
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: 'fdsafdas'
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
  background-color: #ffff91;
  box-sizing: content-box;
}
</style>
