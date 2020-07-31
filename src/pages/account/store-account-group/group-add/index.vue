<template>
  <div class="ncsc-form-default">
    <form>
      <dl>
        <dt>
          <i class="required">*</i>组名称：
        </dt>
        <dd>
          <input type="text" class="w200 groupName" @keyup.enter="submit" @keyup="showChange" />
          <input type="text" style="display: none" />
          <span></span>
          <label for="seller_group_name" class="error" :hidden="Show">
            <i class="fa fa-exclamation-circle"></i>
            {{errorMsg}}
          </label>
          <p class="hint">设定权限组名称，方便区分权限类型。</p>
        </dd>
      </dl>
      <dl>
        <dt>
          <i class="required">*</i>权限:
        </dt>
        <dd>
          <div class="ncsc-account-all">
            <input
              type="checkbox"
              id="btn_select_all"
              v-model="checkboxAll"
              class="checkbox"
              name="btn_select_all"
              @change="checkedAll()"
            />
            <label for="btn_select_all">全选</label>
            <label for="seller_group_name" class="error" :hidden="PowerShow">请选择权限</label>
          </div>
          <div class="ncsc-account-container" v-for="(item,m,i) in getMetaData" :key="i">
            <h4>
              <!-- :checked="checkboxListH4" -->
              <input
                type="checkbox"
                :id="m"
                class="checkbox"
                :checked="item.Checked1"
                ref="checkboxListH4"
                nctype="btn_select_module"
                @change="PowerCheckedAll($event,item,m)"
              />
              <label :for="m">{{item.name}}</label>
            </h4>
            <ul class="ncsc-account-container-list">
              <li style="width: 33%" v-for="(item2,m2) in item.child" :key="m2">
                <input
                  type="checkbox"
                  class="checkbox"
                  ref="checkboxList"
                  :checked="item2.Checked2"
                  :value="item2.act"
                  :id="item2.act"
                  @change="PowerList($event,item2,item,m)"
                />
                <label :for="item2.act">{{item2.name}}</label>
              </li>
            </ul>
          </div>
        </dd>
      </dl>
      <div class="bottom">
        <label class="submit-border">
          <input type="button" class="submit" value="提交设置" @click="submit" />
        </label>
      </div>
    </form>
  </div>
