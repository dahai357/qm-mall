<style scoped>
    .ncsc-table td {
        border-bottom: 1px solid #eee;
        padding: 20px 10px;
    }
    .ncsc-table .qrcode-box {
        display: inline-block;
        vertical-align: middle;
        line-height: 1;
        position: relative;
    }
    .ncsc-table .qrcode-in {
        background: #fff;
        display: none;
        width: 190px;
        padding: 10px 5px;
        border: solid 1px #ddd;
        position: absolute;
        z-index: 99;
        top: 50%;
        margin-top: -100px;
        left: 25px;
        text-align: center;
        box-sizing: border-box;
        border-radius: 5px;
    }
    .ncsc-table .qrcode-in p {
        line-height: 0;
        width: 160px;
        height: 160px;
        overflow: hidden;
        margin: 5px auto 0;
    }
    .qrcode-in:before{left:-16px;color:#bbb}
    .qrcode-in:after{z-index:2;left:-15px;color:#fff}
    .qrcode-box.active .qrcode-in{ display: block;}
    .ncsc-table .qrcode-box:hover .qrcode-in {
        display: block;
    }
    .ncsc-table .codetd:hover .qrcode-in {
        display: block;
    }
    .info-box {
        display: table;
    }
    .info-box .pic {
        padding-right: 15px;
        position: relative;
        display: table-cell;
        vertical-align: top;
    }
    .info-box .detail {
        display: table-cell;
        vertical-align: top;
        word-break: break-all;
    }
    .qrcode-in::before{
        content: "";
        box-sizing: content-box;
        width: 0px;
        height: 0px;
        position: absolute;
        top: 90px;;
        left: -16px;
        padding:0;
        border-right: 8px solid #fff;
        border-top:8px solid transparent;
        border-bottom: 8px solid transparent;
        border-left:8px solid transparent;
        display: block;
        content:'';
        z-index: 12;
    }
    .qrcode-in:after{
         box-sizing: content-box;
        width: 0px;
        height: 0px;
        position: absolute;
        top: 89px;;
        left: -18px;
        padding:0;
        border-right: 9px solid #ccc;
        border-top:9px solid transparent;
        border-bottom:9px solid transparent;
        border-left:9px solid transparent;
        display: block;
        content:'';
        z-index:10
    }
    .td-center{
        text-align: center;
    }
    .w230{
        width: 230px;
    }
</style>
<template>
    <div class="qm-store-class-base">
      <p class="C4 S7">可制作海报，用户扫码即可直接领取对应优惠券&nbsp;&nbsp;<a class="orange" @click="$router.push('/promotion/store_poster/index')">前往制作>></a></p>
      <div class="search-form">

            <select name="type"  class="mt20 mb20"  v-model="pageParams.is_available" @change="search()">
                <option value="-1">全部状态</option>
                <option value="1">有效</option>
                <option value="0">无效</option>
            </select>
            <select name="type"  class="mt20 mb20"  v-model="pageParams.type" @change="search()">

                <option value="-1">选择类型</option>
                <template v-for="(first,f) in coupon_types">
                    <option v-if ="first == pageParams.type" :value="f" :key="f" selected>{{first}}</option>
                    <option v-else :value="f" :key="f" selected>{{first}}</option>
                </template>
            </select>
            <input type="text" class="w150 mr5" name="name" autocomplete="off" placeholder="优惠券名称" v-model="pageParams.name">
            <input type="submit" class="ncsc-btn" value="搜索" @click="search()">
        </div>
        <p class="c-red">注：优惠券一旦生成无法再次编辑或删除，只可作废；作废后优惠券将不再被领取，原已领取的用户仍可正常使用</p>
        <qm-table :pageParams="pageParams">
            <template slot="table">
                <table class="ncsc-table mt20">
                    <thead>
                    <tr>
                        <th class="w230">优惠券名称</th>
                        <th>类型</th>
                        <th class="w100">优惠金额<span class="c-gray fs12">(元)</span></th>
                        <th>状态</th>
                        <th>剩余张数</th>
                        <th>开始时间</th>
                        <th>结束时间</th>
                        <th>修改时间</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,i) in coupon_list">
                        <td :class="isShouGou?'codetd':''">
                            <div class="info-box">
                                <div class="detail">
                                    <p>{{item.name}}</p>
                                    <div class="mt5">
                                        <div class="qrcode-box mr5 js-qrcode coupon-show" ><i class="fa fa-qrcode"></i><div class="qrcode-in">打开 微信 扫一扫<p><img :src="item.couponStoreUrl" width="160" height="160"></p></div></div>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td>{{coupon_types[item.type]}}</td>
                        <td>{{item.cash_money}}</td>
                        <td>{{item.is_available==1?'有效':'无效'}}</td>
                        <td>{{item.is_limit_num==1?'不限制':(item.ticket_num - item.used_ticket_num)}}</td>
                        <template v-if="item.is_show ==1">
                            <td>
                                <p>{{item.start_time.day}}</p>
                                <p>{{item.start_time.time}}</p>
                            </td>
                            <td>
                                <p>{{item.end_time.day}}</p>
                                <p>{{item.end_time.time}}</p>
                            </td>
                        </template>
                        <template v-else>
                            <td>
                                -
                            </td>
                            <td>
                                -
                            </td>
                        </template>
                        <td>
                            <p>{{item.addtime.day}}</p>
                            <p>{{item.addtime.time}}</p>
                        </td>
                        <td class="handle">
                            <!--<p><a @click="delOne(item)" class="ncsc-btn">删除</a></p>-->
                            <p v-if="item.is_usable==1"><a @click="disableOne(item)" class="ncsc-btn">作废</a></p>
                            <p><a @click="edit(item)" :class="item.is_disable == 1?'ncsc-btn disabled':'ncsc-btn'">编辑</a></p>
                            <p><a @click="show(item)" class="ncsc-btn">查看</a></p>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </template>
        </qm-table>
        <qm-pagination :pageParams="pageParams" @changeIndex="changeIndex($event)"></qm-pagination>
        <qm-tips :tipsVisible="delDialog" :width="'420px'" @update:tipsVisible="delDialog = $event" @close="delDialog = false" @confirm="confirmDel()">
            <template slot="title">提示信息</template>
            <template slot="content">{{delTips}}</template>
        </qm-tips>
    </div>
</template>
<script>
    import 'viewerjs/dist/viewer.css'
    import {mapGetters,mapActions} from 'vuex'
    import QmPagination from 'component/qm-pagination/index'
    import QmDialog from 'component/qm-dialog/index';
    import QmTable from 'component/qm-table/index';
    import QmTips from 'component/qm-tips/index';
    import storage from 'lib/utils/storage';
    import {storeCoupon} from 'api';
    export default {
        name: "store-coupon-index",
        data() {
            return {
              bodyListener:'',
                pageParams:{
                    pageIndex:0,
                    pageSize:10,
                    total:0,
                    type:-1,
                    coupon_id:0,
                    name:'',
                    is_available:-1
                },
                coupon_types:[],
                coupon_list:[],
                delDialog:false,
                delType:1,
                delTips:'确定删除吗？',
                isShouGou:navigator.userAgent.toLowerCase().indexOf('se 2.x')>-1 ? true : false
            }
        },

        computed:{
            ...mapGetters({
                getData:'getStoreCouponList',
            })
        },

        components:{
            QmPagination,
            QmDialog,
            QmTips,
            QmTable
        },

        methods: {
            getPageData(data){
                storeCoupon.getCouponList(data).then((res)=>{
                    this.coupon_list = res.list;
                    this.coupon_types = res.coupon_types;
                    var newPageParams = _.clone(this.pageParams)
                    newPageParams.total = res.total;
                    this.pageParams = newPageParams;
                })
            },
            search(){
              $('select').blur();
                this.pageParams.pageIndex = 0;
                this.getPageData(this.pageParams);
            },
            changeIndex(index){
                this.pageParams.pageIndex = index;
                this.getPageData(this.pageParams);
            },
            delOne(item){
                this.pageParams.coupon_id = item.id
                this.delTips = '确定删除吗？'
                this.delType = 1
                if(item.is_disable==1){
                    this.delTips = '当前优惠券处于有效期内，确认删除吗？'
                }
                this.delDialog = true
            },
            disableOne(item){
                this.pageParams.coupon_id = item.id
                this.delTips = '确认作废当前优惠券吗'
                this.delType = 2
                this.delDialog = true
            },
            edit(item){
                if(item.is_disable==0){
                    storage.set('coupon_id',item.id)
                    storage.set('type',item.type)
                    this.$router.push("/promotion/store_coupon/add")
                }else{
                    layer.msg('当前优惠券不能编辑');
                }
            },
            show(item){
                storage.set('coupon_id',item.id)
                this.$router.push("/promotion/store_coupon/show")
            },
            confirmDel(){
                var data = {
                    id:this.pageParams.coupon_id,
                    type:this.delType
                }
                storeCoupon.delCoupon(data).then((res)=>{
                    this.delDialog = false
                    this.pageParams.pageIndex = 0;
                    this.getPageData(this.pageParams);
                })
            },
        },
        watch:{

        },
        mounted () {
          var _self = this;
            this.getPageData(this.pageParams);
            layui.use('layer', function(){
                this.layer = layui.layer;
            });
          //body绑定键盘enter搜索事件
          _self.bodyListener = (e) => {
            if (e.keyCode === 13){
              if(_self.delDialog){
                //删除优惠券
                _self.confirmDel()
              }else{
                _self.search();
              }
            }
          }
          document.body.addEventListener('keyup', _self.bodyListener, false);
        },
      beforeDestroy(){
        //销毁键盘enter搜索事件
        document.body.removeEventListener('keyup', this.bodyListener);
      },
        updated(){
        }
    }
</script>
