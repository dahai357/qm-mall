import util from '../libs/utils/util'
import request from "../libs/utils/request";

export default {
    //优惠券列表
    async getCouponList(data){
        const requestData =  await request({
            url:'/StoreCoupon/getList',
            data:data,
            method:'post'
        })
        if (requestData.resultCode === 1) {
            return requestData.responseContent
        }
    },
    //获取优惠券详情
    async getCouponDetail(data){
        const requestData =  await request({
            url:'/StoreCoupon/couponDetail',
            data:data,
            method:'post'
        })
        if (requestData.resultCode === 1) {
            return requestData.responseContent
        }
    },
    //删除优惠券
    async delCoupon(data){
        const requestData =  await request({
            url:'/StoreCoupon/couponDel',
            data:data,
            method:'post',
            showMessage:true
        })
        return requestData
    },
    //编辑优惠券
    async editCoupon(data){
        const requestData =  await request({
            url:'/StoreCoupon/couponEdit',
            data:data,
            method:'post',
            showMessage:true
        })
        return requestData
    },
    //检查优惠券编辑是否合法
    async checkEdit(data){
        const requestData =  await request({
            url:'/StoreCoupon/checkEdit',
            data:data,
            method:'post',
            showMessage:true
        })
        if (requestData.resultCode === 1) {
            return requestData.responseContent
        }
    },
    async getCouponTypes(data){
        const requestData =  await request({
            url:'/StoreCoupon/couponTypes',
            data:data,
            method:'post',
            showMessage:true
        })
        if (requestData.resultCode === 1) {
            return requestData.responseContent
        }
    }
}
