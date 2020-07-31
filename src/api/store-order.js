import request from "../libs/utils/request";

export default {

    //订单列表
  async getList(data){
    const requestData =  await request({
      url:'/storeorder/getList',
      data:data,
      method:'post'
    });
    return requestData
  },

   //修改订单金额
   async modifyOrderAmount(data){
    const requestData =  await request({
      url:'/shopkeeper/modifyOrderAmount',
      data:data,
      method:'post'
    });
    return requestData
  },

  //修改订单内容
  async modifyOrder(data){
    const requestData =  await request({
      url:'/shopkeeper/modifyOrder',
      data:data,
      method:'post'
    });
    return requestData
  },
  //修改订单价格数据获取
  async getCalcOrderPrice(data){
    const requestData =  await request({
      url:'/shopkeeper/calcOrderPrice',
      data:data,
      method:'post'
    });
    return requestData
  },
  //修改订单数据获取
  async getCalcOrder(data){
    const requestData =  await request({
      url:'/shopkeeper/calcOrder',
      data:data,
      method:'post'
    });
    return requestData
  },
  //修改订单价格（新）
  async modifyOrderAmountNew(data){
    const requestData =  await request({
      url:'/shopkeeper/modifyOrderNew',
      data:data,
      method:'post'
    });
    return requestData
  },
  //获取订单价格相关
  async getOrderPrice(data){
    const requestData =  await request({
      url:'/shopkeeper/getOrderPrice',
      data:data,
      method:'post'
    });
    return requestData
  },

  //标记为已打款
  async makeAlreadyTransfer(data){
    const requestData =  await request({
      url:'/shopkeeper/makeAlreadyTransfer',
      data:data,
      method:'post'
    });
    return requestData
  },

  //获得配送员列表
  async getDeliveriers(data){
    const requestData =  await request({
      url:'/delivery/getDeliveriers',
      data:data,
      method:'post'
    });
    return requestData
  },

  //获得配送员列表--更多信息
  async getDiliverymanList(data){
    const requestData =  await request({
      url:'/Diliveryman/getDiliverymanList',
      data:data,
      method:'post'
    });
    return requestData
  },

   //打印订单
   async orderPrint(data){
    const requestData =  await request({
      url:'/storeorder/orderPrint',
      data:data,
      method:'post'
    });
    return requestData
  },

  //申请取消订单处理（1.1.1已核对）
  async applyConfirm(data){
    const requestData =  await request({
      url:'/ShopKeeper/applyConfirm',
      data:data,
      method:'post'
    });
    return requestData
  },

  //确认收款(已开发)
  async receivePayment(data){
    const requestData =  await request({
      url:'/shopkeeper/receivePayment',
      data:data,
      method:'post'
    });
    return requestData
  },

  //选择配送员（已开发）
  async selectDelivery(data){
    const requestData =  await request({
      url:'/delivery/selectDelivery',
      data:data,
      method:'post'
    });
    return requestData
  },

  //添加配送员(已经开发)
  async addDelivery(data){
    const requestData =  await request({
      url:'/delivery/addDelivery',
      data:data,
      method:'post'
    });
    return requestData
  },
  //达达订单发布
  async addDadaOrder(data){
    const requestData =  await request({
      url:'/shopkeeper/addDadaOrder',
      data:data,
      method:'post'
    });
    return requestData
  },
  //获取订单增加小费
  async getAddTips(data){
    const requestData =  await request({
      url:'/shopkeeper/getAddTips',
      data:data,
      method:'post'
    });
    return requestData
  },
  //处理订单增加小费
  async addTips(data){
    const requestData =  await request({
      url:'/shopkeeper/addTips',
      data:data,
      method:'post'
    });
    return requestData
  },
  //获取商家取消达达订单
  async getCancelDadaOrder(data){
    const requestData =  await request({
      url:'/shopkeeper/getCancelDadaOrder',
      data:data,
      method:'post'
    });
    return requestData
  },
  //确认商家取消达达订单
  async cancelDadaOrder(data){
    const requestData =  await request({
      url:'/shopkeeper/cancelDadaOrder',
      data:data,
      method:'post'
    });
    return requestData
  },
  //达达订单重新发布
  async reDadaOrder(data){
    const requestData =  await request({
      url:'/shopkeeper/reDadaOrder',
      data:data,
      method:'post'
    });
    return requestData
  },

  //是否黑名单
  async isBlacklist(data){
    const requestData =  await request({
      url:'/StoreFavorites/isBlacklist',
      data:data,
      method:'post'
    });
    return requestData
  },
  //v1.2.2确认达达骑手取消订单
  async confirmDadaOrder(data){
    const requestData =  await request({
      url:'/shopkeeper/confirmDadaOrder',
      data:data,
      method:'post'
    });
    return requestData
  },
  //v1.2.3获取申请取消订单
  async getApplyConfirm(data){
    const requestData =  await request({
      url:'/shopkeeper/getApplyConfirm',
      data:data,
      method:'post'
    });
    return requestData
  },
  //v1.2.2达达异常取消订单确认
  async excconfirmDadaOrder(data){
    const requestData =  await request({
      url:'/shopkeeper/excconfirmDadaOrder',
      data:data,
      method:'post'
    });
    return requestData
  },
  //订单重新预发布
  async rePreOrder(data){
    const requestData =  await request({
      url:'/shopkeeper/rePreOrder',
      data:data,
      method:'post'
    });
    return requestData
  },
  //获取达达信息，判断是否已接入达达
  async getDadaShop(data){
    const requestData =  await request({
      url:'/storeorder/getDadaShop',
      data:data,
      method:'post'
    });
    return requestData
  },

   //确认自提
   async confirmGetBySelf(data){
    const requestData =  await request({
      url:'/shopkeeper/confirmGetBySelf',
      data:data,
      method:'post'
    });
    return requestData
  },

  //物流公司
  async getExpressList(data){
    const requestData =  await request({
      url:'/express/getList',
      data:data,
      method:'post'
    });
    return requestData
  },

  //增加物流公司
  async addNewExpressList(data){
    const requestData =  await request({
      url:'/express/add',
      data:data,
      method:'post'
    });
    return requestData
  },

  //发货
  async orderApplySend(data){
    const requestData =  await request({
      url:'/express/orderApplySend',
      data:data,
      method:'post'
    });
    return requestData
  },

  //修改订单金额
  async modifyAddress(data){
    const requestData =  await request({
      url:'/storeOrder/modifyAddress',
      data:data,
      method:'post'
    });
    return requestData
  },
}
