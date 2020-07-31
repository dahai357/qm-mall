import request from '../libs/utils/request'
import axios from "axios";
import Vue from 'vue'

export default {
    // 达达配送管理
    async dadaList(data){
      return await request({
        url:'/Storedelivery/dada',
        data:data,
        method:'post'
      })},
  // 获取达达账单流水记录
    async getDadaAccounts(data){
      return await request({
        url:'/Storedelivery/getDadaAccounts',
        data:data,
        method:'post'
      })},
  //达达配送申请
    async saveDada(data){
      return await request({
        url:'/Storedelivery/saveDada',
        data:data,
        method:'post'
      })},
  //v1.3.0获取充值链接
    async getDadaRecharge(data){
      return await request({
        url:'/Storedelivery/getDadaRecharge',
        data:data,
        method:'post'
      })},
}

