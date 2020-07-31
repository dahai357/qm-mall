import * as _ from 'lodash';

export default {
  name: "qm-tabs"  ,

  props:{
    tabs: {
        type: Object,
        default: {}
      },
      blod:{
          type:Boolean,
          default:false
      }
  },
  data(){
    return {
    }
  },
  computed: {
    
  },
  methods:{
    changeTabs(menu,m,i){
        var newHomeMenus = _.clone(this.tabs);
        for (const key in newHomeMenus) {
          if (newHomeMenus.hasOwnProperty(key)) {
            newHomeMenus[key].select = false;
          }
        }
        newHomeMenus[m].select = true;
        this.helps = newHomeMenus;
      }
  },
  watch:{

  },
  mounted() {
    
  }
}