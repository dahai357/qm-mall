import request from '../libs/utils/request'
import axios from "axios";
import Vue from 'vue'

export default {
    // 线上订单交易明细列表数据获取
    async getStoreTotalList(data){
      return await request({
        url:'/Storetotal/getStoreTotalList',
        data:data,
        method:'post'
      })},
//线上交易统计excel文件导出
async exportStoreTotalList(data){
  return await request({
    url:'/Storetotal/exportStoreTotalList',
    data:data,
    method:'post'
  })}
}

