
import util from 'lib/utils/util';
import {mapGetters,mapMutations,mapActions} from 'vuex';
import * as _ from 'lodash';
import QmTable from 'component/qm-table/index';
import QmPagination from 'component/qm-pagination/index';
import QmDialog from 'component/qm-dialog/index';
import draggable from 'vuedraggable';
import storage from 'lib/utils/storage';


export default {
    name: "store-goods-class-index",
    data (){
        return {
          bodyListener:'',
            btnClick:{
            },
            dialogTitle:"新增",
            pageParams:{
              goods_name:'',
              member_name:'',
              evaluate_type:0,
              pageIndex:0,
              pageSize:10,
              total:0
            },

            isAll:false,
            classList:[],
            filterList:[],


            dialog1:false,
            successDialog:false,
            comfirmDialog:false,
            successBtn: false,
            successTimeout:true,

            successMessage:'保存成功',

            curClass:{
              stc_level:'1',//默认1	
              stc_id:0,//分类id（新增为0）	
              stc_name:'',//分类名称
              stc_sub_title:'',//分类副标题
              stc_sort:'',//排序	
              stc_state:-1,//显示状态：0否1是	
              show_type:-1,//展示效果：0全部1收起展示
            },

            error:{
              stc_name_error:false,
              stc_state_error:false,
              show_type_error:false
            },
            maxStoreGoodsClassCount:10,
            list: [1,2,34,4,54,5]
        }
    },
        components: {
          QmTable,
          QmPagination,
          QmDialog,
          draggable,
          storage
        },

        computed:{
          ...mapGetters('storeGoodsClass',{
            isAdd:'getIsAdd',
            isEdit:'getIsEdit'
          }),
          dragOptions() {
            return {
              animation: 200,
              disabled: false,
            };
          }
        },

        methods:{

          ...mapMutations('storeGoodsClass',{
            setShowAddBtn:'setShowAddBtn',
            setIsAdd:'setIsAdd',
            setIsEdit:'setIsEdit'
          }),
          
          ...mapActions('storeGoodsClass',{
            getClassList:'getClassList',
            classEdit:'classEdit',
            setClassSort:'setClassSort',
            dropClass:'dropClass',
            getGoodsList:'getGoodsList',
        }),
 
            selectAll(event){

                this.isAll = event.target.checked;
                let tempList = _.clone(this.classList);
                tempList.forEach((item,i) => {
                    if(event.target.checked){
                      item.checked = true;
                    }else{
                      item.checked = false;
                    }

                });
                this.classList = tempList;
                this.filterList = this.classList.filter((item)=>{
                    if(item.checked){
                      return item;
                    }
                })


              },


              itemDraggable(event){

                var ids = '';
                this.classList.forEach((item,i) => {
                  if(i == this.classList.length -1 ){
                    ids += item.stc_id
                  }else{
                    ids += item.stc_id + ','
                  }
                });

                var data = {
                  ids:ids
                }
                
                this.setClassSort(data).then((res)=>{

                })
              },


              editItem(item,i){
                  // 该显示效果分类限制展示8个商品，当前分类下的商品数已超限制
                  this.reset();
                  this.error.stc_name_error=false
                  this.error.stc_state_error=false
                  this.error.show_type_error=false
                  this.curClass = item;                  
                  this.dialogTitle="编辑分类"
                  this.dialog1 = true;
              },

              betchDelete(){

                if(this.filterList.length == 0){
                  util.msg("请选择需要操作的记录");
                  return;
                }
                this.comfirmDialog = true;
                
              },

              
              getPageData(data){
                this.classList = [];//这行不能去掉，不然会产生7647这个bug
                this.getClassList(data).then((res)=>{
                    
                    if(res.resultCode == 1){
                        res.responseContent.forEach((res)=>{
                          res.checked = false;
                        })
                        this.$nextTick(()=>{
                          this.classList = res.responseContent;
                          var newParams = _.clone(this.pageParams);
                          newParams.total = this.classList.length>0?1:0;
                          this.pageParams = newParams;
                          this.isAll = false;
                        })
                    }else{
                        this.layer.msg(res.longMessage);
                    }
                })
            },

            reset(){
              this.curClass = {
                stc_level:'1',//默认1	
                stc_id:0,//分类id（新增为0）	
                stc_name:'',//分类名称
                stc_sub_title:'',//分类副标题
                stc_sort:'',//排序	
                stc_state:-1,//显示状态：0否1是	
                show_type:-1,//展示效果：0全部1收起展示
              }
  
              this.error = {
                stc_name_error:false,
                stc_state_error:false,
                show_type_error:false,
                stc_sub_title_error:false
              }
            },

            deleteItem(item,i){

              this.comfirmDialog = true;
              this.filterList = [];
              this.filterList.push(item);
              
            },
            deleteSure(){
              this.comfirmDialog = false;
              //获取gc_ids
              var gc_ids = this.filterList.map((item)=>{return item.stc_id}).join(",");
              this.classDelete(gc_ids);
            },
            deleteCancle(){
              this.comfirmDialog = false;
            },

            classDelete(class_id){
              var data = {
                class_id:class_id
              }
              this.dropClass(data).then((res)=>{
                if(res.resultCode == 1){
                  util.msg("删除成功");
                  this.filterList = [];
                  this.getPageData(this.pageParams);

                }else{
                  this.layer.msg(res.longMessage)
                }
              })
            },

            detailItem(list,l){
              this.setShowAddBtn(false);
              if(list){
                  this.setIsEdit(true);
                  var name = list.stc_name&&list.stc_name!=""?list.stc_name:"无";
                  storage.set('stc_name',name);//名称存在特殊符号以及链接标识符号情况，不能用链接带参数传
                  var url = "/promotion/store_goods_class/store_goods/"+list.stc_id+"/"+list.show_type;
                  this.$router.push(url);
              }else{
                  this.setIsEdit(false);
                  var url = "/promotion/store_goods_class/store_goods/0/0";
                  this.$router.push(url);
              }
            },

            selectChange(event,list,l){

              if(event.target.checked){
                this.filterList.push(list); 
                var isAllSelect = true;
                if(this.filterList.length == this.classList.length){
                  this.isAll = true;
                }
              }else{
                this.isAll = false;
                this.filterList.forEach((item,i)=>{
                  if(list.stc_id == item.stc_id){
                    this.filterList.splice(i,1);
                  }
                })
              }
            },

            submitClass(){
              var isvalid = true;
              if(this.curClass.stc_name == ''){
                this.error.stc_name_error = true;
                isvalid = false;
              }else{
                this.error.stc_name_error = false;
              }
              if(this.curClass.stc_sub_title != '' && this.curClass.stc_sub_title.length > 20){
                  this.error.stc_sub_title_error = true;
                  isvalid = false;
              }else{
                  this.error.stc_sub_title_error = false;
              }
              if(this.curClass.stc_state == null || this.curClass.stc_state <0){
                this.error.stc_state_error = true;
                isvalid = false;
              }else{
                this.error.stc_state_error = false;
              }
              if(this.curClass.show_type == null || this.curClass.show_type <0){
                this.error.show_type_error = true;
                isvalid = false;
              }else{
                this.error.show_type_error = false;
              }
              
              if(isvalid){

                if(this.curClass.show_type == 0){
                  var data = {
                      stc_id:this.curClass.stc_id
                  }
      
                  this.getGoodsList(data).then((res)=>{
      
                    if(res.resultCode == 1){
                        if(res.responseContent.list && res.responseContent.list.length > 8){
                          util.msg("该显示效果分类限制展示8个商品，当前分类下的商品数已超限制")
                          return;
                        }
                        this.classEdit(this.curClass).then((res)=>{
                
                          if(res.resultCode == 1){
                            this.dialog1 = false;
                            util.msg("保存成功");
                              this.getPageData(this.pageParams);
                          }else{
                            this.layer.msg(res.longMessage);
                          }
                        })
                    }
                  })
                }else{
                  this.classEdit(this.curClass).then((res)=>{
                
                    if(res.resultCode == 1){
                      this.dialog1 = false;
                      util.msg("保存成功");
                        this.getPageData(this.pageParams);
                    }else{
                      this.layer.msg(res.longMessage);
                    }
                  })
                }
              }
            },
        },

        

        watch:{
            isAdd(){
              if(this.classList && this.classList.length < this.maxStoreGoodsClassCount) {
                this.detailItem('',0)
              }else{
                util.msg('最多可设置' + this.maxStoreGoodsClassCount + '个分类')
              }
          },
            isEdit(){

            }
    
      },

        mounted(){
          var _self = this;
          _self.setShowAddBtn(true);
          _self.getPageData(this.pageParams);
          //body绑定键盘enter搜索事件
          _self.bodyListener = (e) => {
            if(e.keyCode === 13){
              if (_self.dialog1){
                _self.submitClass();
              }else if(_self.comfirmDialog){
                //删除推荐分类
                _self.deleteSure()
              }
            }
          }
          document.body.addEventListener('keyup', _self.bodyListener, false);
        },
  beforeDestroy(){
    //销毁键盘enter搜索事件
    document.body.removeEventListener('keyup', this.bodyListener);
  },
}
