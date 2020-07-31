
import {mapGetters,mapMutations,mapActions} from 'vuex';
import * as _ from 'lodash';
import QmTabs from 'component/qm-tabs/index';

export default {
    name: "store-ap-adv",
    data (){
        return {

            tabs:{
                adv_list_two:{name:'广告位管理',select:true,act:'adv_list_two'},
                adv_edit:{name:'添加广告',select:false,act:'adv_edit',hidden:true},
            },
            curUrl: 'adv_list_two',
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
            ...mapGetters('storeApAdv',{
                showAddBtn:'getShowAddBtn',
                isEdit:'getIsEdit'
            }),
        },
        methods:{
            ...mapMutations('storeApAdv',{
                setIsAdd:'setIsAdd',
                setShowAddBtn:'setShowAddBtn'
            }),
            ...mapActions({
                
                
            }),

            routerData(data){
                this.url = data.key;
                this.curUrl = data.key
                var url = '/promotion/store_ap_adv/'+data.key
                if(data.key == 'adv_edit'){
                    return;
                }
                this.$router.push(url);
              },

            addAdvertis(){
                this.setIsAdd(true);
                this.setShowAddBtn(false);
                let data = {
                    key:'adv_edit'
                }
                this.routerData(data)
            },
            back(){
                var data = {
                    key:'adv_list_two'
                }
                this.routerData(data)
            },

        },
        watch:{
            isEdit(){
                if(this.isEdit){
                    this.tabs.adv_edit.name = '编辑广告';
                }else{
                    this.tabs.adv_edit.name = '添加广告';
                }
            }
        },

        mounted(){
            
        }
}
