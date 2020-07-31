
import {mapGetters,mapActions} from 'vuex';
import QmTabs from 'component/qm-tabs/index';
import {storeClass} from 'api'
export default {
    name: "store-class",
    data (){
        return {
            tabs:{
                index:{name:'分类列表',select:true,act:'index'},
                advertisements:{name:'广告管理',select:false,act:'advertisements',hidden:true},
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
        routerData(data){
            this.url = data.key;
            let url = '/store/store_class/'+data.key
            this.$router.push(url);
        },
        changeCur(){
            let path = this.$route.path
            this.url = path.substring(path.lastIndexOf('/') + 1);
        },

    },

    watch:{
        '$route'(newRouter){
            this.changeCur()
        }
    },

    mounted(){

    }
}