import request from '../libs/utils/request'
import axios from "axios";
import Vue from 'vue'

export default {
    // 签约申请费用计算
  async calcServiceFee(data){
    return await request({
      url:'/qmStoreClass/calcServiceFee',
      data:data,
      method:'post'
    })
  },  

   // 签约分类续费申请
   async serviceFeeSave(data){
    return await request({
      url:'/qmStoreClass/serviceFeeSave',
      data:data,
      method:'post'
    })
  },  

  // 提交支付宝支付
  async aliPay(data){
    return await request({
      url:'/Payment/aliPay',
      data:data,
      method:'post'
    })
  },  

  // 轮询支付状态
  async getServiceChargeState(data){
    return await request({
      url:'/qmStoreClass/getServiceChargeState',
      data:data,
      method:'post'
    })
  },  

  // 分类缴费记录
  async serviceFee(data){
    return await request({
      url:'/qmStoreClass/serviceFee',
      data:data,
      method:'post'
    })
  },   

    // 保证金往来记录
    async depositList(data){
      return await request({
        url:'/qmStoreClass/depositList',
        data:data,
        method:'post'
      })
    },   

    // 获取开票申请记录
    async classInvoiceList(data){
      return await request({
        url:'/qmStoreClass/classInvoiceList',
        data:data,
        method:'post'
      })
    },  

     // 获取商铺入住信息
     async getJoinInfo(data){
      return await request({
        url:'/qmStoreClass/getJoinInfo',
        data:data,
        method:'post'
      })
    },  

      // 保存开票信息
    async classInvoiceAdd(data){
      return await request({
        url:'/qmStoreClass/classInvoiceAdd',
        data:data,
        method:'post'
      })
    },  

    // 搜索分类
    async getAvailGcClass(data){
      return await request({
        url:'/qmStoreClass/getAvailGcClass',
        data:data,
        method:'post'
      })
    },  

    // 获取申请分类详情
    async getClassInfo(data){
      return await request({
        url:'/qmStoreClass/getClassInfo',
        data:data,
        method:'post'
      })
    },  

    // 获取申请分类详情--最新
    async getGoodsClassInfo(data){
      return await request({
        url:'/qmStoreClass/getGoodsClassInfo',
        data:data,
        method:'post'
      })
    },  

    // 新分类申请提交
    async classApply(data){
      return await request({
        url:'/qmStoreClass/classApply',
        data:data,
        method:'post'
      })
    },  

    // 新分类申请提交--多个
    async mulClassApply(data){
      var allUrl = [];
      data.forEach((el,e) => {
        allUrl.push(this.classApply(data[e]))
      });
      return axios.all(allUrl);
    }, 


    // 签约分类申请||普通转签约申请
    async changeToSign(data){
      return await request({
        url:'/qmStoreClass/changeToSign',
        data:data,
        method:'post'
      })
    },  

    // 重新申请签约分类
    async reChangeToSign(data){
      return await request({
        url:'/qmStoreClass/reChangeToSign',
        data:data,
        method:'post'
      })
    },  

    // 保证金退回
    async depositReturn(data){
      return await request({
        url:'/qmStoreClass/depositReturn',
        data:data,
        method:'post'
      })
    },  

    // 保证金信息
    async getDepositInfo(data){
      return await request({
        url:'/qmStoreClass/getDepositInfo',
        data:data,
        method:'post'
      })
    },  

    // 保证金提交审核
    async depositSave(data){
      return await request({
        url:'/qmStoreClass/depositSave',
        data:data,
        method:'post'
      })
    },  

}

