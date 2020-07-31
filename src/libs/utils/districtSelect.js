let district = {}
var districtOption;
var citySelect = document.getElementById('citySelect');
var districtSelect = document.getElementById('districtSelect');
var mapProvince ;
var mapCity ;
var mapDistrict;
var cityAutoOptions;

// import VueAMap from 'vue-amap';
import AMap from 'AMap';
import * as $ from 'jquery';

district.initDistrict = function(provinceValue,cityValue,districtValue,autoOptions){
    var opts = {
        subdistrict: 1,   //返回下一级行政区
        showbiz:false  //最后一级返回街道信息
    };

    // districtOption = new VueAMap.DistrictSearch(opts);
    districtOption = new AMap.DistrictSearch(opts);//注意：需要使用插件同步下发功能才能这样直接使用
    districtOption.search('中国', function(status, result) {
        if(status=='complete'){
            
            district.getData(result.districtList[0]);
        }
    });
    mapProvince = provinceValue;
    mapCity = cityValue;
    mapDistrict = districtValue;
    cityAutoOptions = autoOptions;
}

district.getData = function(data) {
    //清空下一级别的下拉列表
    var chooseStr = ' -- 请选择省份 -- ';
    var subList = data.districtList;
    if (subList) {
        var curlevel = subList[0].level;
        if(curlevel=='street'){
            return;
        }
        citySelect = document.getElementById('citySelect');
        districtSelect = document.getElementById('districtSelect');

        if (curlevel === 'city') {
            
            chooseStr = ' -- 请选择城市 -- ';
            citySelect.innerHTML = '';
            districtSelect.innerHTML = '';
        } else if (curlevel === 'district') {
            chooseStr = ' -- 请选择区（县） -- ';
            districtSelect.innerHTML = '';
        }
        var contentSub = new Option(chooseStr,'');
        
        var curList =  document.querySelector('#' + curlevel+'Select');      
        
        curList.add(contentSub);
        for (var i = 0, l = subList.length; i < l; i++) {

            var name = subList[i].name;
            if(curlevel=='province'){
                if(name=='台湾省'||name=='香港特别行政区'||name=='澳门特别行政区'){
                    continue;
                }
            }
            var levelSub = subList[i].level;
            var cityCode = subList[i].citycode;
            contentSub = new Option(name);
            contentSub.setAttribute("value", name);
            contentSub.setAttribute("level", levelSub);
            contentSub.setAttribute("adcode", subList[i].adcode);
            curList.add(contentSub);
        }
        $('#' + curlevel+'Select').parent().show();

        var value ;
        if(curlevel=='province'){
            value = mapProvince ;
        }else if(curlevel == 'city'){
            value = mapCity;
        }else if(curlevel == 'district'){
            value = mapDistrict;
        }
        if(value){
            $('#'+curlevel+'Select').find('option[value="'+value+'"]').prop('selected',true);
            var provinceOption = $('#'+curlevel+'Select').find('option:selected');
            district.setSelect(provinceOption);
        }
    }

}
district.setlevelValue = function(curlevel,value){
    if(value){
        $('#'+curlevel+'Select').find('option[value="'+value+'"]').prop('selected',true);
        var provinceOption = $('#'+curlevel+'Select').find('option:selected');
        district.setSelect(provinceOption);
    }
}
district.search = function (obj,level) {
    var option = $(obj).find('option:selected');
    district.setSelect(option,level);
}
district.setSelect = function(option,fromLevel){
    var adcode = $(option).attr('adcode');
    var level = $(option).attr('level');
      districtOption.setLevel(level); //行政区级别
      districtOption.setExtensions('all');
      if(!level){
        if(fromLevel=='province'){
          $('#citySelect').parent().hide();
          $('#districtSelect').parent().hide();
        }
        if(fromLevel=='city'){
          $('#districtSelect').parent().hide();
        }
      }
    if(level=='province'){
        $('#citySelect').parent().hide();
        $('#districtSelect').parent().hide();
    }
    var selectValue = $(option).val();
    if(level=='city'&&cityAutoOptions!=null){
       $('#districtSelect').parent().hide();
        cityAutoOptions.city=selectValue;
        cityAutoOptions.citylimit = true;
        // map.setCity(selectValue);
    }
    if(adcode && level){
      districtOption.search(adcode, function (status, result) {
        if (status === 'complete') {
          district.getData(result.districtList[0], level);
        }
      });
    }

}


export default district;
