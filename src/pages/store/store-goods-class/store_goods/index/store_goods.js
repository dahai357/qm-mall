
import {mapGetters,mapMutations,mapActions} from 'vuex';
import * as _ from 'lodash';
import QmPagination from 'component/qm-pagination/index';
import QmDialog from 'component/qm-dialog/index';
import QmTable from 'component/qm-table/index';
import draggable from 'vuedraggable';
import QmAddGoods from 'component/qm-add-goods/index';
import QmTips from 'component/qm-tips/index';
import util from "lib/utils/util";
import storage from 'lib/utils/storage';

export default {
    name: "store-goods-class-store-goods",
    data (){
        return {
            btnClick:{
            },
            pageParams1:{
                goods_name:'',
                member_name:'',
                evaluate_type:0,
                pageIndex:0,
                pageSize:10,
                total:10
            },

            dialog1:false,
            dialogMessage1:'请选择需要操作的记录',
            dialogTitle1:'提示信息',
            stc_sub_title:'',
            stc_state:null,
            stc_id:0,
            stc_name:'',
            show_type:null,

            error:{
                stc_name_error:false,
                stc_state_error:false,
                show_type_error:false,
                goods_error : false,
                goods_error_tips : '请选择分类下的商品'
            },

            list:[],
            ids:'',
            allShowMaxGoodsCount:8,
            successDialog:false,
            addGood:false //是否显示添加商品
        }
    },

    components: {
        QmPagination,
        QmDialog,
        QmTable,
        draggable,
        QmAddGoods,
        QmTips,
        storage
    },

    computed:{
        ...mapGetters('storeGoodsClass',{

        }),

        dragOptions() {
            return {
              animation: 200,
              disabled: false,
            };
          }
    },

    methods:{          
        ...mapActions('storeGoodsClass',{
            getGoodsList:'getGoodsList',
            searchGoods:'searchGoods',
            saveGoods:'saveGoods',
            saveClassAndGoods:'saveClassAndGoods'
        }),      

        
        init(stc_id){
            if(stc_id>0){
                var data = {
                    stc_id:stc_id
                }
                this.getGoodsList(data).then((res)=>{

                    if(res.resultCode == 1){
                        if(res.responseContent.list){
                            res.responseContent.list.forEach((res,r) => {
                                res.goods_id = res.goods_commonid
                            });
                        }else{
                            res.responseContent.list = [];
                        }
                        this.list = res.responseContent.list;
                        this.ids = res.responseContent.ids;
                        let classInfo = res.responseContent.class;
                        this.stc_name = classInfo.stc_name;
                        this.stc_sub_title = '';
                        if(classInfo.stc_sub_title){
                            this.stc_sub_title = classInfo.stc_sub_title;
                        }
                        this.stc_state = classInfo.stc_state;
                        this.show_type = classInfo.show_type;
                    }
                })
            }

        },

        routerItem(item,i){
            let routeData = this.$router.resolve({
                path: "/goods/store_goods_add/add_step_two/"+item.goods_commonid,
            });
            if(item.desc){
                if(item.desc == "已删除"){
                    util.msg("商品不存在");
                }else{
                    // this.$router.push("/goods/store_goods_add/add_step_two/"+item.goods_id)
                    window.open(routeData.href, '_blank');
                }
            }else{
                // this.$router.push("/goods/store_goods_add/add_step_two/"+item.goods_id)
                window.open(routeData.href, '_blank');
            }
        },

        removeGoods(item,i){
            this.list.splice(i,1);
        },

        removeOneGoods(data){
            var newList = _.clone(this.list);
            newList.forEach((goods,gs)=>{
                if(goods.goods_commonid == data.good.goods_commonid){
                    newList.splice(gs,1);
                }
            })
            this.list = newList;
        },
        //锚点跳转
        goAnchor(selector) {
            var child = document.querySelector(selector)
            if(child != null){
                document.getElementsByClassName("routerContent")[0].scrollTop = document.querySelector(selector).offsetTop-150;
            }
        },
        saveCouponBtn(){
            var isvalid = true;
            if(this.stc_name == null || this.stc_name == ''){
                this.error.stc_name_error = true;
                this.goAnchor('#stc_name');
                return ;
            }else{
                this.error.stc_name_error = false;
            }
            if(this.stc_sub_title != null && this.stc_sub_title != '' && this.stc_sub_title.length > 20){
                this.error.stc_sub_title_error = true;
                this.goAnchor('#stc_sub_title');
                return ;
            }else{
                this.error.stc_sub_title_error = false;
            }
            if(this.show_type == null || this.show_type <0){
                this.error.show_type_error = true;
                this.goAnchor('#showTypeRadio');
                return;
            }else{
                this.error.show_type_error = false;
            }
            if(this.list && this.list.length>0){
                if(this.list.length> this.allShowMaxGoodsCount && this.show_type == 0){
                    this.error.goods_error_tips = '全部展示的效果下，该分类最多可添加'+this.allShowMaxGoodsCount+'个商品';
                    this.goAnchor('#bundlingGoodsTable');
                    this.error.goods_error = true;
                    console.log(this.error.goods_error);
                    return ;
                }
                this.error.goods_error = false;
            }else{
                this.error.goods_error = true;
                this.error.goods_error_tips = '请选择分类下的商品'
                this.goAnchor('#bundlingGoodsTable');
                return ;
            }
            if(this.stc_state == null || this.stc_state <0){
                this.error.stc_state_error = true;
                this.goAnchor('#stcStateRadio');
                return ;
            }else{
                this.error.stc_state_error = false;
            }
            if(isvalid){
                var ids = this.list.map((res)=>{return res.goods_commonid}).join(",")
                var goods = this.list.map((res,r)=>{return {gid:res.goods_commonid,gc_sort:r+1}});
                var data = {
                    stc_id:this.stc_id,
                    goods:goods,
                    goods_commonids:ids,
                    stc_name:this.stc_name,
                    stc_sub_title:this.stc_sub_title,
                    stc_state:this.stc_state,
                    show_type:this.show_type
                }
                this.saveClassAndGoods(data).then((res)=>{
                    if(res.resultCode == 1){

                        util.msg("保存成功")
                        setTimeout(() => {

                            var url = '/promotion/store_goods_class/index';
                            this.$router.push(url);
                        }, 2000);
                    }else{
                         util.msg(res.longMessage);
                    }
                })
            }
        },

        itemDraggable(event){

            // var ids = '';
            // this.classList.forEach((item,i) => {
            //   if(i == this.classList.length -1 ){
            //     ids += item.stc_id
            //   }else{
            //     ids += item.stc_id + ','
            //   }
            // });

            // var data = {
            //   ids:ids
            // }
            
            // this.setClassSort(data).then((res)=>{

            // })
        },

        addPageGoods(goodList){
            var newList = _.clone(this.list);
            if(this.show_type == 0){
                //全部展示，做最多八个判断
                var isMaxLength = false;
                goodList.forEach((good,g)=>{
                    if(this.checkIsExist(this.list,good)){
                        return;
                    }else{
                        if(newList.length >= this.allShowMaxGoodsCount){
                            isMaxLength = true;
                        }else{
                            newList.push(good);
                        }
                    }
                })
                this.list = newList;
                if(isMaxLength){
                    util.msg("该显示效果分类限制展示"+this.allShowMaxGoodsCount+"个商品，当前分类下的商品数已超限制");
                }
            }else{
                goodList.forEach((good,g)=>{
                    if(this.checkIsExist(this.list,good)){
                        return;
                    }else{
                        newList.push(good);
                    }
                })
                this.list = newList;
            }
            
        },

        addOneGoods(good){
            var newList = _.clone(this.list);
            if(this.show_type == 0){
                //全部展示，做最多八个判断
                var isMaxLength = false;
                if(this.checkIsExist(this.list,good)){
                    return;
                }else{
                    if(newList.length >= this.allShowMaxGoodsCount){
                        isMaxLength = true;
                    }else{
                        newList.push(good);
                    }
                }
                this.list = newList;
                if(isMaxLength){
                    util.msg("该显示效果分类限制展示"+this.allShowMaxGoodsCount+"个商品，当前分类下的商品数已超限制");
                }
            }else{
                if(this.checkIsExist(this.list,good)){
                    return;
                }else{
                    newList.push(good);
                }
                this.list = newList;
            }

            // var isExist = this.checkIsExist(this.list,good);
            // if(isExist){
            //     return;
            // }else{
            //     newList.push(good);
            // }
            // this.list = newList;
        },

        checkIsExist(list,item){
            var isExist = false;
            list.forEach((li,l) => {
                if(li.goods_commonid == item.goods_commonid){
                    isExist = true;
                }
            });
            return isExist;
        },        

    },

        

    watch:{
    
    },

    mounted(){

        var params = this.$route.params;

        this.stc_id = params.stc_id;
        console.log(this.stc_id);
        this.init(params.stc_id)
    }
}
