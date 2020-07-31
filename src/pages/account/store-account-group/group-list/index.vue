<script>
import util from "lib/utils/util";
import storage from "lib/utils/storage";
import { mapActions, mapMutations } from "vuex";
import QmTable from "component/qm-table/index";
import QmTips from "component/qm-tips/index";
export default {
  name: "group_list",
  data() {
    return {
      group_list: [],
      Contentmsg: "",
      pageParams: {
        total: 0
      },
      delDialog: false,
      groupitem: {},
      ChangeBtn: false,
      accountList: []
    };
  },
  methods: {
    ...mapMutations({
      setIsQuickLinkShow: "setIsQuickLinkShow"
    }),
    ...mapActions(["groupList", "groupDel", "getAccountList"]),
    getGroupList() {
      this.groupList().then(res => {
        this.group_list = res;
        if (this.group_list.length == 0) {
          var pageParams = _.clone(this.pageParams);
          this.pageParams.total = 0;
          this.pageParams = pageParams;
        }
      });
    },
    edit(item) {
      storage.set("Group_id", item);
      this.$router.push("group_edit");
    },
    delOne(item) {
      this.delDialog = true;
      this.groupitem = item;
      this.accountList.some(el => {
        //判断账号列表账号组是否已存在
        if (item.groupId == el.seller_group_id) {
          this.delDialog = false;
          util.msg("当前账号组存在可用账号,需删除账号才能删除账号组.");
        }
      });
    },
    confirmDel() {
      this.groupDel({ groupId: this.groupitem.groupId }).then(res => {
        if (res === 1) {
          this.delDialog = false;
          util.msg("删除成功");
          this.getGroupList();
        } else {
          util.msg("删除失败");
        }
      });
    }
  },
  components: {
    QmTable,
    QmTips
  },
  mounted() {
    this.getAccountList().then(res => {
      //对当前账号列表类账号组去重 避免弹框多次
      let obj = {};
      if (res.sellerList) {
        this.accountList = res.sellerList.reduce((cur, next) => {
          obj[next.seller_group_id]
            ? ""
            : (obj[next.seller_group_id] = true && cur.push(next));
          return cur;
        }, []);
      }
    });
    this.getGroupList();
    if (this.$router.history.current.name == "home") {
      this.setIsQuickLinkShow(true);
    } else {
      this.setIsQuickLinkShow(false);
    }
  },
  beforeRouteLeave(to, from, next) {
    // window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);
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
<template>
  <div class="group-list-content">
    <qm-table :pageParams="pageParams"></qm-table>
    <table class="ncsc-table" v-show="group_list.length>0">
      <thead>
        <tr>
          <th>组名</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody class="ncsc-default-table">
        <tr v-for="item in group_list" :key="item.groupId">
          <td>{{item.groupName}}</td>
          <td>
            <p>
              <a @click="edit(item)" class="ncsc-btn">编辑</a>
            </p>
            <p>
              <a @click="delOne(item)" class="ncsc-btn btn-del">删除</a>
            </p>
          </td>
        </tr>
      </tbody>
    </table>
    <qm-tips
      :tipsVisible="delDialog"
      :width="'420px'"
      @update:tipsVisible="delDialog = $event"
      @close="delDialog = false"
      @confirm="confirmDel()"
    >
      <template slot="title">提示信息</template>
      <template slot="content">你确定要删除吗?</template>
    </qm-tips>
  </div>
</template>

<style scoped>
.store_account_group {
  border: 1px solid #fff !important;
}
.group-list-content {
  margin-top: 60px;
  min-height: calc(640px - 101px);
}
.ncsc-default-table .btn-del {
  margin-top: 8px;
}
.ncsc-btn:hover {
  text-decoration: none;
  border-color: #ff8519;
  color: #ff8519;
}
</style>