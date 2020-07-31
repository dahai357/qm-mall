<template>
  <div class="account-list">
    <div>
      <qm-tabs
        :tabs="tabs"
        :blod="false"
        class="store-tabs"
        :marginRight="20"
        @routerData="routerData($event)"
      ></qm-tabs>
      <div class="menu-more">
        <a
          class="ncsc-btn ncsc-btn-orange"
          v-if="this.$route.path==='/account/store_account/account_list'"
          @click="jumpNum?addBundling():routerjump()"
        >添加账号</a>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import storage from "lib/utils/storage";
import QmTabs from "component/qm-tabs/index";
import { mapActions } from "vuex";
import util from "lib/utils/util";
export default {
  name: "account-list",
  data() {
    return {
      tabs: {
        account_list: { name: "账号列表", select: true, act: "account_list" },
        account_edit: {
          name: "编辑账号",
          select: false,
          act: "account_edit",
          hidden: true
        },
        account_add: {
          name: "添加账号",
          select: false,
          act: "account_add",
          hidden: true
        }
      },
      jumpNum: true
    };
  },
  methods: {
    ...mapActions(["groupList"]),
    addBundling() {
      storage.set("account_id", 0);
      var data = {
        key: "account_add"
      };
      this.routerData(data);
    },
    routerData(data) {
      var url = "/account/store_account/" + data.key;
      this.$router.push(url);
    },
    routerjump() {
      util.msg("请先创建账号组");
       this.timer = setTimeout(()=>{this.$router.push("/account/store_account_group/group_add")},2500)
    }
  },
  mounted() {
    this.groupList().then(res => {
      if (res.length == 0) {
        this.jumpNum = false;
      }
    });
  },
  beforeDestroy(){
     clearTimeout(this.timer);
  },
  components: {
    QmTabs
  }
};
</script>

<style scoped>
.account-list {
  border: 1px solid #fff;
  background: #fff;
  padding: 10px 20px 30px;
  width: 1000px;
  position: relative;
}
.store-tabs {
  width: 100%;
  border-bottom: 1px solid #eee;
}
.menu-more {
  position: absolute;
  right: 15px;
  top: 15px;
  display: block;
}

.menu-more a {
  margin: 0 5px;
}
.menu-more a:hover {
  text-decoration: none;
  color: #fff;
}
</style>
