import QmTabs from 'component/qm-tabs/index';
import {mapMutations, mapGetters, mapActions} from 'vuex';
import * as _ from "lodash";

    export default {
        name: "store-order",
        data(){
          return{
                tabs:{},
            pageParams:{
              shipping_type:'-1',//订单类型：-1所有类型，1配送订单，2自提订单
              order_state:'-1',//订单状态：-1所有状态，0待付款，1待接单，2待发货，3待到店自提，4配送中，5已送达，6待确认收货，7取消待确认，8取消待确认打款，9已取消，10已关闭
              order_sn:'',
              or_com_type:'-1',//打印状态,-1所有状态，0未打印，1已打印
              date_type:0,//时间类型：0下单时间，1收款时间，2发货时间，3取消/关闭时间，4完成时间
              query_start_date:'',
              query_end_date:'',
              pay_type:'-1',//支付方式：-1所有支付方式，0线上支付，1线下支付，2货到付款
              pay_channel:'-1',//支付渠道，-1所有支付渠道，0微信支付，1支付宝支付，2微信小程序支付
              key_type:'0',//关键词类型：0取件码，1订单编码，2收货人电话，3收货人姓名，4买家手机号，5买家昵称，6发货单号
              keyword:'',
              delivery_type:'-1',//配送方式：-1所有配送方式，0自主配送，1达达配送，2快递配送
              has_coupon:'-1',// 优惠券情况:-1全部，0没有使用优惠券，1有使用优惠券

              skip_off:0,
              only_cancel:0,
              state_type:"all",

              pageIndex:0,
              pageSize:15,
              total:0
            },
          }
        },
        components: {
          QmTabs,
        },
        computed:{
          ...mapGetters({
            getSideMenuOrderClick:"getSideMenuOrderClick",
            getOrderTips:"getOrderTips"
          }),
          ...mapGetters({
              baseConfig:'getBaseConfig',
          })
        },
        methods:{
          ...mapMutations('storeOrder',{
            setState_type:'setState_type'
          }),
          ...mapActions('storeOrder',{
            getList:'getList',
            getDadaShop:'getDadaShop'
          }),
          routerData(data){
            this.setState_type(data.key);
          },
          goHelpCenter(){
            // this.$router.push('/help_center/detail/'+this.baseConfig.helpPrintId);
            let routeData = this.$router.resolve({
                  path: '/help_center/detail/'+this.baseConfig.helpPrintId
              });
              window.open(routeData.href, '_blank');
          }
        },
      mounted() {
        this.getDadaShop().then((res)=> {
          if (res.resultCode == 1) {
            this.dada_shop = res.responseContent.dada_shop;
            if (res.responseContent.cityName) {
              this.tabs = {
                index:{name:'所有订单',select:true,act:'index',},
                state_new:{name:'待付款',select:false,act:'state_new',reddot:this.getOrderTips.state_new},
                state_wait:{name:'待接单',select:false,act:'state_wait',reddot:this.getOrderTips.wait_count},
                state_deal:{name:'发货处理',select:false,act:'state_deal',reddot:this.getOrderTips.deal_count},
                state_cancel_wait_confirm:{name:'取消待确认',select:false,act:'state_cancel_wait_confirm',reddot:this.getOrderTips.cancel_wait_count},
                state_receive_money:{name:'待收款',select:false,act:'state_receive_money',reddot:this.getOrderTips.receive_money_count},
                state_make_money:{name:'待打款',select:false,act:'state_make_money',reddot:this.getOrderTips.make_money_count},
                dada:{name:'达达配送',select:false,act:'dada',hidden:true},
                /*state_new:{name:'待付款',select:false,act:'state_new'},
                state_distribution:{name:'待配送',select:false,act:'state_distribution'},
                dada:{name:'达达配送',select:false,act:'dada'},
                state_selflifting:{name:'待自提',select:false,act:'state_selflifting'},
                wait_cancel:{name:'取消待确认',select:false,act:'wait_cancel'},
                make_already_transfer:{name:'待确认打款',select:false,act:'make_already_transfer'},
                state_success:{name:'已完成',select:false,act:'state_success'},*/
              }
            }else{
              this.tabs = {
                index:{name:'所有订单',select:true,act:'index'},
                state_new:{name:'待付款',select:false,act:'state_new',reddot:this.getOrderTips.state_new},
                state_wait:{name:'待接单',select:false,act:'state_wait',reddot:this.getOrderTips.wait_count},
                state_deal:{name:'发货处理',select:false,act:'state_deal',reddot:this.getOrderTips.deal_count},
                state_cancel_wait_confirm:{name:'取消待确认',select:false,act:'state_cancel_wait_confirm',reddot:this.getOrderTips.cancel_wait_count},
                state_receive_money:{name:'待收款',select:false,act:'state_receive_money',reddot:this.getOrderTips.receive_money_count},
                state_make_money:{name:'待打款',select:false,act:'state_make_money',reddot:this.getOrderTips.make_money_count},
                dada:{name:'达达配送',select:false,act:'dada',hidden:true},
         /*       state_new:{name:'待付款',select:false,act:'state_new'},
                state_distribution:{name:'待配送',select:false,act:'state_distribution'},
                dada:{name:'达达配送',select:false,act:'dada',hidden:true},
                state_selflifting:{name:'待自提',select:false,act:'state_selflifting'},
                wait_cancel:{name:'取消待确认',select:false,act:'wait_cancel'},
                make_already_transfer:{name:'待确认打款',select:false,act:'make_already_transfer'},
                state_success:{name:'已完成',select:false,act:'state_success'},*/
              }
            }
            var params = this.$route.params;
            var pstate_type = params.state_type;
            var newTabs = _.clone(this.tabs);
            for (const key in newTabs) {
              const element = newTabs[key];
              element.select = false;
              if(key == pstate_type){
                element.select = true;
              }
            }
            this.tabs = newTabs;
          }
        });
      },

      watch:{
        getOrderTips:function(){
          if(Object.keys(this.tabs).length > 0){
            let _tabs = _.clone(this.tabs);
            _tabs.state_new.reddot = this.getOrderTips.state_new;
            _tabs.state_wait.reddot = this.getOrderTips.wait_count
            _tabs.state_deal.reddot = this.getOrderTips.deal_count
            _tabs.state_cancel_wait_confirm.reddot = this.getOrderTips.cancel_wait_count
            _tabs.state_receive_money.reddot = this.getOrderTips.receive_money_count
            _tabs.state_make_money.reddot = this.getOrderTips.make_money_count
            //_tabs.self_mention_wait_count.reddot = this.getOrderTips.self_mention_wait_count
            this.tabs = _tabs
          }
        },
        getSideMenuOrderClick:function(){

          this.getDadaShop().then((res)=>{
            if(res.resultCode == 1){

              this.dada_shop = res.responseContent.dada_shop;
              if(res.responseContent.cityName){
                this.tabs = {
                  index:{name:'所有订单',select:true,act:'index'},
                  state_new:{name:'待付款',select:false,act:'state_new',reddot:this.getOrderTips.state_new},
                  state_wait:{name:'待接单',select:false,act:'state_wait',reddot:this.getOrderTips.wait_count},
                  state_deal:{name:'发货处理',select:false,act:'state_deal',reddot:this.getOrderTips.deal_count},
                  state_cancel_wait_confirm:{name:'取消待确认',select:false,act:'state_cancel_wait_confirm',reddot:this.getOrderTips.cancel_wait_count},
                  state_receive_money:{name:'待收款',select:false,act:'state_receive_money',reddot:this.getOrderTips.receive_money_count},
                  state_make_money:{name:'待打款',select:false,act:'state_make_money',reddot:this.getOrderTips.make_money_count},
                  dada:{name:'达达配送',select:false,act:'dada',hidden:true},
         /*         state_new:{name:'待付款',select:false,act:'state_new'},
                  state_distribution:{name:'待配送',select:false,act:'state_distribution'},
                  dada:{name:'达达配送',select:false,act:'dada'},
                  state_selflifting:{name:'待自提',select:false,act:'state_selflifting'},
                  wait_cancel:{name:'取消待确认',select:false,act:'wait_cancel'},
                  make_already_transfer:{name:'待确认打款',select:false,act:'make_already_transfer'},
                  state_success:{name:'已完成',select:false,act:'state_success'},*/
                }
                this.routerData("index");
                document.body.scrollTop = 0 ;
              }else{
                this.tabs = {
                  index:{name:'所有订单',select:true,act:'index'},
                  state_new:{name:'待付款',select:false,act:'state_new',reddot:this.getOrderTips.state_new},
                  state_wait:{name:'待接单',select:false,act:'state_wait',reddot:this.getOrderTips.wait_count},
                  state_deal:{name:'发货处理',select:false,act:'state_deal',reddot:this.getOrderTips.deal_count},
                  state_cancel_wait_confirm:{name:'取消待确认',select:false,act:'state_cancel_wait_confirm',reddot:this.getOrderTips.cancel_wait_count},
                  state_receive_money:{name:'待收款',select:false,act:'state_receive_money',reddot:this.getOrderTips.receive_money_count},
                  state_make_money:{name:'待打款',select:false,act:'state_make_money',reddot:this.getOrderTips.make_money_count},
                  dada:{name:'达达配送',select:false,act:'dada',hidden:true},
                 /* state_new:{name:'待付款',select:false,act:'state_new'},
                  state_distribution:{name:'待配送',select:false,act:'state_distribution'},
                  dada:{name:'达达配送',select:false,act:'dada',hidden:true},
                  state_selflifting:{name:'待自提',select:false,act:'state_selflifting'},
                  wait_cancel:{name:'取消待确认',select:false,act:'wait_cancel'},
                  make_already_transfer:{name:'待确认打款',select:false,act:'make_already_transfer'},
                  state_success:{name:'已完成',select:false,act:'state_success'},*/
                }
                this.routerData("index");
                document.body.scrollTop = 0 ;
              }
            }

          })

        }
      }
    }
