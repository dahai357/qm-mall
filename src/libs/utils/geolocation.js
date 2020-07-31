let geolocation = {}

import AMap from 'AMap';
// import * as $ from 'jquery';

geolocation.getCurrentLocation = function(){
    var current_address;

    return new Promise((resolve, reject) => {

        AMap.service('AMap.Geolocation', function () {
            geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                maximumAge: 0,           //定位结果缓存0毫秒，默认：0
                convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                showButton: true,        //显示定位按钮，默认：true
                buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
                buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
                showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
                panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
                zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            });
            geolocation.getCurrentPosition(function(status,result){
                if(status=='complete'){
                    var addressComponent = result.addressComponent;
                    var township = addressComponent.township;
                    var formattedAddress = result.formattedAddress;
                    var start =formattedAddress.indexOf(township)+township.length;
                    var detailAddress = formattedAddress.substr(start);
                    // $('.maptext').html(detailAddress);
                    // addcookie('location',JSON.stringify(result.position));
                    // addcookie('current_location',JSON.stringify(result));
                    current_address = {
                        'province':addressComponent.province,
                        'city':addressComponent.city,
                        'district':addressComponent.district,
                        'citycode':addressComponent.citycode,
                        'addresss' : result.formattedAddress,
                        'location':result.position,
                        'subaddress':detailAddress
    
                    };
                    
                    // addcookie('current_address',JSON.stringify(current_address));
                    // $('#main_content').show();
                }else{
                    //layerMsg('地理位置定位失败');
                    //console.log('test');
                }
                resolve(current_address)
            });
            AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
            AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
    
        });
        var onComplete= function(res){
        };
        var onError = function(res){
        };
    }) 
}

export default geolocation;