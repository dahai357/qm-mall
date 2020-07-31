<template>
  <div class="ncsc-layout-right">
    <div>
      <div class="tabmenu">
        <qm-tabs
          :tabs="tabs"
          :blod="false"
          class="store-tabs"
          :marginRight="20"
          @routerData="routerData($event)"
        ></qm-tabs>
        <div class="menu-more">
          <a class="ncsc-btn ncsc-btn-orange-rim" @click="changeHead">修改运营负责人</a>
        </div>
      </div>
      <table cellpadding="0" cellspacing="0" class="table-store-info">
        <thead>
          <tr>
            <th colspan="2">公司及联系人信息</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>公司名称</th>
            <td>{{storeInfo.company_name}}</td>
          </tr>
          <tr>
            <th>公司所在地</th>
            <td>{{storeInfo.company_address}}</td>
          </tr>
          <tr>
            <th>公司详细地址</th>
            <td>{{storeInfo.company_address_detail}}</td>
          </tr>
          <tr>
            <th>公司电话</th>
            <td>{{storeInfo.company_phone}}</td>
          </tr>
          <tr>
            <th>运营姓名</th>
            <td>{{storeInfo.contacts_name}}</td>
          </tr>
          <tr>
            <th>运营人手机</th>
            <td>{{storeInfo.contacts_phone}}</td>
          </tr>
          <tr>
            <th>法定代表人</th>
            <td>{{storeInfo.legal_person}}</td>
          </tr>
          <tr>
            <th>法人身份证正面</th>
            <td>
               <img :src="storeInfo.idcard_front" @error="handleLoad" style="float: left;" @click="showDialog(storeInfo.idcard_front)"/>
             
            </td>
          </tr>
          <tr>
            <th>法人身份证反面</th>
            <td>
              <img :src="storeInfo.idcard_reverse" @error="handleLoad" style="float: left;" @click="showDialog(storeInfo.idcard_reverse)"/>
            </td>
          </tr>
          <tr>
            <th>法人手持证件照</th>
            <td>
             <img :src="storeInfo.idcard_in_hand" @error="handleLoad" style="float: left;" @click="showDialog(storeInfo.idcard_in_hand)"/>
            </td>
          </tr>
        </tbody>
      </table>
      <table cellpadding="0" cellspacing="0" class="table-store-info">
        <thead>
          <tr>
            <th colspan="2">营业执照信息（副本）</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>营业执照号</th>
            <td>{{storeInfo.business_licence_number}}</td>
          </tr>
          <tr>
            <th>营业执照所在地</th>
            <td>{{storeInfo.business_licence_address}}</td>
          </tr>
          <tr>
            <th>营业执照有效期</th>
            <td>{{storeInfo.business_licence_start}} - 长期</td>
          </tr>
          <tr>
            <th>营业执照经营范围</th>
            <td>{{storeInfo.business_sphere}}</td>
          </tr>
          <tr>
            <th>营业执照</th>
            <td>
                <img :src="storeInfo.business_licence_photo" @error="handleLoad" style="float: left;" @click="showDialog(storeInfo.business_licence_photo)"/>
            </td>
          </tr>
        </tbody>
      </table>
      <table cellpadding="0" cellspacing="0" class="table-store-info">
        <thead>
          <tr>
            <th colspan="2">店铺经营信息</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>卖家账号</th>
            <td>{{storeInfo.seller_name}}</td>
          </tr>
          <tr>
            <th>店铺名称</th>
            <td>{{storelist.store_name}}</td>
          </tr>
          <tr>
            <th>经营类目</th>
            <td>
              {{storelist.gc_names}}
              <p
                class="c-orange mt10"
              >已缴纳保证金：{{storelist.cashed_deposit}}元,应缴纳保证金：{{storelist.total_deposit}}元</p>
            </td>
          </tr>
        </tbody>
      </table>
      <table cellpadding="0" cellspacing="0" class="table-store-info">
        <thead>
          <tr>
            <th colspan="2">其他信息</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>店铺logo</th>
            <td>
                <img :src="storelist.store_label" @error="handleLoad" style="float: left;" @click="showDialog(storelist.store_label)"/>
            </td>
          </tr>
          <tr>
            <th>门脸照片</th>
            <td>
               <img :src="storeInfo.shop_front_photo" @error="handleLoad" style="float: left;" @click="showDialog(storeInfo.shop_front_photo)"/>
            </td>
          </tr>
          <tr>
            <th>店内照片</th>
            <td>
              <div v-for="src in storeInfo.shop_photo" :key="src">
                 <img :src="src" @error="handleLoad" style="float: left;" @click="showDialog(src)"/>
              </div>
            </td>
          </tr>
          <tr>
            <th>邀请人手机号</th>
            <td>{{InviterMobile}} <span v-if="MemberInviterName">(姓名:{{MemberInviterName}})</span> </td>
          </tr>
        </tbody>
      </table>
    </div>
    <qm-tips
      :tipsVisible="showLabel1"
      :width="'480px'"
      @update:tipsVisible="showLabel1 = $event"
      :showCancel="false"
      :showButton="false"
      @close="showLabel1 = false"
    >
      <template slot="title">修改运营负责人</template>
      <template slot="content">
        <div class="dialog_content">
          <div class="eject_con">
            <form @submit.prevent="">
              <dl>
                <dt>运营人姓名：</dt>
                <dd>
                  <input type="text" value="" class="text contacts_name"/>
                </dd>
              </dl>
              <dl>
                <dt>运营人手机：</dt>
                <dd>
                  <input type="text" class="text contacts_phone"/>
                </dd>
              </dl>
              <div id="warning">
                <label for="contacts_name" class="error" :hidden="nameShow">运营姓名不能为空</label>
                <label for="contacts_phone" class="error" :hidden="phoneShow">{{phoneShow1}}</label>
              </div>
              <div class="bottom">
                <input type="button" value="确定" @click="submit" class="ncsc-btn ncsc-btn-orange" />
              </div>
            </form>
          </div>
        </div>
      </template>
    </qm-tips>
    <qm-dialog-img :imageUrl="imgSrc" :imageDialog="showImg" @close="showImg=false">
    </qm-dialog-img>
  </div>
