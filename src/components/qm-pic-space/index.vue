<style scoped>
    /*图片空间*/
    .goods-gallery{display: block; overflow: hidden; border:1px solid #ddd; width: 792px; border-radius:5px; margin-top: 10px;}
    .goods-gallery .nav{height: 52px; padding: 10px 20px; border-bottom:1px solid #ddd; font-size: 14px;}
    .goods-gallery .nav .l{line-height: 30px; color: #757575; float: left;}
    .goods-gallery .nav .r{float: right;}
    .goods-gallery .list{padding: 0 10px; font-size: 0; margin-top: 15px; text-align: left;}
    .goods-gallery .list li{display: inline-block; vertical-align: middle; padding:15px 10px; height: 120px; width: 110px;}
    .goods-gallery .list a{display: table; line-height: 0; width: 88px; height: 88px; border:1px solid #eee; overflow: hidden; border-radius:5px;}
    .goods-gallery .list a:hover{border-color:#ff8519;}
    .goods-gallery .list .pic{ display: table; width: 88px; table-layout: fixed}
    .goods-gallery .list .avatar{display: table-cell; width: 100%; height: 88px; vertical-align: middle; text-align: center;}
    .goods-gallery .list img{max-width: 88px; max-height: 88px; border-radius:5px;}
    .goods-gallery .nav select{font-size: 14px;}
    .goods-gallery .pagination{margin-right: 17px; margin-top: 0;}
    #demo, #des_demo{line-height: 0; text-align: center; width: 100%}
    #demo .ajaxload,
    #des_demo .ajaxload{width: 16px; height: 16px; margin: 80px auto;}
    #demo nav select{width: 100px;}
    #demo nav option{width: 80px;}
</style>
<template>
    <div id="demo" v-show="goodsPicSpace">
        <div class="goods-gallery add-step2">
            <div class="nav">
                <span class="l">用户相册&nbsp;>&nbsp;全部图片</span>
                <span class="r">
                    <select name="jumpMenu" @change="changePicSpace">
                        <option value="0">请选择...</option>
                        <option v-for="item in classList" :value="item.aclass_id">{{item.aclass_name}}</option>
                     </select>
                </span>
            </div>
            <ul class="list">
                <li v-for="item in picList"><a href="JavaScript:void(0);" @click="insertLogo(item.apic_cover)"><span class="pic"><span class="avatar"><img :src="item.apic_cover" :title="item.apic_name"></span></span></a></li>
                <qm-pagination :pageParams="pageParams" @changeIndex="changePicSpaceIndex($event)" :scrollTop="false"></qm-pagination>
            </ul>
        </div>
    </div>
</template>

<script>
    import QmPagination from 'component/qm-pagination/index'
    export default {
        name: "qm-pic-space"
      ,
      props:{
        goodsPicSpace:{
          type:Boolean,
          default:false
        },
        classList:{
          type:Array,
          default:function () {
            return [];
          }
        },
        picList:{
          type:Array,
          default:function () {
            return [];
          }
        },
        pageParams:{
          type:Object,
          default:function () {
            return {
              pageIndex:0,
              pageSize:14,
              total:0,
              aclassId:0
            }
          }
        }
      },
      data(){
        return {

        }
      },
      computed: {

      },
      components:{
        QmPagination,
      },
      methods:{
        changePicSpace(e) {
          this.$emit('changePicSpace',e.target.value);
        },
        changePicSpaceIndex(index) {
          this.$emit('changePicSpaceIndex',index);
        },
        insertLogo(pic) {
          this.$emit('insertLogo',pic);
        }
      },
      watch:{

      },
      mounted() {

      },


    }
</script>
