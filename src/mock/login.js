module.exports = {
  "status": "success",
  "resultCode": 1,
  "longMessage": "操作成功",
  "shortMessage": "操作成功",
  "encryptType": 2,
  "requestId": "1907166LRABKXUMBUBH",
  "requestTime": 1563269665,
  "responseTime": 1563269666,
  "responseContent": {
    "key": "b75cdc3fbf48f330820a4dbc87a584a4",
    "memberName": "八八号",
    "sellerId": 168,
    "memberMobile": "19959175788",
    "memberAvatar": "https://imgpre.shenbd.com/mall/avatar/member_avatar_1050021.jpg",
    "memberId": 1050021,
    "storeId": 1050000,
    "storeLabel": "https://imgpre.shenbd.com/mall/store/store_label_1050000.jpg?x-oss-process=image/resize,m_lfit,h_186,w_186",
    "storeName": "LQ日化用品日化用品进货",
    "allowMenu": {
      "store": {
        "name": "店铺管理",
        "type": "menu",
        "pname": "root",
        "child": {
          "dpsz": {
            "name": "店铺设置",
            "type": "menu",
            "pname": "store",
            "act": "store_setting",
            "op": "store_setting"
          },
          "jyflgl": {
            "name": "经营分类管理",
            "type": "menu",
            "pname": "store",
            "act": "qm_store_class",
            "op": "index"
          },
          "xsspfl": {
            "name": "销售商品分类",
            "type": "menu",
            "pname": "store",
            "act": "store_class",
            "op": "index"
          },
          "ggwgl": {
            "name": "广告位管理",
            "type": "menu",
            "pname": "store",
            "act": "store_ap_adv",
            "op": "adv_list_two"
          },
          "dpsytjfl": {
            "name": "店铺首页推荐分类",
            "type": "menu",
            "pname": "store",
            "act": "store_goods_class",
            "op": "index"
          },
          "xszfgl": {
            "name": "线上支付管理",
            "type": "menu",
            "pname": "store",
            "act": "store_payment",
            "op": "wxpay"
          }
        }
      },
      "goods": {
        "name": "商品管理",
        "type": "menu",
        "pname": "root",
        "child": {
          "spfb": {
            "name": "商品发布",
            "type": "menu",
            "pname": "goods",
            "act": "store_goods_add",
            "op": "index"
          },
          "cszdsp": {
            "name": "出售中的商品",
            "type": "menu",
            "pname": "goods",
            "act": "store_goods_online",
            "op": "index"
          },
          "ckzdsp": {
            "name": "仓库中的商品",
            "type": "menu",
            "pname": "goods",
            "act": "store_goods_offline",
            "op": "index"
          },
          "gysspk": {
            "name": "供应商商品库",
            "type": "menu",
            "pname": "goods",
            "act": "store_goods_storage",
            "op": "index"
          },
          "kcyj": {
            "name": "库存预警",
            "type": "menu",
            "pname": "goods",
            "act": "inventory_warning",
            "op": "index"
          }
        }
      },
      "order": {
        "name": "交易管理",
        "type": "menu",
        "pname": "root",
        "child": {
          "jydd": {
            "name": "交易订单",
            "type": "menu",
            "pname": "order",
            "act": "store_order",
            "op": "index"
          },
          "jd": {
            "name": "接单",
            "type": "menu",
            "pname": "order",
            "act": "store_receiving",
            "op": "index"
          },
          "shfw": {
            "name": "售后服务",
            "type": "menu",
            "pname": "order",
            "act": "store_refund",
            "op": "list"
          },
          "pjgl": {
            "name": "评价管理",
            "type": "menu",
            "pname": "order",
            "act": "store_evaluate",
            "op": "index"
          }
        }
      },
      "promotion": {
        "name": "营销中心",
        "type": "menu",
        "pname": "root",
        "child": {
          "zhxs": {
            "name": "组合销售",
            "type": "menu",
            "pname": "promotion",
            "act": "store_promotion_bundling",
            "op": "bundling_list"
          },
          "tghdgl": {
            "name": "推广活动管理",
            "type": "menu",
            "pname": "promotion",
            "act": "sale_act",
            "op": "index"
          },
          "yhqgl": {
            "name": "优惠券管理",
            "type": "menu",
            "pname": "promotion",
            "act": "store_coupon",
            "op": "index"
          }
        }
      },
      "data_center": {
        "name": "数据中心",
        "type": "menu",
        "pname": "root",
        "child": {
          "xsddjymx": {
            "name": "线上订单交易明细",
            "type": "menu",
            "pname": "data_center",
            "act": "store_transaction",
            "op": "index"
          },
          "xsjydt": {
            "name": "线上交易统计",
            "type": "menu",
            "pname": "data_center",
            "act": "store_total",
            "op": "online"
          },
          "xsyytj": {
            "name": "销售营业统计",
            "type": "menu",
            "pname": "data_center",
            "act": "store_sale_statistics",
            "op": "index"
          },
          "psypstj": {
            "name": "配送员配送统计",
            "type": "menu",
            "pname": "data_center",
            "act": "diliveryman",
            "op": "index"
          },
          "dphy": {
            "name": "店铺会员",
            "type": "menu",
            "pname": "data_center",
            "act": "favorites_store",
            "op": "tag"
          }
        }
      },
      "account": {
        "name": "账号",
        "type": "menu",
        "pname": "root",
        "child": {
          "zhlb": {
            "name": "账号列表",
            "type": "menu",
            "pname": "account",
            "act": "store_account",
            "op": "account_list"
          },
          "zhz": {
            "name": "账号组",
            "type": "menu",
            "pname": "account",
            "act": "store_account_group",
            "op": "group_list"
          },
          "zhrz": {
            "name": "账号日志",
            "type": "menu",
            "pname": "account",
            "act": "seller_log",
            "op": "log_list"
          }
        }
      }
    },
    "quickLink": {
      "store_class": {
        "name": "销售商品分类",
        "type": "menu",
        "pname": "store",
        "act": "store_class",
        "op": "index"
      },
      "store_refund": {
        "name": "售后服务",
        "type": "menu",
        "pname": "order",
        "act": "store_refund",
        "op": "list"
      },
      "store_setting": {
        "name": "店铺设置",
        "type": "menu",
        "pname": "store",
        "act": "store_setting",
        "op": "store_setting"
      },
      "store_sale_statistics": {
        "name": "销售营业统计",
        "type": "menu",
        "pname": "data_center",
        "act": "store_sale_statistics",
        "op": "index"
      },
      "store_goods_online": {
        "name": "出售中的商品",
        "type": "menu",
        "pname": "goods",
        "act": "store_goods_online",
        "op": "index"
      },
      "store_order": {
        "name": "交易订单",
        "type": "menu",
        "pname": "order",
        "act": "store_order",
        "op": "index"
      },
      "store_transaction": {
        "name": "线上订单交易明细",
        "type": "menu",
        "pname": "data_center",
        "act": "store_transaction",
        "op": "index"
      }
    }
  },
  "data": {
    "key": "71d2c67939f691ec8920a52945c1bf79",
    "mobile": "19959175788",
    "password": "123456"
  }
}
