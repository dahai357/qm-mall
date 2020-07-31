<style scoped>
  .ncsc-table{
    table-layout: fixed;
  }
    .ncsc-table td {
        border-bottom: 1px solid #eee;
        padding: 20px 10px;
    }
    .link{
        text-decoration: underline;
        cursor: pointer;
    }
    .add-on{
        vertical-align: middle;
    }
    .act-message p{
        margin-bottom: 5px;
        line-height: 22px;
    }
</style>
<template>
    <div class="qm-store-class-base">
        <div class="search-form">
            <p  class="c-gray mb10">推送内容经平台审核通过后，将通过APP自动发送给店铺粉丝，可用于活动通知推广。审核时限为1个工作日，如遇法定节假日顺延</p>
            <div>
                <p class="lightBlue" @click="messageDialog = true" style="cursor: pointer">
                    <i class="fa fa-question-circle" aria-hidden="true" ></i>群发消息需知
                </p>
            </div>
            <select @change="search()" name="type" class="mt20 mb20" v-model="pageParams.auditType">
                <template v-for="(first,f) in auditType">
                    <option v-if="first == pageParams.auditType" :value="f" :key="f" selected>{{first}}</option>
                    <option v-else :value="f" :key="f" selected>{{first}}</option>
                </template>
            </select>
            <span class="ncsc-form-tit">创建时间：</span>
            <input type="text" class="input-add-on w100" name="create_start_date" id="create_start_date"
                   :value="pageParams.create_start_date" readonly="readonly">
            <label class="add-on"><i class="fa fa-calendar" aria-hidden="true"></i></label>
            <span class="ncsc-sep">-</span>
            <input id="create_end_date" class="input-add-on w100" type="text" name="create_end_date"
                   :value="pageParams.create_end_date" readonly="readonly">
            <label class="add-on"><i class="fa fa-calendar" aria-hidden="true"></i></label>
            <span class="ncsc-form-tit">审核时间：</span>
            <input type="text" class="input-add-on w100" name="audit_start_date" id="audit_start_date" :value="pageParams.audit_start_date" readonly="readonly">
            <label class="add-on"><i class="fa fa-calendar" aria-hidden="true"></i></label>
            <span class="ncsc-sep">-</span>
            <input id="audit_end_date" class="input-add-on w100" type="text" name="audit_end_date" :value="pageParams.audit_end_date" readonly="readonly">
            <label class="add-on"><i class="fa fa-calendar" aria-hidden="true"></i></label>
            <input type="submit" class="ncsc-btn" value="搜索" @click="search()">
        </div>
        <qm-table :pageParams="pageParams">
            <template slot="table">
                <table class="ncsc-table mt20">
                    <thead>
                    <tr>
                        <th class="w200">标题内容</th>
                        <th class="w200">跳转链接</th>
                        <th class="w150 tc">创建时间</th>
                        <th class="w100">审核状态</th>
                        <th class="w100 tc">审核时间</th>
                        <th class="w100">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,i) in act_list">
                        <td>{{item.act_title}}</td>
                        <td>
                            <p>{{item.skip_link_des}}</p>
                            <template v-if="item.name">
                                <p v-if="item.skip_link == 2" class="c-blue link" @click="goodsDetail(item)">{{item.name}}</p>
                                <p v-else class="c-blue">{{item.name}}</p>
                            </template>
                        </td>
                        <td>
                            <p class="tc">{{item.gmt_create_date}}</p>
                            <p class="tc">{{item.gmt_create_time}}</p>
                        </td>
                        <td>
                          {{item.audit_state_des}}
                          <el-tooltip placement="right-start" effect="light" popper-class="atooltip" class="mt3" v-if="item.audit_state == 3">
                            <div slot="content" class="toolTipCont">
                              <p>
                                {{item.audit_remark}}
                              </p>
                            </div>
                            <p class="lightBlue">
                              <i class="fa fa-question-circle" aria-hidden="true"></i>原因
                            </p>
                          </el-tooltip>
                        </td>
                        <td>
                            <p class="tc">{{item.gmt_audit_date}}</p>
                            <p v-show="item.gmt_audit_time" class="tc">{{item.gmt_audit_time}}</p>
                        </td>
                        <td class="handle">
                            <p v-if="item.audit_state != 2"><a @click="delOne(item)" class="ncsc-btn">删除</a></p>
                            <p v-if="item.audit_state != 2"><a @click="edit(item)" class="ncsc-btn">编辑</a></p>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </template>
        </qm-table>
        <qm-pagination :pageParams="pageParams" @changeIndex="changeIndex($event)"></qm-pagination>
        <qm-tips :tipsVisible="delDialog" :width="'420px'" @update:tipsVisible="delDialog = $event"
                 @close="delDialog = false" @confirm="confirmDel()">
            <template slot="title">提示信息</template>
            <template slot="content">{{delTips}}</template>
        </qm-tips>
        <qm-dialog :dialogVisible="messageDialog" :width="'600px'" @close="closeMessageDialog" :customClass="'phone-bind'">
            <template slot="title">群发消息需知</template>
            <template slot="content" >
                <div class="dialog_content">
                    <div class="c-blue">一、【内容发布守则】 </div>
                    <div class="ml20 act-message">
                        <p>1.不得发布危害信息，包括但不限于敏感信息、垃圾广告、淫秽色情信息。不得以任何方式利用【我的身边店】平台直接或间接发布违反中华人民共和国法律以及社会公德的内容。</p>
                        <p>2.不得发布与【我的身边店】平台无关的广告。</p>
                        <p>3.不得伪造活动等虚假信息，如捏造细节、图文不符、夸大事实、不实宣传、虚假中奖信息。</p>
                    </div>
                    <div class="c-blue">二、【用户行为规范】</div>
                    <div class="ml20 act-message">
                        <p>1.不得扰乱平台秩序，如进行造假、提供虚假信息等。</p>
                        <p>2.不得违规推广，如推广的商品涉嫌出售假冒商品、违反【我的身边店】平台相关规则等等。</p>
                        <p>3.您的行为若违反国家法律和法规，构成犯罪，将被追究刑事责任，由您承担全部法律责任。【我的身边店】平台不承担任何相关或连带责任</p>
                    </div>
                </div>
                <div class="tc"><input type="button"  value="我知道了" class="ncsc-btn ncsc-btn-orange w300 mt10"  @click="closeMessageDialog"></div>
            </template>
        </qm-dialog>
    </div>