</template>
<script>
import util from "lib/utils/util";
import storage from "lib/utils/storage";
import { mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      GroupInfo: {},
      SmtLimits: {},
      CheckedList: [],
      getMetaData: {},
      CheckLimits: [],
      CheckLimits2: [],
      Groupname: "",
      Show: true,
      PowerShow: true,
      checkboxAll: false,
      checkboxListH4: false,
      smtSelectAll: false,
      errorMsg: ""
    };
  },
  methods: {
    ...mapMutations({
      setIsQuickLinkShow: "setIsQuickLinkShow"
    }),
    ...mapActions(["getSellerGroupInfo", "saveGroup"]),
    getGroupinfo() {
      this.getSellerGroupInfo().then(res => {
        this.getMetaData = res.menu;
        for (const key1 in this.getMetaData) {
          var item1 = this.getMetaData[key1];
          item1.Checked1 = false;
        }
        this.SmtLimits = res.smtLimits;
        this.GroupInfo = res.groupInfo;
      });
    },
    submit() {
        const checkboxList = this.$refs.checkboxList;
        this.CheckLimits = [];
        for (let dom of checkboxList) {
          if (dom.checked) {
            this.CheckLimits.push(dom.id);
          }
        }
      if (
        $(".groupName")
          .val()
          .trim().length > 0 &&
        $(".groupName")
          .val()
          .trim().length <= 50
      ) {
        this.Show = true;
        if (this.CheckLimits.length > 0) {
          this.PowerShow = true;
          var data = {
            groupName: $(".groupName").val(),
            limits: this.CheckLimits
          };
          this.saveGroup(data).then(res => {
            if (res.state) {
              util.msg("添加成功");
              this.$router.push("group_list");
            } else {
              util.msg("添加失败");
            }
          });
        } else {
          this.PowerShow = false;
        }
      } else {
        this.showChange();
        if (this.CheckLimits.length > 0) {
          this.PowerShow = true;
        } else {
          this.PowerShow = false;
        }
      }
    },
    showChange() {
      if (
        $(".groupName")
          .val()
          .trim().length > 0
      ) {
        this.Show = true;
      } else {
        this.errorMsg = "组名称不能为空";
        this.Show = false;
      }
      if (
        $(".groupName")
          .val()
          .trim().length > 50
      ) {
        this.errorMsg = "组名最多50个字";
        this.Show = false;
      }
    },
    checkedAll() {
      var checked = this.checkboxAll;
      var newdata = _.clone(this.getMetaData);
      var selectALL = true;
      for (const key in newdata) {
        newdata[key].Checked1 = checked;
        for (const key2 in newdata[key].child) {
          newdata[key].child[key2].Checked2 = checked;
        }
        this.getMetaData = newdata;
      }
      this.PowerShow = checked;
    },
    PowerCheckedAll(ev, item, m) {
      var checked = ev.target.checked;
      var newdata = _.clone(this.getMetaData);
      newdata[m].Checked1 = checked;
      this.getMetaData = newdata;
      for (const key in item.child) {
        const element = item.child[key];
        element.Checked2 = item.Checked1;
      }
      var PowerCheckedAll = true;
      for (const key2 in this.getMetaData) {
        const el = this.getMetaData[key2];
        if (!el.Checked1) {
          PowerCheckedAll = false;
        }
      }
      this.checkboxAll = PowerCheckedAll;
    },
    PowerList(eve, item2, item, m) {
      var checked = eve.target.checked;
      item2.Checked2 = checked;
      //判断上级要不要选中
      var itemChecked = true;
      for (const key in item.child) {
        const element = item.child[key];
        if (!element.Checked2) {
          itemChecked = false;
        }
      }
      var checkchild = true;
      for (const key1 in this.getMetaData) {
        const checklist = this.getMetaData[key1];
        for (const key2 in checklist.child) {
          const checklistcChild = checklist.child[key2];
          if (!checklistcChild.Checked2) {
            checkchild = false;
          }
        }
      }
      this.checkboxAll = checkchild;
      var newdata = _.clone(this.getMetaData);
      newdata[m].Checked1 = itemChecked;
      this.getMetaData = newdata;
    },
    smt_select_all() {
      var checked = this.smtSelectAll;
      var newdata = _.clone(this.SmtLimits);
      for (var key in newdata) {
        newdata[key].Checked = checked;
      }
      this.SmtLimits = newdata;
    },
    smt_code(event, item, m) {
      var checked = event.target.checked;
      var newdata = _.clone(this.SmtLimits);
      // console.log(newdata)
      newdata[m].Checked = checked;
      var smt_codeCheck = true;
      for (const key in this.SmtLimits) {
        const element = this.SmtLimits[key];
        // console.log(element);
        if (!element.Checked) {
          smt_codeCheck = false;
        }
      }
      this.smtSelectAll = smt_codeCheck;
      this.SmtLimits = newdata;
    }
  },
  mounted() {
    if (this.$router.history.current.name == "home") {
      this.setIsQuickLinkShow(true);
    } else {
      this.setIsQuickLinkShow(false);
    }

    this.getGroupinfo();
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
.ncsc-account-container {
  line-height: 20px;
  display: block;
  min-height: 20px;
  padding: 15px 0 10px 0;
}
.ncsc-account-all .checkbox,
.ncsc-account-container .checkbox {
  vertical-align: middle;
  margin-right: 0px;
}
label {
  vertical-align: middle;
}
.ncsc-account-container-list {
  font-size: 14px;
  vertical-align: top;
  display: inline-block;
  width: 83%;
}
.ncsc-account-container-lista {
  font-size: 14px;
  vertical-align: top;
  display: inline-block;
  width: 100%;
}
ul {
  width: 83%;
}
.ncsc-account-container h4 {
  font-size: 14px;
  font-weight: bold;
  vertical-align: top;
  display: inline-block;
  width: 14%;
  margin: 0 1%;
}
.ncsc-account-container-list li {
  font-size: 14px;
  line-height: 20px;
  vertical-align: middle;
  letter-spacing: normal;
  word-spacing: normal;
  display: inline-block;
  width: 25%;
  height: 20px;
  margin-bottom: 10px;
}
.ncsc-account-container-lista li {
  font-size: 14px;
  line-height: 20px;
  vertical-align: middle;
  letter-spacing: normal;
  word-spacing: normal;
  display: inline-block;
  width: 25%;
  height: 20px;
  margin-bottom: 10px;
}
.ncsc-account-container:nth-child(even) {
  background: #f9f9f9;
}
.ncsc-btn:hover {
  text-decoration: none;
  border-color: #ff8519;
  color: #ff8519;
}
</style>