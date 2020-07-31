import { mapActions, mapMutations } from 'vuex';
import storage from 'lib/utils/storage';
import util from "lib/utils/util"
export default {
    name: "account_edit",
    data() {
        return {
            name: "",
            groupId: '',
            GroupList: [],
            submitdata: {},
            changeGroupId: '',
            getItem: '',
            sellerMark:'',
            sellerMarkShow:true
        }
    },
    computed: {
    },
    methods: {
        ...mapMutations({
            setIsQuickLinkShow: 'setIsQuickLinkShow'
        }),
        ...mapActions(['getSellerInfo', 'getAccountGroupList', 'editSellerAccount']),
        getSeller(data) {
            this.getSellerInfo(data).then((res) => {
                this.submitdata = res;
                this.name = res.seller_name;
                this.groupId = res.seller_group_id;
                this.sellerMark = res.seller_mark;
            })
        },

        getGroupList() {
            this.getAccountGroupList().then((res) => {
                this.GroupList = res
            })
        },
        changeSelected(e) {
            this.groupId = e.target.value;
            this.changeGroupId = e.target.value;
        },
        submit() {
          if(this.sellerMark){
            this.sellerMarkShow = true;
          }else{
            this.sellerMarkShow = false;
          }
          if(this.sellerMarkShow){
           /* if (this.changeGroupId == '') {
              return util.msg('操作成功！'), this.$router.push('account_list')

            }*/
            const data = { sellerId: this.submitdata.seller_id, groupId: this.groupId,sellerMark : this.sellerMark}
            this.editSellerAccount(data).then((res) => {
              if (res.state == 1) {
                util.msg('操作成功！');
                this.$router.push('account_list')
              } else {
                util.msg(res);
              }
            })
          }
        },

    },
    mounted() {
        if (this.$router.history.current.name == 'home') {
            this.setIsQuickLinkShow(true);
        } else {
            this.setIsQuickLinkShow(false);
        }

        if (storage.get('account_id')) {
            this.getItem = storage.get('account_id')
            this.getSeller({ sellerId: this.getItem.seller_id })
            this.getGroupList()
        } else {
            this.$router.go(-1)
                util.msg('参数错误!')
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



}
