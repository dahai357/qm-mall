var storage = {

  get(key){
    try{
      if(key == 'key') {
        var key1 = this.getCookie("key");
      }

      return JSON.parse(localStorage.getItem(key))
    }catch (e) {
      return false
    }

  },
  set(key,val){
    try{
      if(key == 'key') {

        this.setCookie(key,val);
      }
      localStorage.setItem(key, JSON.stringify(val))

      return true
    }catch (e) {
      return false
    }
  },
  remove(key){
    return localStorage.removeItem(key)
  },

  setCookie(name,value){
    var exp = new Date();
    // exp.setTime(exp.getTime());
    exp.setTime(exp.getTime() + 24*3600*1000);
    // document.cookie = name + "="+ value + ";expires=-1";
    document.cookie = name + "="+ value 
    // + ";expires="+exp.toGMTString();
  },

  getCookie(name){
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
    return unescape(arr[2]);
    else
    return null;
  },

  delCookie(name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
    document.cookie= name + "="+cval+";expires="+exp.toGMTString();
  }
}

export default storage
