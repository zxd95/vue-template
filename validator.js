/**
 * @description 页面都应该有的mixin 防止平台调页面的validate方法报错
 */
export default{
  methods: {
    validate () {
      // 默认没有form需要验证
      return Promise.all([])
    }
  }
}
