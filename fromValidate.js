/**
 * @function validateAllForm
 * @description 页面验证时调用该方法
 * @param {arguments} 传入每个form的引用 validateAllForm(this.$refs['newContactObj'], this.$refs['carObj'], this.$refs['personObj'])
 */
export function validateAllForm () {
  // 伪数组转换成数组
  let formlist = Array.prototype.slice.call(arguments)
  // console.log('validateAllForm', formlist)
  // 筛选
  formlist = formlist.filter(item => item && item.validate)
  // console.log('validateAllForm', formlist)
  const promiseList = formlist.map(item => {
    return new Promise((resolve, reject) => {
      item.validate((valid, rule) => {
        // console.log(valid)
        // console.log(rule)
        resolve(rule)
      })
    })
  })
  // console.log('validateAllForm', promiseList)
  return Promise.all(promiseList)
}
