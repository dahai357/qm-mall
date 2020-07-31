import * as _ from 'lodash';
import {mapGetters} from 'vuex'
import * as $ from 'jquery'
export default {
  name: "QmTabs"  ,

  props:{
    tabs: {
        type: Object,
        default: {}
      },
      blod:{
          type:Boolean,
          default:false
      },
      marginRight:{
        type:Number,
        default:0
      },
      curTab: {
        type:String,
        default:''
      }
    },
  data(){
    return {
    }
  },
  computed:{
    ...mapGetters({
      curTabMenu:'getCurTabMenu',
    })
  },
  methods:{
    changeTabs(menu,m,i){
        this.changeCurTab(m)
        //this.helps = newHomeMenus;
        var data = {
          item:menu,
          key:menu.act,
          index:i
        }
        if(menu.hasOwnProperty('stay') && menu.stay == true){
        }else{
          this.$emit('routerData',data);
        }
      },
    changeCurTab(m){
      var newHomeMenus = _.clone(this.tabs);
      if(newHomeMenus[m]){
        for (const key in newHomeMenus) {
          if (newHomeMenus.hasOwnProperty(key)) {
            if(typeof(newHomeMenus[key]) == 'object'){
              newHomeMenus[key].select = false;
            }
          }
        }
        newHomeMenus[m].select = true;
      }

    }
  },
  watch:{
    curTabMenu(){
      if(this.curTabMenu !== 'home') {
        this.changeCurTab(this.curTabMenu)
      }
    },
    $route(){
      var params = this.$route.params.state_type;
      if(params == 'state_wait'){
       this.$router.push('/order/store_order/index/index');
        this.changeCurTab('state_wait');
      }
    },
  },
  mounted() {
    if(this.curTabMenu !== '' && this.curTabMenu !== 'home') this.changeCurTab(this.curTabMenu)
  }
}
