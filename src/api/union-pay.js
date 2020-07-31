

import request from '../libs/utils/request'


export default {
  // 获取银行列表
  async branchBankList(data) {
    return await request({
      url: '/unionPay/branchBankList',
      data: data,
      method: 'post'
    })
  },
}