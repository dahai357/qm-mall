import QmTabs from 'component/qm-tabs/index';
import { mapActions, mapMutations } from 'vuex';
import * as _ from 'lodash';
import storage from 'lib/utils/storage';
import QmTable from 'component/qm-table/index';
import QmTips from 'component/qm-tips/index';
import util from "lib/utils/util"
export default {
   name: "log_list",
   data() {
      return {
         list: [],
         listGroup: [],
         qmtable: false,
         pageParams: {
            total: 0
         },
         delDialog: false,
         groupitem: {}
      }
   },
   methods: {
      ...mapMutations({
         setIsQuickLinkShow: 'setIsQuickLinkShow'
      }),
      ...mapActions(['getAccountList', 'delAccount']),
      getList() {
         this.getAccountList().then((res) => {
            this.list = res.sellerList
            this.listGroup = res.sellerGroupArray
            if (this.list == false) {
               var pageParams = _.clone(this.pageParams)
               this.pageParams.total = 0;
               this.pageParams = pageParams
            } else {
               this.list.forEach((el) => {
                  for (const key in this.listGroup) {
                     var item = this.listGroup[key];
                     if (item.group_id == el.seller_group_id) {
                        el.group_name = item.group_name
                     }
                  }
               })
            }



         })
      },
      edit(item) {
         storage.set('account_id', item)
         this.$router.push("account_edit")
      },
      delOne(item) {
         this.delDialog = true
         this.groupitem = item
      },
      confirmDel() {
         this.delAccount({ sellerId: this.groupitem.seller_id }).then((res) => {
            if (res.state == 1) {
               this.delDialog = false
               util.msg("操作成功");
               this.getList()
            } else {
               util.msg(res);
            }
         })
      }

   },
   watch: {
      '$route'(newRouter) {
         console.log(newRouter)
      },
   },
   mounted() {
      if (this.$router.history.current.name == 'home') {
         this.setIsQuickLinkShow(true);
      } else {
         this.setIsQuickLinkShow(false);
      }


      this.getList()
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
   components: {
      QmTabs,
      QmTable,
      QmTips
   }
}