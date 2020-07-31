import request from '../libs/utils/request'
import axios from "axios";
import Vue from 'vue'

export default {
  // 配送员配送统计页面数据获取接口
  async getDiliverymanList(data) {
    return await request({
      url: '/Diliveryman/getDiliverymanList',
      data: data,
      method: 'post'
    })
  },
  //获取配送员评价标签库
  async getDiliveryLabel(data) {
    return await request({
      url: '/Diliveryman/getDiliveryLabel',
      data: data,
      method: 'post'
    })
  },
  //配送员续期/解除接口
  async delDiliveryman(data) {
    return await request({
      url: '/Diliveryman/delDiliveryman',
      data: data,
      method: 'post'
    })
  },
  //配送员配送信息列表
  async getDiliveryLog(data) {
    return await request({
      url: '/Diliveryman/getDiliveryLog',
      data: data,
      method: 'post'
    })
  },
  //新增或者编辑配送员评价标签
  async addDiliveryLabel(data) {
    return await request({
      url: '/Diliveryman/addDiliveryLabel',
      data: data,
      method: 'post'
    })
  },
  //删除配送员评价标签库标签
  async delDiliveryLabel(data) {
    return await request({
      url: '/Diliveryman/delDiliveryLabel',
      data: data,
      method: 'post'
    })
  },
  //新增配送员
  async addDiliveryman(data) {
    return await request({
      url: '/Diliveryman/addDiliveryman',
      data: data,
      method: 'post'
    })
  },
  //编辑标签获取标签详情
  async getLabelInfo(data) {
    return await request({
      url: '/Diliveryman/getLabelInfo',
      data: data,
      method: 'post'
    })
  },
  //修改配送员
  async editDiliveryman(data) {
    return await request({
      url: '/Diliveryman/editDiliveryman',
      data: data,
      method: 'post'
    })
  },
  //修改配送员费用
  async updateDiliverymanFee(data) {
    return await request({
      url: '/Diliveryman/updateDiliverymanFee',
      data: data,
      method: 'post'
    })
  },
}

