import request from '../libs/utils/request'
export default {
  //获取日志数据
  async getAccountLog(data) {
    return await request({
      url: '/Storeaccount/getAccountLog',
      method: 'post',
      data: data
    })
  },
  //获取账号列表
  async getAccountList(data) {
    return await request({
      url: '/Storeaccount/accountList',
      method: 'post',
      data: data
    })
  },
  //获取账号组列表
  async getAccountGroupList(data) {
    return await request({
      url: '/Storeaccount/getSellerGroup',
      method: 'post',
      data: data
    })
  },
  //添加账号-保存数据
  async saveAccount(data) {
    return await request({
      url: '/Storeaccount/saveAccount',
      method: 'post',
      data: data
    })
  },

  //发送短信验证码
  async sendMsg(data) {
    return await request({
      url: '/Storeaccount/sendmsg',
      method: 'post',
      data: data
    })
  },
  //删除店铺账号
  async delAccount(data) {
    return await request({
      url: '/Storeaccount/delAccount',
      method: 'post',
      data: data
    })
  },
  //获取店铺账号信息（编辑页展示）
  async getSellerInfo(data) {
    return await request({
      url: '/Storeaccount/getSellerInfo',
      method: 'post',
      data: data
    })
  },
  //编辑账号数据提交
  async editSellerAccount(data) {
    return await request({
      url: '/Storeaccount/editSellerAccount',
      method: 'post',
      data: data
    })
  },
  //账号组
  //账号组列表
  async groupList(data) {
    return await request({
      url: '/Storeaccountgroup/groupList',
      method: 'post',
      data: data
    })
  },
  //新增/编辑账号组页面数据渲染
  async getSellerGroupInfo(data) {
    return await request({
      url: '/Storeaccountgroup/getSellerGroupInfo',
      method: 'post',
      data: data
    })
  },
  //新增/修改账号组保存数据
  async saveGroup(data) {
    return await request({
      url: '/Storeaccountgroup/saveGroup',
      method: 'post',
      data: data
    })
  },
  //删除用户组
  async groupDel(data) {
    return await request({
      url: '/Storeaccountgroup/groupDel',
      method: 'post',
      data: data
    })
  },
  //获取店铺信息数据
  async getStoreInfo(data) {
    return await request({
      url: '/storeinfo/getStoreInfo',
      method: 'post',
      data: data
    })
  },
  //修改运营负责人
  async changeOperator(data) {
    return await request({
      url: '/storeinfo/changeOperator',
      method: 'post',
      data: data
    })
  },
  //修改密码
  async changePassword(data) {
    return await request({
      url: '/Storeinfo/changePassword',
      method: 'post',
      data: data
    })
  },


}
