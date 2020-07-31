<template>
  <div class="ncsc-layout-right">
    <div class="main-content">
      <div class="tabmenu">
        <ul class="tab pngFix">
          <qm-tabs :tabs="tabs" :blod="false" class="store-tabs" :marginRight="20"></qm-tabs>
        </ul>
      </div>
      <div class="ncsc-form-default">
        <form action  autocomplete="off">
          <input type="password" class="hide"  id="loginPassword"/>
          <input type="text" class="hide"  id="loginUserName"/>
          <dl>
            <dt>
              <i class="required">*</i>旧密码：
            </dt>
            <dd>
              <input
                name="password0"
                type="password"
                class="text w200"
                ref="oldPwd"
                @change="changeOldPwd"
                 autocomplete="off"
              />
              <span>
                <label for="password0" class="error" :hidden="oldPwd">旧密码不能为空</label>
              </span>
            </dd>
          </dl>
          <dl>
            <dt>
              <i class="required">*</i>新密码：
            </dt>
            <dd>
              <input
                name="password"
                type="password"
                class="text w200"
                ref="newPwd"
                @change="changeNewPwd" 
                 autocomplete="off"
              />
              <span>
                <label for="password" class="error" :hidden="newPwd">{{newPwdmsg}}</label>
              </span>
            </dd>
          </dl>
          <dl>
            <dt>
              <i class="required">*</i>确认密码：
            </dt>
            <dd>
              <input
                type="password"
                class="text w200"
                ref="rePwd"
                @change="changeRePwd"
                autocomplete="off"
              />
              <span>
                <label for="password" class="error" :hidden="rePwd">两次密码不一致</label>
              </span>
            </dd>
          </dl>
        </form>
        <div class="bottom">
          <label class="submit-border">
            <input type="button" value="提交" class="submit"  @click="submitPwd" />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import util from "lib/utils/util"
import QmTabs from "component/qm-tabs/index";
import storage from "lib/utils/storage";
import { mapActions, mapMutations } from "vuex";
export default {
  name: "change_pwd",
  data() {
    return {
      tabs: {
        change_pwd: { name: "修改密码", select: true, act: "change_pwd" }
      },
      oldPwd: true,
      newPwd: true,
      rePwd: true,
      newPwdmsg: "新密码不能为空"
    };
  },
  methods: {
    ...mapMutations({
      setIsQuickLinkShow: "setIsQuickLinkShow"
    }),
    ...mapActions(["changePassword"]),
    changeOldPwd() {
      if (this.$refs.oldPwd.value.length > 0) {
        this.oldPwd = true;
      } else {
        this.oldPwd = false;
      }
    },
    changeNewPwd() {
      if (this.$refs.newPwd.value.length > 0) {
        this.newPwd = true;

        if (this.$refs.newPwd.value.length >= 6) {
          this.newPwd = true;
          // this.changeRePwd();
        } else {
          this.newPwdmsg = "新密码不能小于6位";
          this.newPwd = false;
          return false;
        }
      } else {
        this.newPwdmsg = "新密码不能为空";
        this.newPwd = false;
        return false;
      }
    },
    changeRePwd() {
      if (this.$refs.newPwd.value.trim() == this.$refs.rePwd.value.trim()) {
        if(this.$refs.newPwd.value.trim()==""||this.$refs.rePwd.value.trim()==""){
          this.rePwd = false;
          return false;
        }else{
            this.rePwd = true;
        }
      
      } else {
        this.rePwd = false;
        return false;
      }
    },
    submitPwd() {
      this.changeOldPwd();
      this.changeNewPwd();
      this.changeRePwd();
      if (
        this.$refs.oldPwd.value.trim() &&
        this.$refs.rePwd.value.trim() &&
        this.$refs.newPwd.value.trim()
      ) {
        if (this.$refs.newPwd.value.trim() == this.$refs.rePwd.value.trim()) {
          var data = {
            oldPassword: this.$refs.oldPwd.value,
            password: this.$refs.newPwd.value,
            rePassword: this.$refs.rePwd.value
          };
          this.changePassword(data).then(res => {
              util.msg(res.longMessage);
            if (res.resultCode == 1) {
                // util.msg(res.longMessage);
              storage.remove("key");
              this.$router.push({ path: "/login" });
            }
          });
        }
      } else {
        return false;
      }
    }
  },
  components: {
    QmTabs
  },
  mounted() {
    if (this.$router.history.current.name == "home") {
      this.setIsQuickLinkShow(true);
    } else {
      this.setIsQuickLinkShow(false);
    }
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
.ncsc-layout-right {
  width: 980px;
  min-height: 640px;
  /* float: right; */
  position: relative;
  z-index: 1;
  background: #fff;
}
.ncsc-layout-right .main-content {
  padding: 10px 20px 30px;
}
.tabmenu {
  width: 100%;
  height: 40px;
  display: block;
  position: relative;
  z-index: 99;
  margin-bottom: 30px;
}
.tabmenu ul {
  width: 100%;
  height: 41px;
  border-bottom: solid 1px #eee;
}
.hide{
  position: fixed;
  bottom: -9999px
}
</style>