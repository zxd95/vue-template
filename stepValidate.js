/**
 * @description 平台组mixin的方法 验证页面中的ref
 */
export default{
  methods: {
    stepValidate (filterFun) {
      let refs = this.$refs
      // console.log('stepValidate', refs)
      let arr = Object.keys(refs).map(item => {
        if (refs[item] instanceof Array) {
          return refs[item]
        } else {
          return (refs[item] && refs[item].validate) ? refs[item] : false
        }
      })
      // console.log(arr)
      let formlist = []
      arr.forEach((item, index) => {
        if (item instanceof Array) {
          formlist = formlist.concat(item)
        } else {
          formlist.push(item)
        }
      })
      formlist = formlist.filter(item => {
        if (filterFun) {
          return item && item.validate && filterFun(item)
        } else {
          return item && item.validate
        }
      })
      // console.log('formlist', formlist)
      const promiseList = formlist.map(item => {
        return item.validate().then(res => {
          // console.log('stepValidate', res)
          res = res.filter(_ => _)
          // console.log('stepValidate', res)
          return res.reduce((total, curent) => {
            let length = Object.keys(curent).length
            return total + length
          }, 0)
        })
      })
      // console.log('promiseList', promiseList)
      return Promise.all(promiseList).then(res => {
        // console.log(res)
        return res.reduce((total, curent) => {
          return total + curent
        }, 0)
      })
    }
  }
}
