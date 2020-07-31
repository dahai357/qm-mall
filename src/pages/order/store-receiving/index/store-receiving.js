import {mapGetters,mapActions,mapMutations} from 'vuex'
import QmTabs from 'component/qm-tabs/index';

export default {
    name: "store-receiving",

    data(){
        return {
            tabs:{
                index:{name:'待接单',select:false,act:'index',hidden:true},
                order_print:{name:'小票样式',select:true,act:'order_print',hidden:true},
                order_print_a4:{name:'A4样式',select:false,act:'order_print_a4',hidden:true},
            },
        }
    },

    computed:{
        ...mapGetters('storeReceiving',{
            router_state:'getRouter_state'
          }),
          ...mapGetters({
            basicStore:'getBasicStore'
          }),
          
    },
    components:{
        QmTabs
    },

    methods: {
        ...mapMutations('storeReceiving',{
            setState_type:'setState_type'
        }),

        ...mapActions({
            getStoreSetting:'getStoreSetting',
          }),

        routerData(data){
            if(data.key == 'order_print'){
                this.setState_type("normal");
            }else{
                this.setState_type(data.key);
            }
        },
    },
    watch:{
        router_state:function(){
            this.tabs = {
                index:{name:'待接单',select:true,act:'index',hidden:true},
                order_print:{name:'小票样式',select:false,act:'order_print',hidden:true},
                order_print_a4:{name:'A4样式',select:false,act:'order_print_a4',hidden:true},
            }
        }
    },

    mounted () {
        var name = this.$router.history.current.name;
        this.getStoreSetting().then(()=>{
            if(name == 'store_order_order_print'){
                if(this.basicStore.printType == 1){
                    this.tabs = {
                        index:{name:'待接单',select:false,act:'index',hidden:true},
                        order_print:{name:'小票样式',select:false,act:'order_print'},
                        order_print_a4:{name:'A4样式',select:true,act:'order_print_a4'},
                    }
                    this.routerData("order_print_a4");
                }else{
                    this.tabs = {
                        index:{name:'待接单',select:false,act:'index',hidden:true},
                        order_print:{name:'小票样式',select:true,act:'order_print'},
                        order_print_a4:{name:'A4样式',select:false,act:'order_print_a4'},
                    }
                }
            }else{
                this.tabs = {
                    index:{name:'待接单',select:true,act:'index',hidden:true},
                    order_print:{name:'小票样式',select:false,act:'order_print',hidden:true},
                    order_print_a4:{name:'A4样式',select:false,act:'order_print_a4',hidden:true},
                }
            }
        })
    },
}