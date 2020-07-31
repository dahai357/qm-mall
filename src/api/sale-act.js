import request from '../libs/utils/request'

export default {
  // 活动列表
  async getList(data){
    const requestData =  await request({
      url:'/saleAct/getList',
      data:data,
      method:'post'
    })
    if (requestData.resultCode === 1) {
      return requestData.responseContent
    }
  },
  // 删除活动
  async activeDel(data){
    const requestData =  await request({
      url:'/saleAct/activeDel',
      data:data,
      method:'post',
      showMessage:true
    })
    return requestData
  },
  // 关闭活动
  async close(data){
    const requestData =  await request({
      url:'/saleAct/close',
      data:data,
      method:'post',
      showMessage:true
    })
    return requestData
  },
  // 活动商品
  async activityGoods(data){
    const requestData =  await request({
      url:'/saleAct/activityGoods',
      data:data,
      method:'post'
    })
    if (requestData.resultCode === 1) {
      return requestData.responseContent
    }
  },
  // 活动详情
  async activityDetail(data){
    const requestData =  await request({
      url:'/saleAct/activityDetail',
      data:data,
      method:'post'
    })
    if (requestData.resultCode === 1) {
      return requestData.responseContent
    }
  },
  // 批量添加活动商品
  async batchAddSaleGoods(data){
    const requestData =  await request({
      url:'/saleAct/batchAddSaleGoods',
      data:data,
      method:'post',
      showMessage:true
    })
    return requestData
  },
  // 店铺销售员列表
  async getStoreSaleList(data){
    const requestData =  await request({
      url:'/saleAct/getStoreSaleList',
      data:data,
      method:'post'
    })
    if (requestData.resultCode === 1) {
      return requestData.responseContent
    }
  },
  // 修改销售员姓名
  async changeSaleName(data){
    const requestData =  await request({
      url:'/saleAct/changeSaleName',
      data:data,
      method:'post',
      showMessage:true
    })
    return requestData
  },
  // 添加销售员
  async addSale(data){
    const requestData =  await request({
      url:'/saleAct/addSale',
      data:data,
      method:'post',
      showMessage:false
    })
    return requestData
  },
  // 编辑、新增活动
  async activityEdit(data){
    const requestData =  await request({
      url:'/saleAct/activityEdit',
      data:data,
      method:'post',
      showMessage:false
    })
    return requestData
  },
  // 编辑销售员
  async activitySalesEdit(data){
    const requestData =  await request({
      url:'/saleAct/activitySalesEdit',
      data:data,
      method:'post',
      showMessage:false
    })
    return requestData
  },
  // 销售员列表
  async getSalesManList(data){
    const requestData =  await request({
      url:'/saleAct/getSalesManList',
      data:data,
      method:'post'
    })
    if (requestData.resultCode === 1) {
      return requestData.responseContent
    }
  },
  // 销售详情
  async getSaleGoodsList(data){
    const requestData =  await request({
      url:'/saleAct/getSaleGoodsList',
      data:data,
      method:'post'
    })
    if (requestData.resultCode === 1) {
      return requestData.responseContent
    }
  },
  // 打款记录
  async getRemitRecord(data){
    const requestData =  await request({
      url:'/saleAct/getRemitRecord',
      data:data,
      method:'post'
    })
    if (requestData.resultCode === 1) {
      return requestData.responseContent
    }
  },
  // 打款记录
  async getPromoterList(data){
    const requestData =  await request({
      url:'/saleAct/getPromoterList',
      data:data,
      method:'post'
    })
    if (requestData.resultCode === 1) {
      return requestData.responseContent
    }
  },
  // 标记打款
  async markRemit(data){
    const requestData =  await request({
      url:'/saleAct/markRemit',
      data:data,
      method:'post',
      showMessage:true
    })
    return requestData
  },
  // 标记结算
  async changeIsClosing(data){
    const requestData =  await request({
      url:'/saleAct/changeIsClosing',
      data:data,
      method:'post',
      showMessage:true
    })
    return requestData
  },
  // 导出业绩详情
  async exportPerformance(data){
    const requestData =  await request({
      url:'/saleAct/exportPerformance',
      data:data,
      method:'post',
    })
    return requestData.responseContent
  },
  // 导出销售订单明细
  async exportSaleOrder(data){
    const requestData =  await request({
      url:'/saleAct/exportSaleOrder',
      data:data,
      method:'post',
    })
    return requestData.responseContent
  },
  // 导出
  async exportSaleData(data){
    const requestData =  await request({
      url:'/saleAct/exportSaleData',
      data:data,
      method:'post',
    })
    return requestData.responseContent
  },
    // 获取在用二级分类
    async getOnlineSecondClass(data){
        return await request({
        url:'/saleact/getOnlineSecondClass',
        data:data,
        method:'post'
        })
    },

    // 获取在用三级分类
    async getOnlineThirdClass(data){
        return await request({
        url:'/saleact/getOnlineThirdClass',
        data:data,
        method:'post'
        })
    },
  // 销售员列表(所有活动的销售员，不去重)
  async getSaleList(data){
    const requestData =  await request({
      url:'/saleAct/getSaleList',
      data:data,
      method:'post'
    })
    if (requestData.resultCode === 1) {
      return requestData.responseContent
    }
  },
  // 批量生成分销二维码
  async generateQrCode(data){
    const requestData =  await request({
      url:'/saleAct/generateQrCode',
      data:data,
      method:'post',
    })
    return requestData
  },
}
