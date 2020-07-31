import storage from "lib/utils/storage";
import util from "lib/utils/util"
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
            Groupname: '',
            Show: true,
            PowerShow: true,
            checkboxAll: false,
            checkboxListH4: false,
            smtSelectAll: false,
            errorMsg:""
        };
    },
    computed: {
    },
    methods: {
        ...mapMutations({
            setIsQuickLinkShow: "setIsQuickLinkShow"
        }),
        ...mapActions(["getSellerGroupInfo", 'saveGroup']),
        getGroupinfo(data) {
            this.getSellerGroupInfo({ groupId: data }).then(res => {
                this.getMetaData = res.menu
                this.SmtLimits = res.smtLimits
                this.GroupInfo = res.groupInfo;
                var arr = (res.groupInfo.limits).split(',')
                var arr1 = (res.groupInfo.smt_limits).split(',')
                this.CheckedList = arr1
                arr1.forEach((el) => {
                    for (const key in this.SmtLimits) {
                        var item = this.SmtLimits[key]
                        if (item.smt_code == el) {
                            item.Checked = true
                        }
                    }
                })
                for (const key1 in this.getMetaData) {
                    var item1 = this.getMetaData[key1]
                    item1.Checked1 = false
                    arr.forEach((el1) => {
                        for (const key2 in item1.child) {
                            var item2 = item1.child[key2]
                            if (item2.act == el1) {
                                item2.Checked2 = true
                            }
                        }
                    })
                }
                var smt_codeCheck = true;
                for (const key in this.SmtLimits) {
                    const elements = this.SmtLimits[key];
                    if (!elements.Checked) {
                        smt_codeCheck = false
                    }
                }
                this.smtSelectAll = smt_codeCheck;
                for (const key1 in this.getMetaData) {
                    const checklist = this.getMetaData[key1]
                    var checklistChecked = true
                    for (const key2 in checklist.child) {
                        const checklistcChild = checklist.child[key2]
                        if (!checklistcChild.Checked2) {
                            checklistChecked = false
                        }

                    }
                    checklist.Checked1 = checklistChecked
                }
                var PowerCheckedAll = true
                for (const key2 in this.getMetaData) {
                    const el = this.getMetaData[key2]
                    if (!el.Checked1) {
                        PowerCheckedAll = false
                    }
                }
                this.checkboxAll = PowerCheckedAll
            });
        },
        submit() {
            const checkboxList = this.$refs.checkboxList
            this.CheckLimits = []
            for (let dom of checkboxList) {
                if (dom.checked) {
                    this.CheckLimits.push(dom.id)
                }
            }
            if (this.GroupInfo.group_name.trim().length > 0) {
                this.Show = true
          
                if (this.CheckLimits.length > 0) {
                    this.PowerShow = true
                    var data = {
                        groupName: this.GroupInfo.group_name,
                        limits: this.CheckLimits,
                        groupId: this.GroupInfo.group_id
                    }
                    this.saveGroup(data).then(res => {
                        if (res.state) {
                            util.msg("编辑成功");
                            this.$router.push('group_list')
                        } else {
                            util.msg("编辑失败");
                        }
                    })
                } else {
                    this.PowerShow = false

                }
            } else {
                this.showChange()
                if (this.CheckLimits!=null&&this.CheckLimits.length > 0) {
                    this.PowerShow = true
                } else {
                    this.PowerShow = false

                }
            }
        },
        showChange() {
            if (
              $(".groupName").val().trim().length > 0
            ) {
              this.Show = true;
            } else {
              this.errorMsg = "组名称不能为空";
              this.Show = false;
            }
            if (
              $(".groupName").val().trim().length > 50
            ) {
              this.errorMsg = "组名最多50个字";
              this.Show = false;
            }
          },
        checkedAll() {
            var checked = this.checkboxAll
            var newdata = _.clone(this.getMetaData);
            var selectALL = true
            for (const key in newdata) {
                newdata[key].Checked1 = checked
                for (const key2 in newdata[key].child) {
                    newdata[key].child[key2].Checked2 = checked
                }
                this.getMetaData = newdata
            }
            this.PowerShow = checked;
        },
        PowerCheckedAll(ev, item, m) {

            var checked = ev.target.checked
            var newdata = _.clone(this.getMetaData);
            newdata[m].Checked1 = checked;
            this.getMetaData = newdata
            for (const key in item.child) {
                const element = item.child[key];
                element.Checked2 = item.Checked1
            }
            var PowerCheckedAll = true
            for (const key2 in this.getMetaData) {
                const el = this.getMetaData[key2]
                if (!el.Checked1) {
                    PowerCheckedAll = false
                }
            }
            this.checkboxAll = PowerCheckedAll
        },
        PowerList(eve, item2, item, m) {
            var checked = eve.target.checked
            item2.Checked2 = checked
            //判断上级要不要选中
            var itemChecked = true;
            for (const key in item.child) {
                const element = item.child[key];
                if (!element.Checked2) {
                    itemChecked = false;
                }
            }
            var checkchild = true
            for (const key1 in this.getMetaData) {
                const checklist = this.getMetaData[key1]
                for (const key2 in checklist.child) {
                    const checklistcChild = checklist.child[key2]
                    if (!checklistcChild.Checked2) {
                        checkchild = false
                    }
                }
            }
            this.checkboxAll = checkchild
            var newdata = _.clone(this.getMetaData);
            newdata[m].Checked1 = itemChecked;
            this.getMetaData = newdata
        },
        smt_select_all() {
            var checked = this.smtSelectAll
            var newdata = _.clone(this.SmtLimits);
            for (var key in newdata) {
                newdata[key].Checked = checked
            }
            this.SmtLimits = newdata
        },
        smt_code(event, item, m) {
            var checked = event.target.checked
            var newdata = _.clone(this.SmtLimits)
            newdata[m].Checked = checked
            var smt_codeCheck = true;
            for (const key in this.SmtLimits) {
                const element = this.SmtLimits[key];
                if (!element.Checked) {
                    smt_codeCheck = false
                }
            }
            this.smtSelectAll = smt_codeCheck;
            this.SmtLimits = newdata
        }
    },
    watch: {

    },
    mounted() {
        if (this.$router.history.current.name == 'home') {
            this.setIsQuickLinkShow(true);
        } else {
            this.setIsQuickLinkShow(false);
        }

        if (storage.get("Group_id")) {
            const data = storage.get("Group_id").groupId;
            this.getGroupinfo(data);
        } else {
            this.$router.go(-1)
            util.msg("参数错误!");
        }


    },
    beforeRouteLeave(to, from, next) {
        // window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        window.scrollTo(0,0);
        document.getElementsByClassName("routerContent")[0].scrollTop = 0;
        if (to.name == 'home') {
            this.setIsQuickLinkShow(true);
        } else {
            this.setIsQuickLinkShow(false);
        }
        next()
    },
};