</template>

<script>
import "viewerjs/dist/viewer.css";
import util from "lib/utils/util";
import QmTips from "component/qm-tips/index";
import QmTabs from "component/qm-tabs/index";
import QmDialogImg from "component/qm-dialog-img/index";
import { mapActions, mapMutations } from "vuex";
export default {
  name: "store_info",
  data() {
    return {
      bodyListener:'',
      tabs: {
        index: { name: "店铺信息", select: true, act: "index" }
      },
      storeInfo: "",
      storelist: "",
      viewerOptions: {
        toolbar: false,
        navbar: false,
        fullscreen: false
      },
      showLabel1: false,
      LongMessage: "",
      phoneShow: true,
      nameShow: true,
      phoneShow1: "",
      InviterMobile:"",
      MemberInviterName:"",
      showImg:false,
      imgSrc:""
    };
  },
  methods: {
    ...mapMutations({
      setIsQuickLinkShow: "setIsQuickLinkShow"
    }),
    ...mapActions(["getStoreInfo", "changeOperator"]),
    routerData() {
      var url = "/account/store_info/index";
      this.$router.push(url);
    },
    showDialog(img){
      this.imgSrc=img
      this.showImg=true
    },
    getStoreInfoList() {
      this.getStoreInfo().then(res => {
        if(res.store.gc_names!=null&&res.store.gc_names!=''){
            res.store.gc_names = res.store.gc_names.join(",");
        }
        this.storeInfo = res.joininDetail;
        this.storelist = res.store;
        this.InviterMobile=res.inviterMobile
        this.MemberInviterName=res.memberInviterName
      });
    },
    changeHead() {
      this.showLabel1 = true;
      this.$nextTick(()=> {
        $(".contacts_name").val(this.storeInfo.contacts_name);
        $(".contacts_phone").val(this.storeInfo.contacts_phone);
      });
    },
    submit() {
      this.nameShow = true;
      this.phoneShow = true;
      if ($(".contacts_phone").val().length > 0) {
        if (
          !/^1[3456789]\d{9}$/.test(
            $(".contacts_phone")
              .val()
              .trim()
          )
        ) {
          this.phoneShow1 = "请输入正确的手机号";
          this.phoneShow = false;
          return false;
        }
      } else {
        this.phoneShow1 = "运营人手机不能为空";
        this.phoneShow = false;
        return false;
      }

      if ($(".contacts_name").val().length > 0) {
        this.nameShow = true;
      } else {
        this.nameShow = false;
        return false;
      }
      this.showLabel1 = false;
      var data = {
        contacts_name: $(".contacts_name").val(),
        contacts_phone: $(".contacts_phone").val()
      };
      this.changeOperator(data).then(res => {
        if (res) {
          util.msg(res.longMessage);
          this.getStoreInfoList();
        } else {
          util.msg("操作成功");
        }
      });
    },
    handleLoad(e) {
     e.target.remove()
     e.path[1].innerText="-"
    }
  },
  components: {
    QmTabs,
    QmTips,
    QmDialogImg
  },
  mounted() {
    var _self = this;
    if (_self.$router.history.current.name == "home") {
      _self.setIsQuickLinkShow(true);
    } else {
      _self.setIsQuickLinkShow(false);
    }

    _self.getStoreInfoList();
    //body绑定键盘enter搜索事件
    _self.bodyListener = (e) => {
      if (e.keyCode === 13 && _self.showLabel1){
       _self.submit();
      }
    }
    document.body.addEventListener('keyup', _self.bodyListener, false);
  },
  beforeDestroy(){
    //销毁键盘enter搜索事件
    document.body.removeEventListener('keyup', this.bodyListener);
  },
  beforeRouteLeave(to, from, next) {
    // window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    window.scrollTo(0,0);
    document.getElementsByClassName("routerContent")[0].scrollTop = 0;
    if (to.name == "home") {
      this.setIsQuickLinkShow(true);
    } else {
      this.setIsQuickLinkShow(false);
    }
    next();
  }
};
</script>

