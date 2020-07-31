import request from '../libs/utils/request'
import axios from "axios";
import Vue from 'vue'

export default {
  // 线上订单交易明细列表数据获取
  async getStoreTransactionList(data) {
    return await request({
      url: '/Storetransaction/getStoreTransactionList',
      data: data,
      method: 'post'
    })
  },
  // 线上订单交易明细列表数据导出
  async exportStoreTransactionList(data) {
    return await request({
      url: '/Storetransaction/exportStoreTransactionList',
      data: data,
      method: 'post'
    })
  },
  // 获取订单详情
  async getOrderDetailInfo(data) {
    return await request({
      url: '/Storetransaction/getOrderDetailInfo',
      data: data,
      method: 'post'
    })
  },

}

