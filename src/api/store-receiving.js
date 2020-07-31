import request from "../libs/utils/request";

export default {

      //商家接单操作（已开发）
  async orderReceive(data){
    const requestData =  await request({
      url:'/shopkeeper/orderReceive',
      data:data,
      method:'post'
    });
    return requestData
  },

      //1.2.0店铺拒绝接单（已核对）
      async refuseOrder(data){
        const requestData =  await request({
          url:'/shopkeeper/refuseOrder',
          data:data,
          method:'post'
        });
        return requestData
      },
    

 
}
