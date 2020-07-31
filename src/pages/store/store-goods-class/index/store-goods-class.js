
import {mapGetters,mapMutations,mapActions} from 'vuex';
import * as _ from 'lodash';
import QmTabs from 'component/qm-tabs/index';

export default {
    name: "store-goods-class",
    data (){
        return {

            tabs:{
                index:{name:'首页推荐分类',select:true,act:'index'},
                store_goods:{name:'新增分类',select:true,act:'store_goods',hidden:true},
            },

            btnClick:{
            }

        }
    },
        components: {
            QmTabs
        },

        computed:{
          ...mapGetters({
            metaData:'getMetaData',
            ImageIp:'getImageIp',
            imagePathConfig:'getImagePathConfig',
          }),
          ...mapGetters('storeGoodsClass',{
            showAddBtn:'getShowAddBtn',
            isEdit:'getIsEdit'
          }),
        },

        methods:{
            ...mapMutations('storeGoodsClass',{
                setIsAdd:'setIsAdd',
                setShowAddBtn:'setShowAddBtn'
            }),
            ...mapActions({
                
                
            }),
            routerData(data){
                this.url = data.key;
                var url = '/promotion/store_goods_class/'+data.key
                if(data.key === 'store_goods'){
                  return
                }
                this.$router.push(url);
              },

            addClass(){
                this.setIsAdd(true);
            }

        },

        

        watch:{
            isEdit(){
                if(this.isEdit){
                    this.tabs.store_goods.name = '编辑分类';
                }else{
                    this.tabs.store_goods.name = '新增分类';
                }
            }
          },

        mounted(){
            if(this.$router.history.current.name == 'store_goods_class_store_goods'){
              this.setShowAddBtn(false);
            }
        }
}
