
export function banBackSpace(e){   
    var ev = e || window.event;
    var obj = ev.target || ev.srcElement||ev.relatedTarget || ev.currentTarget
    var t = obj.type || obj.getAttribute('type');
    //判断当前事件类型
    var vReadOnly = obj.getAttribute('readonly');   
    var vEnabled = obj.getAttribute('enabled');   
    //处理空值的情况   
    vReadOnly = (vReadOnly == null) ? false : vReadOnly;   
    vEnabled = (vEnabled == null) ? true : vEnabled;    
    //当敲Backspace键时，事件源类型为密码或单行、多行文本的，   
    //并且readonly属性为true或enabled属性为false的，则退格键失效   
    var flag1=(ev.keyCode == 8 && (t=="password" || t=="text" || t=="textarea"|| t=="select-one"||t=="number")   
    && (vReadOnly=='readonly' || vEnabled!=true))?true:false;   
      
    //当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效   
    var flag2=(ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea"&& t != "select-one"&& t != "number")?true:false;   
      
    //判断   
    if(flag2){   
        return false;   
    }   
    if(flag1){   
        return false;   
    }   
}   