<style scoped>
  .content{
    border-radius: 5px;
  }
  .warn{
    color:red;
    display: inline-block;
  }
  .noresult {
    height: 280px;
    text-align: center;
    line-height: 280px;
  }
  .search-result table tr.checked{
    background:#fff4e9
  }
  .w220{
    width: 220px;
  }
</style>
<style lang="scss" scoped>
  .mytree /deep/{
    .el-tree > .el-tree-node:after {
      border-top: none;
    }
    .el-tree-node {
      position: relative;
      padding-left: 10px;
    }
    //节点有间隙，隐藏掉展开按钮就好了,如果觉得空隙没事可以删掉
    .el-tree-node__expand-icon.is-leaf{
      display: none;
    }
    .el-tree-node__children {
      padding-left: 16px;
    }

    .el-tree-node :last-child:before {
      height: 38px;
    }

    .el-tree > .el-tree-node:before {
      border-left: none;
    }

    .el-tree > .el-tree-node:after {
      border-top: none;
    }

    .el-tree-node:before {
      content: "";
      left: -4px;
      position: absolute;
      right: auto;
      border-width: 1px;
    }

    .el-tree-node:after {
      content: "";
      left: -4px;
      position: absolute;
      right: auto;
      border-width: 1px;
    }

    .el-tree-node:before {
      border-left: 1px solid #b9b9b9;
      bottom: 0px;
      height: 100%;
      top: -23px;
      width: 1px;
    }

    .el-tree-node:after {
      border-top: 1px solid #b9b9b9;
      height: 20px;
      top: 15px;
      width: 20px;
    }
  }
  .btns {
    display: inline-block;
    vertical-align: bottom;
  }
</style>
<template>
  <qm-dialog :dialogVisible="true" :width="'450px'" @close="close()" :customClass="'phone-bind'">
    <template slot="title">选择分类</template>
    <template slot="content" >
      <div class="search mb20">
        <input type="text" v-model.trim="classKeyword" placeholder="支持输入二级/三级分类进行条件搜索" class= "keyword w250" />
        <div class="btns">
          <input @click="classReset()" v-show="showReset" type="button" class="ncsc-btn fr ml5" value="撤销检索" />
          <input @click="searchClass()" type="button" class="ncsc-btn ncsc-btn-orange  fr" value="搜索" />
        </div>
      </div>
      <div class="dialog_content mytree" style="min-height:200px;max-height:268px;overflow-y: auto;overflow-x: hidden">
        <el-tree
          :indent="0"
          :expand-on-click-node="false"
          :default-expanded-keys="classExpands"

          node-key="gc_id"
          :data="classList"
          :props="defaultProps"
          @node-click="handleNodeClick"
          ref="tree">
      <span class="custom-tree-node" style="height: 40px;line-height: 40px;display: inline-block;margin-left: 5px;" slot-scope="{ node, data }">
       <span>{{ node.label }}</span>
      </span>
        </el-tree>
      </div>

      <div class="bottom">
        <input type="button" value="提交" class="ncsc-btn ncsc-btn-orange fr" @click="save()">
        <div class="clear"></div>
      </div>
    </template>
  </qm-dialog>

</template>

<script>
  import * as _ from 'lodash';
  import {storeGoodsStorage} from 'api'
  import QmDialog from 'component/qm-dialog/index';

  export default {
    name: "qm-class-tree",

    data() {
      return {
        pageParams:{
          keyword:'',
          progress_state:0,
          widthOutEnd:1,
          pageIndex:0,
          pageSize:10,
          total:0
        },
        list: [],
        selectClass:{},
        classExpands:[],
        classKeyword:'',
        classList:[],
        defaultProps:{
          children: 'children',
          label:'gc_name'
        },
      }
    },
    props:{
      includeItems:{
        type:Array,
        default:()=>[]
      }
    },
    components: {
      QmDialog

    },
    methods:{
      init(){
        let data ={};
        if(this.includeItems.length>0){
          data = {
            'gc_id':this.includeItems[0].gc_id
          }
        }
        this.getAllClass(data)
      },
      save(){
        this.$emit('save',this.selectClass)
      },
      selectChange(i){
        this.reset()
        var tempList = _.clone(this.list)
        tempList[i].checked = true;
        this.curItem = tempList[i]
        this.list = tempList;
      },
      close(){
        this.$emit('close');
      },
      classReset(){
        this.classKeyword = ''
        this.showReset = false
        this.getAllClass()
      },
      searchClass(){
        let data = {
          keyword:this.classKeyword
        }
        if(this.classKeyword != ''){
          this.showReset = true
        }else{
          this.showReset = false
        }
        this.getAllClass(data)
      },
      getAllClass(data){
        storeGoodsStorage.getAllClass(data).then(res=>{
          this.classList = res.list
          this.classExpands = res.expands
          if(res.selected){
            this.selectClass = res.selected
            this.$nextTick(() => {
              this.$refs.tree.setCurrentKey(res.selected.gc_id)
            })
          }

        })
      },
      handleNodeClick(data,node,e){
        this.selectClass = {}
        if(data.level != 3){
          e.node.isCurrent = false
          return;
        }
        this.selectClass = {
          gc_id_1:node.parent.parent.data.gc_id,
          gc_id_2:node.parent.data.gc_id,
          gc_id:data.gc_id,
          is_system:data.is_system,
          gc_name:data.gc_name,
          f_gc_name:node.parent.parent.data.gc_name+'>'+node.parent.data.gc_name+'>'+data.gc_name
        }
      },
    },
    mounted() {
      var _self = this;
      _self.init();
    }
  }
</script>