</template>
<script>
  import 'viewerjs/dist/viewer.css'
  import {mapGetters, mapActions} from 'vuex'
  import QmPagination from 'component/qm-pagination/index'
  import QmDialog from 'component/qm-dialog/index';
  import QmTable from 'component/qm-table/index';
  import QmTips from 'component/qm-tips/index';
  import storage from 'lib/utils/storage';
  import {actPush} from 'api';
  import util from 'lib/utils/util';

  export default {
    name: "act-push-index",
    data() {
      return {
        bodyListener:'',
        nextFun:'',
        messageDialog:false,
        pageParams: {
          pageIndex: 0,
          pageSize: 10,
          total: 0,
          auditType: 0,
          create_start_date:'',
          create_end_date:'',
          audit_start_date:'',
          audit_end_date:'',
          id:0
        },
        list:[],
        act_list: [],
        delDialog: false,
        delTips: '确定删除吗？',
        auditType: {
          0: '审核状态',
          1: '待审核',
          2: '审核通过',
          3: '审核不通过',
        }
      }
    },

    computed: {},

    components: {
      QmPagination,
      QmDialog,
      QmTips,
      QmTable
    },

    methods: {
      goodsDetail(item) {
        storage.set('goods_route_name',this.$route.name);
        this.$router.push({name:'store_goods_add_step_two',params:{commonId:item.link_id}})
      },
      async getPageData(data) {
        actPush.getActPushList(this.pageParams).then(res=>{
            this.act_list = res.list;
            if(parseInt(this.pageParams.auditType) === 0 && this.pageParams.create_start_date === '' && this.pageParams.create_end_date === '' && this.pageParams.audit_start_date === '' && this.pageParams.audit_end_date === '') {
              this.list = this.act_list;
            }
            var newPageParams = _.clone(this.pageParams)
            newPageParams.total = res.total;
            this.pageParams = newPageParams;
        })
      },
      search() {
        $('select').blur();
        this.pageParams.pageIndex = 0;
        this.getPageData(this.pageParams);
      },
      changeIndex(index) {
        this.pageParams.pageIndex = index;
        this.getPageData(this.pageParams);
      },
      delOne(item) {
        this.pageParams.id = item.id
        this.delTips = '确定删除吗？'
        this.delDialog = true
      },
      edit(item) {
        storage.set('id', item.id);
        this.$router.push("/promotion/act_push/add")
      },
      confirmDel() {
        var data = {
          id: this.pageParams.id
        }
        actPush.delActPush(data).then((res) => {
          util.msg(res.shortMessage);
          if(res.resultCode === 1) {
            this.delDialog = false;
            this.getPageData(this.pageParams);
          }
        })
      },
      closeMessageDialog() {
        this.messageDialog = false;
        let nextFun = this.nextFun;
        if(nextFun) {
          this.nextFun = '';
          nextFun();
        }
      }
    },
    watch: {},
    mounted() {
      var _self = this;
      layui.use('laydate', function () {
        var laydate = layui.laydate;
        laydate.render({
          elem: '#create_start_date',
          theme: "#ff8519",
          done: function (value) {
            var newParams = _.clone(_self.pageParams);
            newParams.create_start_date = value;
            _self.pageParams = newParams;
          }
        });
        laydate.render({
          elem: '#create_end_date',
          theme: "#ff8519",
          done: function (value) {
            var newParams = _.clone(_self.pageParams);
            newParams.create_end_date = value;
            _self.pageParams = newParams;
          }
        });
        laydate.render({
          elem: '#audit_start_date',
          theme: "#ff8519",
          done: function (value) {
            var newParams = _.clone(_self.pageParams);
            newParams.audit_start_date = value;
            _self.pageParams = newParams;
          }
        });
        laydate.render({
          elem: '#audit_end_date',
          theme: "#ff8519",
          done: function (value) {
            var newParams = _.clone(_self.pageParams);
            newParams.audit_end_date = value;
            _self.pageParams = newParams;
          }
        });
      });
      this.getPageData(this.pageParams);
      layui.use('layer', function () {
        this.layer = layui.layer;
      });
      //body绑定键盘enter搜索事件
      _self.bodyListener = (e) => {
        if (e.keyCode === 13){
          _self.search();
        }
      }
      document.body.addEventListener('keyup', _self.bodyListener, false);
    },
    beforeDestroy(){
      //销毁键盘enter搜索事件
      document.body.removeEventListener('keyup', this.bodyListener);
    },
    updated() {
    },
    beforeRouteLeave (to, from, next) {
      if(to.name === 'act_push_add' && this.list.length === 0) {
        next(false);
        this.nextFun = next;
        this.messageDialog = true;
      }else{
        next()
      }

    }
  }
</script>
