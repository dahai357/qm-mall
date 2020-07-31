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

  .dropdown{ position: relative; display: inline-block;}
  .dropdown .ncsc-btn{ border-color:#212121; font-size: 16px;}
  .dropdown .ncsc-btn:hover, .dropdown.open .ncsc-btn{ color:#fff; background: #212121;}
  .dropdown .dropdown-menu{ position: absolute;  min-width: 120px; top: 40px; right: 0; border:1px solid #b6b6b6; border-radius:5px; background: #fff;}
  .dropdown .dropdown-menu:before{ content:''; position: absolute; border:8px dashed transparent; border-bottom:8px solid #b6b6b6; right:5px; top: -16px; width:0;height:0;font-size:0; overflow:hidden;}
  .list-dropdown{ border-radius:5px; overflow:hidden;}
  .list-dropdown li{ padding:0 10px; position: relative; box-sizing: border-box; line-height: 2; border-top: 1px solid #b6b6b6; white-space: nowrap;}
  .list-dropdown li:first-child{ border:none}
  .list-dropdown li:hover{ background: #f5f5f5; cursor: pointer;}
</style>
<template>
  <div class="qm-store-class-index">
    <qm-tabs :tabs="tabs" :blod="false" class="store-tabs" :marginRight="20" @routerData="routerData($event)">
    </qm-tabs>
    <div class="menu-more">
      <a class="ncsc-btn ncsc-btn-orange" v-if="curUrl === 'index'"  @click="addBundling()">添加活动</a>
      <a class="ncsc-btn ncsc-btn-orange" v-if="curUrl === 'sale_act_add'" @click="openSalesManageDialog">销售员信息管理</a>
      <div class="dropdown" v-if="curUrl === 'salesman_list'">
        <a href="javascript:;" class="ncsc-btn dropdown-toggle" id="export_excel" @click="exportPerformance">导出Excel</a>
        <div class="dropdown-menu" v-show="dropDown">
          <ul class="list-dropdown" id="excel-type">
            <li data-type="1" @click="exportTo(1)">
              <p>导出推广销量数据</p>
            </li>
            <li data-type="2" @click="exportTo(2)">
              <p>导出销售订单明细</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="clear"></div>
    <keep-alive>
      <router-view v-if="$route.meta.saleKeepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.saleKeepAlive" />
  </div>
</template>

<script>
import {mapGetters,mapActions,mapMutations} from 'vuex'
import QmTabs from '../../../components/qm-tabs/index';
import storage from 'lib/utils/storage'
import {saleAct} from 'api'
import exportData from 'lib/utils/export';

    export default {
        name: "store-evaluate",
        data(){
          return{
                tabs:{
                  index:{name:'分销管理',select:true,act:'index'},
                  sale_act_add:{name:'添加活动',select:false,act:'sale_act_add',hidden:true},
                  salesman_list:{name:'业绩详情',select:false,act:'salesman_list',hidden:true},
                  sale_promoter_list:{name:'推广详情',select:false,act:'sale_promoter_list',hidden:true},
                  salegoods_list:{name:'销售详情',select:false,act:'salegoods_list',hidden:true},
                },
            curUrl:'',
            dropDown:false,

            href:'',
            download:'',
          }
        },
        components: {
          QmTabs,
        },
      computed:{
        ...mapGetters('saleAct',{
          canEdit:'getCanEdit',
        })
      },
        methods:{
          ...mapMutations('saleActAdd',{
            setSalesManageDialog:'setSalesManageDialog'
          }),
          ...mapActions('saleAct',{
            setEdit: 'setEdit',
          }),
          exportPerformance() {
            var keyword = storage.get('keyword');
            var remit_state = storage.get('remit_state');
            keyword = keyword ? keyword : '';
            remit_state = remit_state ? remit_state : 0;
            var data = {
              sale_act_id:storage.get('sale_act_id'),
              keyword:keyword,
              remit_state:keyword
            }
            saleAct.exportPerformance(data).then((res)=>{
              exportData.exportExcelNew(res)

            })
          },
          openSalesManageDialog() {
            this.setSalesManageDialog(true);
          },
          addBundling(){
            storage.set('sale_act_id',0)
            storage.set('sale_edit',0);
            var data = {
              key:'sale_act_add'
            }
            this.routerData(data)
          },
          back(){
            var data = {
              key:'index'
            }
            this.routerData(data)
          },
          routerData(data){
            this.curUrl = data.key
            var url = '/promotion/sale_act/'+data.key
            this.$router.push(url);
          },
          changeCur(){
            var sale_act_id = storage.get('sale_act_id')
            var sale_edit = storage.get('sale_edit')

            if(sale_act_id){
              this.tabs.sale_act_add.name = this.canEdit?(sale_edit ? '销售员管理':'编辑活动'):'查看活动'
            }else{
              this.tabs.sale_act_add.name = '添加活动'
            }
            var path = this.$route.path
            this.curUrl = path.substring(path.lastIndexOf('/') + 1);
            this.tabs.sale_promoter_list.hidden = true;
            this.tabs.salesman_list.hidden = true;
            if(this.curUrl == 'salegoods_list') {
              if(storage.get('member_id')) {
                this.tabs.sale_promoter_list.hidden = false;
                this.tabs.salegoods_list.name = '购买详情';
              }else{
                this.tabs.salegoods_list.name = '销售详情';
                this.tabs.salesman_list.hidden = false;
              }
              this.tabs.salesman_list.hidden = false;
            }else if(this.curUrl == 'sale_promoter_list') {
              this.tabs.salesman_list.hidden = false;
            }
          },
          exportTo(type){
            this.dropDown = !this.dropDown
            var _self = this;
            var data = {
              type:type,
              sale_act_id:storage.get('sale_act_id')
            }
            saleAct.exportSaleData(data).then((res)=>{
              exportData.exportExcelNew(res)
              
            })
          },
        },
      watch:{
        '$route'(newRouter){
          this.dropDown = false
          this.changeCur()
        },
        canEdit(){
          this.tabs.sale_act_add.name = this.canEdit?'编辑活动':'查看活动'
        }
      },
      mounted() {
        this.changeCur()
      },
    }
</script>

<style scoped>

</style>
