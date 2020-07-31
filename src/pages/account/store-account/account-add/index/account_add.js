import { mapActions, mapMutations } from 'vuex';
import util from "lib/utils/util"
export default {
    name: "account_add",
    data() {
        return {
            Addphone: '',
            newCodeSecond: 0,
            isNewCodeSend: false,
            GroupList: [],
            slot_title: '提示信息',
            slot_content: '',
            CodeShow: '',
            TelShow: '',
            sellerMarkShow:true,
            telCode: '',
            selectedId: '',
            sellerMark:''
        };
    },
    methods: {
        ...mapMutations({
            setIsQuickLinkShow: 'setIsQuickLinkShow'
        }),
        ...mapActions(['getAccountGroupList', 'sendMsg', 'saveAccount']),
        getAddList() {
            this.getAccountGroupList().then((res) => {
                this.GroupList = res
                this.selectedId = res[0].group_id
            });
        },
        getNewCodeSecond() {
            if (this.isNewCodeSend) {
                if (this.newCodeSecond == 0) {
                    return "重新获取";
                } else {
                    return this.newCodeSecond + "s后重新获取";
                }
            } else {
                return "获取验证码";
            }
        },
        getChangeCode() {
            if (this.newCodeSecond > 0) {
                return
            }
            if (this.Addphone.trim().length > 0) {
                var Myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;

                if (Myreg.test(this.Addphone.trim())&&this.Addphone.length <=11) {
                    var data = {
                        tel: this.Addphone,
                        msgtype: 'addsale'
                    };

                    this.sendMsg(data).then(res => {

                        if (res.responseContent.length == 0) {
                            util.msg(res.longMessage);
                            return false
                        }
                        this.newCodeSecond = 60;
                        this.isNewCodeSend = true;
                        var intervalNew = setInterval(() => {
                            this.newCodeSecond -= 1;
                            if (this.newCodeSecond <= 0) {
                                clearInterval(intervalNew);
                                this.getNewCodeSecond()
                            }
                        }, 1000);
                        util.msg(res.longMessage);
                    });
                } else {
                    util.msg("手机号码输入有误");
                }

            } else {
                util.msg("手机号码不能为空");
            }

        },
        changeSelected(e) {
            this.selectedId = e.target.value
        },
        AccountSubmit() {
           if(this.sellerMark){
             this.sellerMarkShow = true;
           }else{
             this.sellerMarkShow = false;
           }
            if (this.telCode.trim().length > 0) {
                this.CodeShow = true
                var Myreg2 = /^[0-9]+$/
                if (Myreg2.test(this.telCode.trim()) && this.sellerMarkShow) {
                    var data2 = {
                        tel: this.Addphone,
                        code: this.telCode,
                        groupId: this.selectedId,
                        sellerMark : this.sellerMark
                    }
                    this.saveAccount(data2).then((res) => {
                        util.msg(res.longMessage);
                        if (res.responseContent.state == 1) {
                            this.$router.push('account_list')
                        }
                    })
                }

            } else {
                this.CodeShow = false
            }
            if (this.Addphone.trim().length > 0) {
                this.TelShow = true
            } else {
                this.TelShow = false
            }

        },

    },
    mounted() {
        if (this.$router.history.current.name == 'home') {
            this.setIsQuickLinkShow(true);
        } else {
            this.setIsQuickLinkShow(false);
        }

        this.getAddList();
        this.CodeShow = true;
        this.sellerMarkShow = true;
        this.TelShow = true;

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
