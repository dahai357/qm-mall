<template>
    <div class="qm-store-class-index">
        <qm-tabs :tabs="tabs" :blod="false" class="store-tabs" :marginRight="20" @routerData="routerData($event)">
        </qm-tabs>
        <div class="menu-more">
            <a  class="ncsc-btn ncsc-btn-orange" v-if="curUrl === 'index'"  @click="addCoupon" >添加活动推送</a>
            <a class="ncsc-btn ncsc-btn-orange-rim" v-if="curUrl !== 'index'"  @click="back()">返回</a>
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
                    index:{name:'活动推送',select:true,act:'index'},
                    add:{name:'添加活动推送',select:false,act:'add',hidden:true},
                },
                curUrl: ''
            }
        },
        components: {
            QmTabs
        },
        computed:{

        },
        methods:{
            addCoupon(){
                storage.set('id',0)
                var data = {
                    key:'add'
                }
                this.routerData(data)
            },
            routerData(data){
                this.curUrl = data.key
                var url = '/promotion/act_push/'+data.key
                this.$router.push(url);
            },
            back(){
                var data = {
                    key:'index'
                }
                this.routerData(data)
            },
            changeCur(){
              if(storage.get('id')>0){
                this.tabs.add.name = '编辑活动推送'
              }else{
                this.tabs.add.name = '添加活动推送'
              }
                var path = this.$route.path
                this.curUrl = path.substring(path.lastIndexOf('/') + 1);
            },
        },
        watch:{
            '$route'(newRouter){
                this.changeCur()
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
