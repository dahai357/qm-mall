import util from '../libs/utils/util'
import request from "../libs/utils/request";

export default {
// 买家评价记录
  async evaluateList(data){
    const requestData =  await request({
      url:'/storeEvaluate/getList',
      data:data,
      method:'post'
    })
    if (requestData.resultCode === 1) {
      return requestData.responseContent
    }
  },
  // 保存商家回复
  async explainSave(data){
    const requestData =  await request({
      url:'/storeEvaluate/explainSave',
      data:data,
      method:'post',
      showMessage:true
    })
    return requestData
  },
// 回复模板列表
  async templatesList(data){
    const requestData =  await request({
      url:'/storeEvaluate/templates',
      data:data,
      method:'post'
    })
    if (requestData.resultCode === 1) {
      return requestData.responseContent
    }
  },
  // 添加/编辑模板
  async updateTemplate(data){
    const requestData =  await request({
      url:'/storeEvaluate/updateTemplate',
      data:data,
      method:'post',
      showMessage:true
    })
    return requestData
  },
  // 删除模板
  async dropTemplate(data){
    const requestData =  await request({
      url:'/storeEvaluate/dropTemplate',
      data:data,
      method:'post',
      showMessage:true
    })
    return requestData
  },
}
