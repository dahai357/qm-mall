import request from '../libs/utils/request'
import axios from "axios";
import Vue from 'vue'

export default {
    // 线上订单交易明细列表数据获取
    async getSaleStatisticsList(data){
      return await request({
        url:'/StoreSaleStatistics/getSaleStatisticsList',
        data:data,
        method:'post'
      })},
//线上交易统计excel文件导出
async exportSaleStatisticsList(data){
  return await request({
    url:'/StoreSaleStatistics/exportSaleStatisticsList',
    data:data,
    method:'post'
  })}
}

