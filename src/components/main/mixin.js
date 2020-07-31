import {mapGetters} from 'vuex'
export default {
  computed:{
    ...mapGetters({
      menuList:'getMenuList',
    })
  },
  methods:{
    changeMenu(act,op) {
      var newMenuList = _.clone(this.menuList);
      for (const key in newMenuList) {
        if(newMenuList[key].curent){
          if(key == act){
            break;
          }
          newMenuList[key].curent = !newMenuList[key].curent;
        }
      }
      newMenuList[act].curent = !newMenuList[act].curent;
      this.$store.commit("setMenuList",newMenuList);
      //修改左边菜单
      var newSubMenu = _.clone(newMenuList[act].child);
      for (const key in newSubMenu) {
        if(key == op) {
          newSubMenu[key].select = true
        }else{
          newSubMenu[key].select = false
        }
      }
      this.$store.commit('setSubMenu',newSubMenu);
    },
    updateActiveName(){
      this.$nextTick(() => {
        // this.$refs.topMenu.updateOpened()
        // this.$refs.topMenu.updateActiveName()
      })
    },
    onlyNumberPrice(e,paramName){
      let value = e.target.value;
      console.log(value)
      let t = value.charAt(0);
      //先把非数字的都替换掉，除了数字和.和-号    
      value = value.replace(/[^\d\.\-]/g,'');
      //前两位不能是0加数字      
      value = value.replace(/^0(\d[0-9]*)/g,'$1');
      //必须保证第一个为数字而不是.       
      value = value.replace(/^\./g,'');
      //保证只有出现一个.而没有多个.       
      value = value.replace(/\.{2,}/g,'.');
      //保证.只出现一次，而不能出现两次以上       
      value = value.replace('.','$#$').replace(/\./g,'').replace('$#$','.');
      //如果第一位是负号，则允许添加    
      value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
      value =  value.replace(/\-/g,"")
      if(t == '-'){
        if(value.length == 1){
          value = '';
        }else{
          value = value.substr(1);
        }
      }
      //e.target.value = value;
      eval('this.'+paramName+'= value');
    },
    onlyInteage(e,paramName,range) {
      let value = e.target.value;
      value = value.replace(/\D/g,'');
      //前两位不能是0加数字      
      value = value.replace(/^0(\d[0-9]*)/g,'$1');
      //e.target.value = value;
      if(range != undefined && range !== '' && !isNaN(value)){
        let rang = range.split(',');
        let min = parseInt(rang[0]);
        let max = parseInt(rang[1]);
        if(value < min){
          value = min;
        }
        if(value > max){
          value = max;
        }
      }
      eval('this.'+paramName+'= value');
    },
    onlyInteage2(e,paramName) {
      let value = e.target.value;
      value = value.replace(/\D/g,'');
      // //前两位不能是0加数字      
      // value = value.replace(/^0(\d[0-9]*)/g,'$1');
      //e.target.value = value;
      eval('this.'+paramName+'= value');
    },
    onlyDiscount(e,paramName){
      let value = e.target.value;
      value = value.replace(/\D/g,'');
      //前两位不能是0加数字      
      value = value.replace(/^0(\d[0-9]*)/g,'$1');
      eval('this.'+paramName+'= value');
    },
    langeFrant(value){
      value=value.replace(/[^0-9,]*/g,""); 
      return value;
    },

  }
}