<style scoped>
.eject_con .text {
  float: left;
}
.eject_con dl dt {
    width: 10.5em;
}
.table-store-info img {
  max-height: 150px;
  margin-right: 5px;
  cursor: pointer;
}
.tableClick {
  cursor: pointer;
}
caption,
th {
  text-align: left;
  font-weight: normal;
}
.ncsc-btn:hover {
  color: white;
}
.ncsc-layout-right {
  padding: 10px 20px 30px;
  width: 980px;
  min-height: 640px;
  /* float: right; */
  z-index: 1;
  background: #fff;
}
.store-tabs {
  width: 100%;
  border-bottom: 1px solid #eee;
}
.menu-more {
  position: absolute;
  right: -3px;
  top: 3px;
  display: block;
}
.tabmenu {
  width: 100%;
  height: 40px;
  display: block;
  position: relative;
  /* z-index: 99; */
  margin-bottom: 30px;
}
.table-store-info {
  width: 100%;
  margin-bottom: 30px;
}
.table-store-info thead th {
  background: #f3f3f3;
  font-size: 16px;
}
.table-store-info th,
.table-store-info td {
  border: 1px solid #ddd;
  height: 20px;
  padding: 10px 20px;
  vertical-align: middle;
}
.table-store-info tbody th {
  width: 25%;
  vertical-align: top;
}
.table-store-info tbody td {
  vertical-align: top;
}
.error {
  float: left;
}
</style>
