<template>
    <div class="qm-store-class-index">
        <qm-tabs :tabs="tabs" :blod="false" class="store-tabs" :marginRight="20" @routerData="routerData($event)">
        </qm-tabs>
        <div class="menu-more">
            <a  class="ncsc-btn ncsc-btn-orange" v-if="curUrl === 'index'"  @click="addCoupon" >添加优惠券</a>
            <a class="ncsc-btn ncsc-btn-orange-rim" v-else  @click="back()">返回</a>
        </div>
        <div class="clear"></div>
        <router-view />
    </div>
</template>
<script>
    import {mapGetters,mapActions} from 'vuex'
    import QmTabs from '../../../components/qm-tabs/index';
    import storage from 'lib/utils/storage'
    export default {
        name: "store-coupon",
        data(){
            return{
                tabs:{
                    index:{name:'优惠券管理',select:true,act:'index'},
                    add:{name:'添加优惠券',select:false,act:'add',hidden:true},
                    show:{name:'优惠券详情',select:false,act:'show',hidden:true},
                    giftadd:{name:'配置满额赠券',select:false,act:'giftadd',hidden:true},
                },
                curUrl: 'index'
            }
        },
        components: {
            QmTabs
        },
        computed:{
            ...mapGetters('storeCoupon',{
                canEdit:'getCanEdit',
                isAddGift:'getIsAddGift'
            })
        },
        methods:{
            ...mapActions('storeCoupon',{
                setEdit:'setEdit',
            }),
            addCoupon(){
                storage.set('coupon_id',0)
                storage.set('type',0);
                storage.set('oldCoupon',null)
                storage.set('oldClassList',null)
                storage.set('old_coupon_goods_list',null)
                storage.set('old_gift_goods_list',null)
                storage.set('returnGift',0)
                var data = {
                    key:'add'
                }
                this.routerData(data)
            },
            routerData(data){
                this.curUrl = data.key
                var url = '/promotion/store_coupon/'+data.key
                this.$router.push(url);
            },
            back(){
                var data = {
                    key:'index'
                }
                this.routerData(data)
            },
            routerData(data){
                this.curUrl = data.key
                var url = '/promotion/store_coupon/'+data.key
                this.$router.push(url);
            },
            changeCur(){
                let coupon_id = storage.get('coupon_id')
                let oldCoupon = storage.get('oldCoupon')
                if(oldCoupon){
                    if(coupon_id>0 || oldCoupon.id > 0){
                        this.tabs.add.name = '编辑优惠券'
                    }else{
                        this.tabs.add.name = '添加优惠券'
                    }
                }
                var path = this.$route.path
                this.curUrl = path.substring(path.lastIndexOf('/') + 1);
                if(this.curUrl == 'index'){
                    storage.set('oldCoupon',null)
                    storage.set('oldClassList',null)
                    storage.set('old_coupon_goods_list',null)
                    storage.set('old_gift_goods_list',null)
                    storage.set('returnGift',0)
                    this.tabs.add.hidden = true;
                    this.tabs.add.select = false;
                    this.tabs.giftadd.hidden = true;
                    this.tabs.giftadd.select = false;
                }else if(this.curUrl == 'add'){
                    this.tabs.giftadd.hidden = true;
                    this.tabs.giftadd.select = false;
                }else if(this.curUrl == 'giftadd'){
                    this.tabs.add.name = '添加优惠券'
                    let oldCoupon = storage.get('oldCoupon')
                    if(oldCoupon.id>0){
                        this.tabs.add.name = '编辑优惠券'
                    }
                    this.tabs.add.hidden = false;
                    this.tabs.add.select = false;
                    this.tabs.giftadd.hidden = false;
                    this.tabs.giftadd.select = true;
                }
            },
        },
        watch:{
            '$route'(newRouter){
                this.changeCur()
            },
            canEdit(){
                this.tabs.add.name = this.canEdit?'编辑优惠券':'添加优惠券'
            },
            isAddGift(){
                if(this.isAddGift){
                    this.tabs.add.name = '添加优惠券'
                    let oldCoupon = storage.get('oldCoupon')
                    if(oldCoupon.id>0){
                        this.tabs.add.name = '编辑优惠券'
                    }
                    this.tabs.add.hidden = false;
                    this.tabs.add.select = false;
                    this.tabs.giftadd.hidden = false;
                    this.tabs.giftadd.select = true;
                }
            }
        },
        mounted() {
            var path = this.$route.path
            this.curUrl = path.substring(path.lastIndexOf('/') + 1);
        }
    }
</script>

<style scoped>
    .menu-more {

        float: right;
        right: 0;
        top: 0;
        display: block;

        z-index: 1;
        bottom: 10px;
        right: -5px;
    }

    .menu-more a {
        margin: 0 5px;
    }
    .menu-more a:hover{
        text-decoration: none;
        color: #fff;
    }
</style>
