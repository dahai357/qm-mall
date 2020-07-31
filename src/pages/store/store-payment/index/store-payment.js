
import {mapGetters,mapActions} from 'vuex';
import QmTabs from 'component/qm-tabs/index';

export default {
    name: "store-payment",
    data (){
        return {
            tabs:{
                wxpay:{name:'线上支付管理',select:true,act:'wxpay'},
            },

            btnClick:{
                
            }
        }
    },
        components: {
            QmTabs
        },

        computed:{

          },

        methods:{
            ...mapActions({
              }),


              routerData(data){
                this.url = data.key;
                var url = '/store/store_payment/'+data.key
                this.$router.push(url);
              },


        },

        watch:{

    
          },

          mounted(){

          }
}