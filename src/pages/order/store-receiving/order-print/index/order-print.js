import {mapGetters,mapActions} from 'vuex'
import util from 'lib/utils/util'
import * as  $ from 'jquery';
import moment from 'moment';

export default {
    name: "store-receiving-order-print",

    data(){
        return {
            order_id:0,
            order:{},
            printObj: {
                id: "printarea",
                popTitle: 'good print',
                extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>'
              },

              options:{ 
                // extraCss: window.location.origin +window.location.pathname+"static/css/print.css?v=1567656006",
                // extraCss: "http://testadmin.shenbd.com/mall/templates/default/css/print.css?v=1569393340",
                extraHead: '<meta charset="utf-8" />,<meta http-equiv="X-UA-Compatible" content="IE=edge"/>',
                mode: "iframe",
                popClose: false,
                retainAttr: ["class", "id", "style", "on"],
            },
            print: 'div.PrintArea.area1,div.PrintArea.area2,div.PrintArea.area3'
        }
    },

    computed:{
        ...mapGetters('storeReceiving',{
            state_type:'getState_type'
        }),
    },
    components:{

    },

    methods: {
        ...mapActions('storeOrder',{
            orderPrint:'orderPrint',
          }),

          init(order_id){
                this.orderPrint({order_id:order_id}).then((res)=>{
                    if(res.resultCode == 1){
                        this.order = res.responseContent;
                        var allNum = 0;
                        this.order.goods_list.forEach((goodsList,gl) => {
                            for (const key in goodsList) {
                                var goodsList2 = goodsList[key];
                                var groupNum = 0;
                                if(goodsList2.goodsCommonid == 0){
                                    if(goodsList2.goodsGroup){
                                        goodsList2.goodsGroup.forEach((goodsg,gg)=>{
                                            groupNum += goodsg.num;
                                        })
                                    }
                                    allNum += groupNum * goodsList2.goodsNum;
                                }else{
                                    allNum += goodsList2.goodsNum;
                                }
                            }
                        });

                        if(this.order && this.order.order_info && this.order.order_info.extendOrderGifts){
                            this.order.order_info.extendOrderGifts.forEach((gift,g) => {
                                    allNum += gift.goods_num;
                            });
                        }
                        this.order.allNum = allNum;
                    }
                })
          },

          getImage(){
            //   return require('../../../../../assets/seller/images/seller/style2018/logo-black.jpg')
              var url = window.location.origin + window.location.pathname + 'static/img/logo-black.jpg';
              url = url.replace("print.html","");
              return url;
          },

          printClick(){
                var url = window.location.origin +window.location.pathname;
                url = url.replace("print.html","");
                var interval = setInterval(() => {
                        if($("#printarea").html() != undefined){ 
                            if(this.state_type == 'normal'){
                                if($(".orderprint.orderprint1").html() != undefined){
                                    this.$nextTick(()=>{
                                        $('iframe').remove();  
                                        $("#printarea").printArea();
                                        // $("#printarea").printArea(this.options );
                                    });
                                    clearInterval(interval);
                                }
                            }else{
                                if($(".orderprint.orderprint2").html() != undefined){
                                    this.$nextTick(()=>{
                                        $('iframe').remove();  
                                        $("#printarea").printArea();
                                        // $("#printarea").printArea(this.options );
                                    });
                                    
                                    clearInterval(interval);
                                }
                            }
                        }
                }, 100);
          },
    },

    filters:{
        time:function(value){
            return util.dateFormat(new Date(value*1000),'HH:mm')
        },
        f2y: function (value) {
        return (value/100).toFixed(2);
        },
        substr(value){
            // return value.toString().subString(value.length - 4,value.length -1);
            return value;
        },
        date:function(value){
            if(value.length === 13){
                return moment(value).format("YYYY-MM-DD")
            }else{
                return moment(parseInt(value)*1000).format("YYYY-MM-DD")
            }
        }
    },
    

    watch:{
        state_type:function(){

            this.$nextTick(()=>{
                var url = window.location.origin +window.location.pathname;
                url = url.replace("print.html","");
                // var a = $("#style")
                // if(!a){
                    var interval = setInterval(() => {
                        if($("#printarea").html() != undefined){
                            // $("#printarea").prepend('<style id="style" type="text/css">@import url("http://testadmin.shenbd.com/mall/templates/default/css/print.css?v=1569393340") print;  @media print {.print-btn, .print-tip, .tabmenu{ display:none}.print-layout, .page-1{ max-width: none;}   .print-page{ padding:0}        @page { margin:5%;} }</style>  ')
                            if($("#printarea #style").length > 0){

                            }else{
                                // $("#printarea").prepend('<style id="style" type="text/css">@import url("'+url+'static/css/print.css?v=1567656006") print;  @media print {.print-btn, .print-tip, .tabmenu{ display:none}.print-layout, .page-1{ max-width: none;}   .print-page{ padding:0}        @page { margin:5%;} }</style>  ')
                            }
                            clearInterval(interval);
                        };
                    }, 100);
                // }else{

                // }
            })
        }
    },

    mounted () {
        var url = window.location.origin +window.location.pathname;
            url = url.replace("print.html","");
        this.$nextTick(()=>{
            var interval = setInterval(() => {
                if($("#printarea").html() != undefined){
                    
                    if($("#printarea #style").length > 0){
                    }else{
                        // @import url("'+url+'static/css/print.css?v=1567656006") print; 
                        var style = `
                        body{ background: #f5f5f5; line-height: 1.5; font-size:8pt;}
body, div, p, ul{ margin:0; padding: 0;}
a{ text-decoration: none; background-color: transparent;  -webkit-text-decoration-skip: objects}
ul{ list-style: none outside none;}

.tabmenu{width:100%; height: 40px; display: block; position: relative; z-index: 99; margin-bottom: 20px;}
.tabmenu .tab{height: 39px; border-bottom: solid 1px #eee;}
.tabmenu .tab li{ float: left; margin-right: 3px; padding-left: 20px;}
.tabmenu .tab li:first-child{padding-left: 0;}
.tabmenu .tab a, .tabmenu .tab p{font: lighter 16px/39px "microsoft yahei"; display: inline-block; height: 39px; color:#212121; padding: 0 5px;}
.tabmenu .tab a:hover{text-decoration: none; color:#ff8519}
.tabmenu .tab .active a, .tabmenu .tab .active p{display: inline-block;cursor: default; color:#ff8519; position: relative;}
.tabmenu .tab .active a:before, .tabmenu .tab .active p:before{content:''; position: absolute; left: 0; bottom: -1px; width: 100%; height: 2px; background: #ff8519;}
.tabmenu .tab .active a:hover{text-decoration: none; cursor: default;}
.tabmenu .tab .normal a{display: inline-block; padding: 0 10px;}
.tabmenu .tab .normal a:hover{text-decoration: none;}
.print-layout{ position: relative;  margin:0 auto; max-width: 210mm; background: #fff; padding: 10px 20px 30px;}
.print-btn{ width: 150px; text-align: center; color:#000; border:1px solid #b4b4b4; border-radius:1em; background: #fff;  font-size: 20px; line-height: 2; margin:30px auto 0;}
.print-btn:hover{ color: #ff8519; border-color:#ff8519; cursor: pointer;}
.print-tip{ color:#ff8519; font-size: 14px; margin-bottom: 20px;}
.print-page{ padding: 5%; box-shadow:0 0 2px rgba(0,0,0,.3); margin:0 auto;}

.orderprint {padding-top: 10px; background: #FFF; color:#000000; word-break: break-all; font-family: SimHei; font-weight: bold;}
.orderprint .top{ padding:0 2pt;}
.orderprint .top .shop-name{ font-size:16pt; padding:2pt 0;}
.buyer-info { font-size: 10pt; margin-top: 5pt; padding: 5pt 2pt;  border-top:dotted 1px #000; border-bottom:dotted 1px #000;}
.buyer-info p{ padding-bottom:3pt;}
.buyer-info .time, .buyer-info .dilivery-man{ font-size:8pt;}
.buyer-info .message{ margin-top: 2pt; padding-top:5pt; border-top:dotted 1px #000;}
table{ line-height:1.2; width:100%;}
table th, table td{ font-size:8pt; text-align: left; vertical-align: top; font-weight: normal; font-weight: bold;}
table td{ padding: 6pt 2pt;}
table th{ padding: 4pt 2pt;}
.order-info .title td{ padding-bottom: 0;}
.order-info .sum td, .order-info .attr-sum td{ padding-top: 0; white-space: nowrap;}
.order-info .title .name{ font-size:10pt}
.order-info .thead th { border-bottom: dotted 1px #000; white-space: nowrap;}
.order-info .intro{ padding-top: 3pt;}
.order-info .attr td{ padding-bottom:3pt;}
.order-info .attr-sum td{ padding-bottom:3pt;}
.order-sum{ margin-top: 3pt; border-top: dotted 1px #000;}

.list-info2{ overflow: hidden;}
.list-info2 li{ width: 33.2%; float: left; white-space: nowrap;}
.list-info2 .item2{ text-align: center;}
.list-info2 .item3{ text-align: right;}

.page-1{ max-width:58mm;}
.orderprint1 .order-info .col2{ width: 40%;}
.orderprint1 .order-info .col3{ width: 10%;}
.orderprint1 .order-info .attr td{ padding-bottom: 0; padding-top: 0;}
.orderprint1 .order-sum td{ padding-bottom: 0;}
.orderprint1 .order-sum .col1{ width: 4em;}
.orderprint1 .order-sum .col2{ white-space: nowrap;}

.orderprint2 .order-info{ table-layout: fixed}
.orderprint2 .order-info .attr td{ padding-top: 0;}
.orderprint2 .order-sum{ table-layout: fixed}
.orderprint2 .order-sum td{ width: 20%;}
.orderprint2 .time p{ display: inline-block; vertical-align: baseline;}

.page-direct{  font-size:12pt; }
.page-direct .orderprint .top .shop-name{ font-size:20pt;}
.page-direct .buyer-info { font-size: 16pt;}
.page-direct .buyer-info .time, .page-direct .buyer-info .dilivery-man{ font-size:12pt;}
.page-direct .order-info th, .page-direct  .order-info td, .page-direct  .order-info .title .name, .page-direct .order-sum td{ font-size:12pt;}
.page-direct .print-page{ box-shadow:none; padding: 0;} 
.page-direct .print-layout, .page-direct .page-1{ max-width: none;} 

                        @media print {.print-btn, .print-tip, .tabmenu{ display:none}.print-layout, .page-1{ max-width: none;}   .print-page{ padding:0}        @page { margin:5%;} }
                        ` 
                        $("#printarea").prepend('<style type="text/css">'+style+'</style>')
                        // $("#printarea").prepend('<link href="'+url+'static/css/print.css?v=1569393340" rel="stylesheet" type="text/css">')
                    }
                    clearInterval(interval);
                };
            }, 100);
            var params = this.$route.params;
            this.order_id = params.order_id;
            this.init(params.order_id)
        })
    },
}