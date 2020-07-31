
import {mapGetters,mapActions} from 'vuex';
import * as _ from 'lodash';
import QmDialog from 'component/qm-dialog/index';
import QmTable from 'component/qm-table/index';
import draggable from 'vuedraggable';
import storage from 'lib/utils/storage';
import util from 'lib/utils/util';

export default {
    name: "store-class-base",
    data (){
        return {
          bodyListener:'',
          firstClassList:[],
          subClassList:[],
          firstType:-1,
          error_msg:'',//删除弹框提示语

          colData:{
            col1:[],
            col2:[],
            col3:[],
          },

          dialogVisible:false,
          deleteDialogVisible:false,
          deleteSuccessMessage:false,
          successMessage:false,

          curFirst:{},
          curSecond:{},
          curThird:{gc_id:0,gc_name:''},
          btnClick:{

          },

          nameEmpty:false,
          nameTestError:false,

          sessionModal:null,
          firstIndex:0,
          secondIndex:0,
          thirdIndex:0,
          pageParams:{
            total:0
          }
        }
    },
        components: {
          QmDialog,
          QmTable,
          draggable
        },

        computed:{
          dragOptions() {
            return {
              animation: 200,
              disabled: false,
            };
          }
        },

        methods:{
            ...mapActions({
              getFirstClassList:'getFirstClassList',
              getSubClassList:'getSubClassList',
              classEdit:'classEdit',
              dropClass:'dropClass',
              setSort:'setSort',
            }),

            initData(){
              this.getFirstClassList().then((res)=>{
                if(res.resultCode === 1){
                  this.firstClassList = res.responseContent;
                }
              })

              this.getSubClassListData(0);


            },

            itemDraggable(event,parents){
              console.log( parents.children)
              var ids = '';
              parents.children.forEach((item,i) => {
                if(i == parents.children.length -1 ){
                  ids += item.gc_id
                }else{
                  ids += item.gc_id + ','
                }
              });

              var data = {
                ids:ids,
                gc_parent_id:parents.gc_id
              }
              this.setSort(data).then((res)=>{})
            },



            getSubClassListData(fgc_id){
              var data = {
                gc_parent_id:fgc_id
              }
              this.getSubClassList(data).then((res)=>{

                this.colData.col1 = [];
                this.colData.col2 = [];
                this.colData.col3 = [];

                this.subClassList = res.responseContent;

                this.colData.col1 = [];
                this.colData.col2 = [];
                this.colData.col3 = [];

                let tmpParams = _.clone(this.pageParams)
                if(this.subClassList.length > 0) {
                  tmpParams.total = 1
                } else {
                  tmpParams.total = 0
                }
                this.pageParams = tmpParams;

                if(this.firstType == -1){
                  //将数组分成3列
                  this.subClassList.forEach((el,e) => {
                    if(el.children && el.children.length > 0){
                          el.children.forEach((second,s)=>{
                            second.active = true;
                            second.showMore = false;
                          })
                        }

                        if(e%3 == 0){
                          this.colData.col1.push(_.clone(el));
                        }else if(e%3 == 1){
                          this.colData.col2.push(_.clone(el));
                        }else{
                          this.colData.col3.push(_.clone(el));
                        }
                      });
                  }else{
                    this.subClassList.forEach((res)=>{
                      if(res.children && res.children.length > 0){
                        res.children.forEach((second,s)=>{
                          second.active = true;
                          second.showMore = false;
                        })
                      }
                      if(res.gc_id == this.firstType){
                        this.colData.col1.push(res);
                      }
                    })
                  }
              })
            },

            deleteClass(first,second,s,third){

              this.curThird = third;
              this.deleteDialogVisible = true;

            },

            secondToggle(type,first,f,second,s){

              var newClassDataList;
              if(type == 'col1'){
                newClassDataList= _.clone( this.colData.col1);
              }else if(type == 'col2'){
                newClassDataList= _.clone( this.colData.col2);
              }else{
                newClassDataList= _.clone( this.colData.col3);
              }

              newClassDataList[f].children[s].active = !newClassDataList[f].children[s].active;

              if(type == 'col1'){
                this.colData.col1 = newClassDataList;
              }else if(type == 'col2'){
                this.colData.col2 = newClassDataList;
              }else{
                this.colData.col3 = newClassDataList;
              }

            },

            showMore(type,first,f,second,s){
              var newClassDataList;
              if(type == 'col1'){
                newClassDataList= _.clone( this.colData.col1);
              }else if(type == 'col2'){
                newClassDataList= _.clone( this.colData.col2);
              }else{
                newClassDataList= _.clone( this.colData.col3);
              }

              newClassDataList[f].children[s].showMore = !newClassDataList[f].children[s].showMore;

              if(type == 'col1'){
                this.colData.col1 = newClassDataList;
              }else if(type == 'col2'){
                this.colData.col2 = newClassDataList;
              }else{
                this.colData.col3 = newClassDataList;
              }
            },
            changeFirstClassData(event){

              var value = event.target.value;
              this.firstType = value;

              this.colData.col1 = [];
              this.colData.col2 = [];
              this.colData.col3 = [];
              if(value == -1){
                //将数组分成3列
                this.subClassList.forEach((el,e) => {
                  if(el.children && el.children.length > 0){
                    el.children.forEach((second,s)=>{
                      second.active = true;
                      second.showMore = false;
                    })
                  }

                  if(e%3 == 0){
                    this.colData.col1.push(_.clone(el));
                  }else if(e%3 == 1){
                    this.colData.col2.push(_.clone(el));
                  }else{
                    this.colData.col3.push(_.clone(el));
                  }
                });
              }else{
                this.subClassList.forEach((res)=>{
                  if(res.children && res.children.length > 0){
                    res.children.forEach((second,s)=>{
                      second.active = true;
                      second.showMore = false;
                    })
                  }
                  if(res.gc_id == this.firstType){
                    this.colData.col1.push(res);
                  }
                })
              }
            },

            showModal(first,f,second,s,third,t){

              this.sessionModal = _.clone(third);

              this.nameEmpty = false;
              this.nameTestError = false;

              this.curFirst = first;
              this.firstIndex = f;
              this.secondIndex = s;
              this.thirdIndex = t;
              this.curSecond = second;
              this.curThird = third;
              if(!this.curThird.gc_name){
                this.curThird.gc_name = ''
              }
              if(!this.curThird.gc_id){
                this.curThird.gc_id = 0;
              }
              // this.curClass = _.clone(second);
              this.dialogVisible = true;
            },

            submitModify(){
              this.nameEmpty = false;
              if(this.curThird != null && this.curThird.gc_name == ''){
                this.nameEmpty = true;
                return
              }

              if(this.curThird != null && this.curThird.gc_name != '' && this.curThird.gc_name.length > 8){
                this.curThird = _.clone(this.curThird);
                return
              }

              // var _reg = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].·<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
              var  _reg1 =  new RegExp("^[\u4e00-\u9fa5_a-zA-Z0-9]+$");
              if(_reg1.test(this.curThird.gc_name)){

              }else{
                  this.nameTestError = true;
                  return;
              }

              var data = {
                gc_parent_id:this.curSecond.gc_id,
                gc_name:this.curThird.gc_name,
                goods_class_t_id:0
              }

              if(this.curThird.gc_id && this.curThird.gc_id != 0){
                data.goods_class_t_id = this.curThird.gc_id
              }

              this.classEdit(data).then((res)=>{
                if(res.resultCode==1){
                    this.dialogVisible = false;
                    if(data.goods_class_t_id == 0){
                        util.msg('新增成功');
                    }else{
                        util.msg('编辑成功');
                    }
                    this.getSubClassListData(0);
                    this.sessionModal = this.curThird;
                }else{
                    util.msg(res.shortMessage);
                }
              })
            },

            closeModal(){
              this.dialogVisible = false;
              // this.firstClassList[this.firstIndex].children[this.secondIndex].children[this.thirdIndex]

              // var newSecond = _.clone(this.firstClassList[this.firstIndex].children[this.secondIndex]);
              // newSecond.children[this.thirdIndex] = this.sessionModal;

              // var newFirst = _.clone(this.firstClassList[this.firstIndex]);
              // newFirst.children[this.secondIndex] = newSecond;
              // var newClassList = _.clone(this.firstClassList);
              // newClassList[this.firstIndex] = newFirst;
              // this.firstClassList = newClassList;
              this.initData();
            },

            deleteSure(){
              this.deleteDialogVisible = false
              var data = {
                goods_class_t_id:this.curThird.gc_id
              }
              this.dropClass(data).then((res)=>{
                if(res.resultCode == 1){
                  util.msg('删除成功')
                }else{
                  if(res.resultCode == 10040){
                    util.msg('该分类下有商品，无法删除')
                  }else{
                    util.msg(res.longMessage)
                  }
                }
                this.getSubClassListData(0);
              })
            },

            deleteCancle(){
              this.deleteDialogVisible = false;
            }
        },



        watch:{
          },

        mounted(){
          var _self = this;
          _self.initData();
          //body绑定键盘enter搜索事件
          _self.bodyListener = (e) => {
            if (e.keyCode === 13){
              if(_self.dialogVisible){
                //新增/编辑三级分类
                _self.submitModify();
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
