import util from '../libs/utils/util'
import request from "../libs/utils/request";

export default {
  //获取推送活动列表
  async getActPushList(data){
    const requestData =  await request({
      url:'/Actpush/getActPushList',
      data:data,
      method:'post'
    });
    return requestData.responseContent;
  },
  //获取推送活动详情
  async getActPush(data){
    const requestData =  await request({
      url:'/Actpush/getActPush',
      data:data,
      method:'post'
    });
    return requestData.responseContent;
  },
  //推送活动新增/编辑
  async actPushEdit(data){
    const requestData =  await request({
      url:'/Actpush/actPushEdit',
      data:data,
      method:'post'
    });
    return requestData;
  },
  //推送活动删除
  async delActPush(data){
    const requestData =  await request({
      url:'/Actpush/delActPush',
      data:data,
      method:'post'
    });
    return requestData;
  },
}
