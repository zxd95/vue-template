function listGroup() {
  var divList = document.getElementsByClassName('list-group-item')
  var listData = []
  for (var i = 0; i < divList.length; i++) {
    var listObj = {
      skuId: '',
      proName: '',
      skuCode: ''
    }
    listObj.skuId = divList[i].childNodes[9].childNodes[1].dataset['sku']
    listObj.proName = divList[i].childNodes[3].innerText
    listObj.skuCode = divList[i].childNodes[9].childNodes[1].dataset['skucode']
    listData.push(listObj)
  }
  return listData
}
console.log(listGroup())
ec.product.addCart(goodList[i].skuId, goodList[i].proName, 6, 999, 1, goodList[i].skuCode)
