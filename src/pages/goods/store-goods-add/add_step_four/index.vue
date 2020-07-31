<style scoped>
  .alert-hint{padding: 30px 0; background: none; text-align: center; color:#212121; font-size: 14px;}
  .alert-hint h2{font-size: 30px; margin-top: 20px;}
  .alert-hint h4{font-size: 20px; margin-top: 20px;}
  .alert-hint a{color: #ff8519;}
  .alert-hint .link-box{margin:20px -10px 0;}
  .alert-hint .link-box a{margin:0 10px}
  .alert-hint .msg{ background: #fff3e7; display: inline-block; width: 40%; padding: 15px;}
  .btn-orange-border{color:#ff8519; border:1px solid #ff8519; line-height: 2.5; padding: 0 .8em; border-radius:.25em; font-size: 14px; display: inline-block;}
  .btn-orange-border:hover{background:#ff8519; color:#fff; text-decoration: none;}
</style>
<template>
  <div class="alert alert-hint">
    <i class="ico-success"></i>
    <h2>恭喜您，商品发布成功！&nbsp;&nbsp;</h2>
    <p class="link-box">
      <a class="btn-orange-border" href="javascript:;" @click="$router.push({name:'store_goods_online_index'})">去商品管理查看新增商品&gt;&gt;</a>
      <a class="btn-orange-border" href="javascript:;" @click="$router.push({name:'store_goods_add_step_two',params:{commonId:$route.params.commonId}})">重新编辑刚发布的商品&gt;&gt;</a>
    </p>
    <h4>您还可以:</h4>
    <ul>
      <li>1. 继续 " <a href="javascript:;" @click="$router.push({name:'store_goods_add_step_one'})">发布新商品</a>"</li>
      <li>2. 进入 " 商品管理" 管理 "<a href="javascript:;" @click="$router.push({name:'store_goods_online_index'})">出售中的商品</a>"</li>
      <li>3. 进入 " 营销中心" 管理 "<a href="javascript:;" @click="$router.push({name:'sale_act_list'})">分销活动商品</a>"</li>
      <li>4. 可制作海报进行推广宣传&nbsp;&nbsp;<a class="orange" @click="$router.push('/promotion/store_poster/index')">前往制作>></a></li>
    </ul>
  </div>
</template>

<script>
    import {mapGetters,mapActions} from 'vuex';
    import fileUpload from 'lib/utils/fileUpload'
    import 'viewerjs/dist/viewer.css'
    import QmPagination from 'component/qm-pagination/index'
    import QmDialog from 'component/qm-dialog/index';
    import QmTable from 'component/qm-table/index';
    import {storeGoodsAdd,storeGoodsOnline} from 'api'
    import QmPicSpace from 'component/qm-pic-space';
    export default {
        name: "add-step-four",
        data() {
            return {

            }
        },

        computed:{

        },

        components:{

        },

        methods: {

        },
        updated(){

        }
    }
</script>
