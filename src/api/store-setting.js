import request from '../libs/utils/request'
import axios from "axios";
import Vue from 'vue'

export default {
  async getBaseSet(data){
    return await request({
      url:'/storeSetting/getBaseSet',
      data:data,
      method:'post'
    })
  },

  async uploadFile(data){
    return await request({
      url:'/upload/uploadBase64Img',
      data:data,
      method:'post'
    })
  },

  //获取自主配送数据
  async getDistributionSet(data){
    return await request({
      url:'/storeSetting/getDistributionSet',
      data:data,
      method:'post'
    })
  },

  async getSysSetting(data){
    return await request({
      url:'/storeSetting/getSysSetting',
      data:data,
      method:'post'
    })
  },

  async baseSet(data){
    return await request({
      url:'/storeSetting/baseSet',
      data:data,
      method:'post'
    })
  },
  // 店铺开关
  async switchSet(data){
    return await request({
      url:'/storeSetting/switchSet',
      data:data,
      method:'post'
    })
  },

  // 保存搜索配置
  async searchConfigSet(data){
    return await request({
      url:'/storeSetting/searchConfigSet',
      data:data,
      method:'post'
    })
  },

  // 保存支付配置
  async paySet(data){
    return await request({
      url:'/storeSetting/paySet',
      data:data,
      method:'post'
    })
  },

  // 保存配送配置
  async distributionSet(data){
    return await request({
      url:'/storeSetting/distributionSet',
      data:data,
      method:'post'
    })
  },

  // 获取自主配送数据
  async getDistributionSet(data){
    return await request({
      url:'/storeSetting/getDistributionSet',
      data:data,
      method:'post'
    })
  },


  // 获取配送费模板
  async getTemplateList(data){
        return await request({
            url:'/storeSetting/getTemplateList',
            data:data,
            method:'post'
        })
    },

  // 批量上传
  async multipleUploadFile(data){
    Vue.prototype.requestAll = true;
      var allUrl = [];
      data.forEach((el,e) => {
        allUrl.push(this.uploadFile(data[e]))
      });
      return axios.all(allUrl);
  },

  // 旧手机方式验证码
  async sendOldPhone(data){
    return await request({
      url:'/storeSetting/sendOldPhone',
      data:data,
      method:'post'
    })
  },

  // 新手机方式验证码
  async sendNewPhone(data){
    return await request({
      url:'/storeSetting/sendNewPhone',
      data:data,
      method:'post'
    })
  },

  // 修改手机绑定
  async modifyPhone(data){
    return await request({
      url:'/storeSetting/modifyPhone',
      data:data,
      method:'post'
    })
  },

  // 保存打印配置
  async printSet(data){
    return await request({
      url:'/storeSetting/printSet',
      data:data,
      method:'post'
    })
  },

  //检查配送公式合法性
  async checkFormula(data){
      return await request({
          url:'/storeSetting/checkFormula',
          data:data,
          method:'post'
      })
  }


}

