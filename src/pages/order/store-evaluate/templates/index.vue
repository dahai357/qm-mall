<style scoped>
  .ncsc-table .handle p {
    margin: 8px -5px 0;
  }

  textarea, .textarea{
    padding:5px 10px;
  }
</style>
<template>
  <div class="qm-store-class-base">
    <qm-table :pageParams="pageParams">
      <template slot="table">
        <table class="ncsc-table mt20" v-show="pageParams.total > 0">
          <thead>
          <tr>
            <th class="w180">模板标题</th>
            <th class="w400">模板内容</th>
            <th class="w300">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,i) in list">
            <td>{{item.evaluate_templates_title}}</td>
            <td>{{item.evaluate_templates_name}}</td>
            <td class="handle">
              <p><a @click="modifyTemplate(item)" href="javascript:;" class="ncsc-btn">编辑模板</a></p>
              <p><a @click="dropTemplate(item)" href="javascript:;" class="ncsc-btn">删除模板</a></p>
            </td>
          </tr>
          </tbody>
        </table>
      </template>
    </qm-table>
    <qm-dialog :dialogVisible="templateDialog" :width="'550px'" @close="closeDialog()">
      <template slot="title"><template v-if="subData.template_id > 0">编辑</template><template v-else>新增</template>评价模板</template>
      <template slot="content" >
        <div class="dialog_content">
          <div class="eject_con explain_form" xmlns="http://www.w3.org/1999/html">

            <div>
              <dl>
                <dt><i class="required">*</i>模板标题：</dt>
                <dd><input type="text" maxlength="10" class="w300" name="evaluate_templates_title" v-model="subData.template_title"></dd>
              </dl>
              <dl>
                <dt><i class="required">*</i>模板内容：</dt>
                <dd>
                  <textarea name="evaluate_templates_name" maxlength="200" cols="30" rows="3" class="w300" v-model="subData.template_name"></textarea>
                </dd>
              </dl>
            </div>
            <div class="bottom">
              <input type="button" id="submit" value="确定" class="ncsc-btn ncsc-btn-orange fr" @click="updateTemplate">
              <div class="clear"></div>
            </div>
          </div>
        </div>
      </template>
    </qm-dialog>
    <qm-tips :tipsVisible="confirmDialog" :width="'420px'" @update:tipsVisible="confirmDialog = $event" @close="closeConfirmDialog()" @confirm="confirmDrop()">
      <template slot="title">提示信息</template>
      <template slot="content">确认删除这个评价模板吗？</template>
    </qm-tips>
    <qm-pagination :pageParams="pageParams" @changeIndex="changeIndex($event)"></qm-pagination>
  </div>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex'
  import QmPagination from 'component/qm-pagination/index'
  import QmDialog from 'component/qm-dialog/index';
  import QmTips from 'component/qm-tips/index';
  import QmTable from 'component/qm-table/index';
  import util from 'lib/utils/util'
  import {storeEvaluate} from 'api'
  export default {
    name: "store-evaluate-templates",
    data() {
      return {
        bodyListener:'',
        pageParams:{
          goods_name:'',
          member_name:'',
          evaluate_type:0,
          pageIndex:0,
          pageSize:10,
          total:0
        },
        list:[],
        subData:{
          template_id:0,
          template_title:'',
          template_name:''
        },
        confirmDialog:false,
        dropItem:0
      }
    },

    computed:{
      ...mapGetters({
        templateDialog:'getTemplateDialog',
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
        storeEvaluate.templatesList(data).then((res)=>{
          this.list = res.list;
          var newPageParams = _.clone(this.pageParams)
          newPageParams.total = res.total;
          this.pageParams = newPageParams;
        })
      },
      closeDialog(){
        this.subData.template_id = 0
        this.subData.template_title = ""
        this.subData.template_name = ""
        this.$store.commit('setTemplateDialog',false)
      },
      changeIndex(index){
        this.pageParams.pageIndex = index;
        this.getPageData(this.pageParams);
      },
      modifyTemplate(item){
        this.subData.template_id = item.evaluate_templates_id
        this.subData.template_name = item.evaluate_templates_name
        this.subData.template_title = item.evaluate_templates_title
        this.$store.commit('setTemplateDialog',true)
      },
      updateTemplate(){
        if(this.subData.template_title === ''){
          layer.msg('模板标题不能为空');
          return;
        }
        if(this.subData.template_name === ''){
          layer.msg('模板内容不能为空');
          return;
        }
        var data = {
          template_id:this.subData.template_id,
          template_title:this.subData.template_title,
          template_name:this.subData.template_name,
        }
        storeEvaluate.updateTemplate(data).then((res)=>{
          this.closeDialog()
          this.pageParams.pageIndex = 0;
          this.getPageData(this.pageParams);
        })
      },
      dropTemplate(item){
        this.dropItem = item.evaluate_templates_id
        this.confirmDialog = true

      },
      closeConfirmDialog(){
        this.confirmDialog = false
      },
      confirmDrop(){
        var data = {
          template_id:this.dropItem
        }
        storeEvaluate.dropTemplate(data).then((res)=>{
          this.closeConfirmDialog()
          this.pageParams.pageIndex = 0;
          this.getPageData(this.pageParams);
        })
      }
    },
    watch:{
      list(){
        if(this.list.length == 0 && this.pageParams.pageIndex > 0){
          this.pageParams.pageIndex -= 1;
          this.getPageData(this.pageParams);
        }
      }
    },
    mounted () {
      var _self = this;
      _self.getPageData(_self.pageParams);
      layui.use('layer', function(){
        _self.layer = layui.layer;
      });
      //body绑定键盘enter搜索事件
      _self.bodyListener = (e) => {
        if (e.keyCode === 13){
          if(_self.templateDialog){
            //新增评价模板弹窗
            _self.updateTemplate();
          }else if(_self.confirmDialog){
            //删除评价模板
            _self.confirmDrop();
          }
        }
      }
      document.body.addEventListener('keyup', _self.bodyListener, false);
    },
    updated(){
    }
  }
</script>
