import request from '../libs/utils/request'
import axios from "axios";
import Vue from 'vue'

export default {
  // 线下订单交易明细列表数据获取
  async getTransactionFlowingList(data) {
    return await request({
      url: '/Storetransactionflowing/getList',
      data: data,
      method: 'post'
    })
  },
  // 线下订单交易明细列表数据导出
  async exportTransactionFlowingList(data) {
    return await request({
      url: '/Storetransactionflowing/getExportList',
      data: data,
      method: 'post'
    })
  },
}

