import util from '../libs/utils/util'
import request from "../libs/utils/request";

export default {
  //上架
  async importSave(data){
    const requestData =  await request({
      url:'/importGoods/save',
      data:data,
      method:'post'
    });
    return requestData;
  },
  //获取三级分类
  async getThirdClassList(data){
    const requestData =  await request({
      url:'/importGoods/getThirdClassList',
      data:data,
      method:'post'
    });
    if (requestData.resultCode === 1) {
      return requestData.responseContent
    }
  },

  async getTask(data){
    const requestData =  await request({
      url:'/importGoods/getTask',
      data:data,
      method:'post'
    });
    if (requestData.resultCode === 1) {
      return requestData
    }
  },

  async setTaskShowed(data){
    const requestData =  await request({
      url:'/importGoods/setTaskShowed',
      data:data,
      method:'post'
    });
    if (requestData.resultCode === 1) {
      return requestData.responseContent
    }
  },
}
