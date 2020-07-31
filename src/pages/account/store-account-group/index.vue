<template>
  <div class="store_account_group">
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
          @click="jump"
          v-if="this.$route.path==='/account/store_account_group/group_list'"
        >添加组</a>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import QmTabs from "component/qm-tabs/index";
export default {
  name: "store_account_group",
  data() {
    return {
      tabs: {
        group_list: { name: "组列表", select: true, act: "group_list" },
        group_edit: {
          name: "编辑组",
          select: false,
          act: "group_edit",
          hidden: true
        },
        group_add: {
          name: "添加组",
          select: false,
          act: "group_add",
          hidden: true
        }
      }
    };
  },
  methods: {
    routerData(data) {
      var url = "/account/store_account_group/";
      this.$router.push(url);
    },
    jump() {
      
      this.$router.push("/account/store_account_group/group_add");
    }
  },
  components: {
    QmTabs
  },
  mounted() {
  }
};
</script>

<style scoped>
.store_account_group {
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

  /* z-index: 1;
    bottom: 10px;
    right: -5px; */
}
.menu-more a {
  margin: 0 5px;
}
.menu-more a:hover {
  text-decoration: none;
  color: #fff;
}
</style>
