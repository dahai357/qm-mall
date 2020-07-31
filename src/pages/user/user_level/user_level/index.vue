<style scoped>
  .tip-doubt-word .tip-doubt-con .tip-txt {
    padding: 5px 10px;
    display: inline-block;
    position: relative;
    border-radius: 5px;
    background: #fff;
    border: 1px solid #0093fa;
  }
  .td-lt {
    text-decoration: line-through;
  }
  .info-box .pic {
    padding-right: 15px;
    position: relative;
  }
  .info-box .detail {
    word-break: break-all;
  }
  .info-box .pic, .info-box .detail {
    display: table-cell;
    vertical-align: top;
  }
  .handle p{
    display: inline-block;
  }
  th,td{
    text-align:center;
    vertical-align: middle;
  }
   .show-color{
    width:60px;
    height: 35px;
    border-radius:5px;
    display: inline-block;
  }
  #chart_level{
    width: 100%;
    height: 320px;
  }
  .table-div{
    width:930px;
    border-bottom: 1px solid #eee;
  }
  .table-div div{
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    padding:15px 10px;
  }
  .list-summary{font-size: 0;}
  .list-summary li{ display: inline-block; padding: 0 20px; vertical-align: top; font-size: 14px;}
  .list-summary .num{ font-size: 26px; margin-top: 5px;}
  .list-summary .name{ color:#757575;}
  .list-summary .count{ margin-top: 10px;}
  .list-summary .tip-doubt{ margin-bottom: 3px;}
.ncsc-btn{
  line-height:28px;
}
</style>
<template>
  <div class="qm-store-class-base">
    <div id="chart_level"></div>
    <p class="c-orange fs14 mb10">友情提示：列表支持拖动改变VIP等级</p>
    <qm-table :pageParams="pageParams">
      <template slot="table">
        <table class="ncsc-table">
            <tr>
              <th width="100px">会员等级</th>
              <th width="100px">名称</th>
              <th width="100px">会员权益</th>
              <th width="100px">背景颜色</th>
              <th width="100px">添加时间</th>
              <th width="100px">最后编辑时间</th>
              <th width="200px">操作</th>
            </tr>
        </table>
          <draggable v-model="list" v-bind="dragOptions" draggable=".draggable" ghost-class="ghost" @change="itemDraggable()">
            <div class="table-div draggable" v-for="(item,i) in list">
              <div style="width:115px">
                <span :class="item.update_time?'c-orange':'c-gray'">VIP{{item.level_num}}</span>
              </div>
              <div style="width:112px">
                <span v-if="item.level_name">{{item.level_name}}</span>
                <span v-else>-</span>
              </div>
              <div style="width:111px">
                <span v-if="item.vip_text" v-html="item.vip_text"></span>
                <span v-else>
                  <span v-if="item.add_time">无</span>
                  <span v-else>-</span>
                </span>
              </div>
              <div style="width:111px">
                <div v-if="item.level_color" :style="getCssStyle(item.level_color)" class="show-color"></div>
                <span v-else>-</span></div>
              <div style="width:112px">
                <span v-if="item.add_time">{{item.add_time}}</span>
                <span v-else>-</span>
              </div>
              <div style="width:112px">
                <span v-if="item.update_time">{{item.update_time}}</span>
                <span v-else>-</span>
              </div>
              <div style="width:227px" class="handle" v-if="item.update_time">
                <p @click="goSetLevel(item.level_num)"><a class="ncsc-btn">编辑</a></p>
                <p @click="goLookMember(item.level_num)"><a class="ncsc-btn">查看会员</a></p>
                <p><a class="ncsc-btn" @click="addMember(item.level_num)">添加会员</a></p>
              </div>
              <div style="width:227px" class="handle" v-else>
                <p @click="goSetLevel(item.level_num)"><a class="ncsc-btn">配置</a></p>
              </div>
            </div>
          </draggable>
      </template>
    </qm-table>
    <el-dialog
      :visible.sync="addMemberDialog"
      width="900px"
      hieght="600px"
      :show-close="showClose"
      :lock-scroll="modalAppendToBody"
      :close-on-click-modal = "closeOnClickModal"
      customClass="new-guide new-tip"
      v-dialogDrag>
      <qm-add-member :currentLevel="currentLevelNum" @hideNewAddMember="hideNewAddMember($event)" v-if="addMemberDialog"></qm-add-member>
    </el-dialog>
  </div>
</template>

<script>
  import 'viewerjs/dist/viewer.css'
  import {mapGetters,mapActions} from 'vuex'
  import QmPagination from 'component/qm-pagination/index'
  import QmTable from 'component/qm-table/index';
  import QmTips from 'component/qm-tips/index';
  import draggable from 'vuedraggable';
  import storage from 'lib/utils/storage';
  import echarts from 'echarts';
  import util from 'lib/utils/util';
  import QmAddMember from 'component/qm-add-member/index';
  export default {
    name: "user_level",
    data() {
      return {
        pageParams:{
          total:10
        },
        list:[],
        colorList:[],
        levelList:[],
        myChart:'',
        myChartOption:'',
        xdata:[],
        ydata:[],
        addMemberDialog:false,
        currentLevelNum:'',
      }
    },

    computed:{
      dragOptions() {
        return {
          animation: 200,
          disabled: false,
        };
      }
    },

    components:{
      QmPagination,
      QmTips,
      QmTable,
      draggable,
      storage,
      echarts,
      QmAddMember
    },

    methods: {
      ...mapActions({
        getLevel: 'getLevel',
        getLevelColor:'getLevelColor',
        hasLevelMember:'hasLevelMember',
        setLevelNum:'setLevelNum',
      }),
      itemDraggable(event){
        layer.load();
        this.setLevelNum({list:this.list}).then((res) => {
          if(res.resultCode == 1){
            this.getPageData();
          }
        })
      },
      getPageData(){
        this.getLevel().then((res) => {
          this.list = res.responseContent.list;
          this.levelList = res.responseContent.levelList;
          this.xdata = [];
          this.ydata = [];
          layer.closeAll('loading');
          Object.values(this.levelList).forEach((item, i) => {
            if(item == -1){
              this.xdata.push(0);
            }else{
              this.xdata.push(item);
            }
            if(i==0){
              this.ydata.push('未归属等级');
            }else{
              if(item == -1){
                //未配置等级
                this.ydata.push('VIP'+i+' 未配置');
              }else{
                this.ydata.push('VIP'+i);
              }
            }
          })
          this.myChart = echarts.init(document.getElementById('chart_level'));
          this.myChartOption = {
            title:{
              text:'各等级会员分布情况',
              textStyle:{
                color:'#212121',//颜色
                fontSize:14, //大小
                fontWeight:'normal',
                align:'center'//水平对齐
              },
            },
            width:800,
            height:200,
            grid:{
              left:70
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: this.ydata.map(function (str) {
                return str.replace(' ', '\n\n')})
            },
            yAxis: {
              type: 'value'
            },
            series: [{
              data: this.xdata,
              type: 'line',
              itemStyle : {
                normal: {
                  label :
                    {
                      color:'#000',
                      show: true
                    },
                  lineStyle:{
                    color:'#ff8519' //改变折线颜色
                  }
                }
              },
            }]
          };
          if (this.myChartOption && typeof this.myChartOption === "object") {
            this.myChart.setOption(this.myChartOption, true);
          }
        })
      },
      goSetLevel(num){
        this.$router.push('/user/user_level/set_level/'+num);
      },
      goLookMember(num){
        this.hasLevelMember({levelNum:num}).then((res) => {
          if(res.resultCode == 1){
            if(res.responseContent.total > 0){
              this.$router.push('/user/user_level/look_member/'+num);
            }else{
              util.msg('该等级下暂无会员');
            }
          }
        })
        return;

      },
      doRouter(url){
        this.$router.push(url);
      },
      getCssStyle(color_id){
        return 'background-color:'+this.colorList[color_id];
      },
      addMember(levelNum){
        this.currentLevelNum = levelNum;
        this.addMemberDialog = true;
      },
      hideNewAddMember(){
        this.getPageData();
        this.addMemberDialog = false;
      },
    },
    watch:{
      addMemberDialog(){
          var dragDom = document.querySelectorAll(".el-dialog");
          dragDom.forEach((el)=>{
              console.log(el)
              el.style.left = 0;
              el.style.top =0

          })
      }
    },
    mounted () {
      var _self = this;
      this.getPageData();
      this.getLevelColor({allColor:1}).then((res) => {
        if(res.resultCode == 1){
          this.colorList = res.responseContent.list;
        }
      })
    },
  }
</script>
