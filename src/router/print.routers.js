import Main from '@/components/main';

export default [
  {
    path: '/',
    name: '_home',
    redirect: '/order/store_receiving/order_print/156',
    component: Main,
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: '商家中心'
        },
        // component: () => import('@/pages/home/index')
        //懒加载
        component: resolve => require(['@/pages/home/index.vue'], resolve),
      },
      {
        path: '/article',
        name: 'article',
        // component: () => import('@/pages/home/article-index'),
        component: resolve => require(['@/pages/home/article-index'], resolve),
        children: [
          {
            path: '/',
            name: '',
            redirect: '/article/index',
          },
          {
            path: '/article/index',
            name: 'article_index',
            // component: () => import('@/pages/home/article/index'),
            component: resolve => require(['@/pages/home/article/index'], resolve),
          },
          {
            path: '/article/detail/:id?',
            name: 'article_detail',
            // component: () => import('@/pages/home/article/detail'),
            component: resolve => require(['@/pages/home/article/detail'], resolve),
          },
        ]
      },
      {
        path: '/store',
        name: 'store',
        // component: () => import('@/pages/store/index'),
        component: resolve => require(['@/pages/store/index'], resolve),
        children: [
          {
            path: '/',
            name: '',
            redirect: '/store/store_setting',
          },
          {
            path: '/store/store_setting',
            name: 'store_setting',
            redirect: '/store/store_setting/store_setting',
            meta: {
              title: '店铺设置',
              text:"商家中心"
            },
            // component: () => import('@/pages/store/store-setting/index'),
            component: resolve => require(['@/pages/store/store-setting/index'], resolve),
            children: [
              {
                path: '/store/store_setting/store_setting',
                name: 'base',
                // component: () => import('@/pages/store/store-setting/base/index'),
                component: resolve => require(['@/pages/store/store-setting/base/index'], resolve),
              },
              {
                path: '/store/store_setting/store_pay',
                name: 'pay',
                // component: () => import('@/pages/store/store-setting/pay/index'),
                component: resolve => require(['@/pages/store/store-setting/pay/index'], resolve),
              },
              {
                path: '/store/store_setting/store_distribution',
                name: 'distribution',
                // component: () => import('@/pages/store/store-setting/distribution/index'),
                component: resolve => require(['@/pages/store/store-setting/distribution/index'], resolve),
              },
              {
                path: '/store/store_setting/store_config',
                name: 'searchConfig',
                // component: () => import('@/pages/store/store-setting/searchConfig/index'),
                component: resolve => require(['@/pages/store/store-setting/searchConfig/index'], resolve),
              },
              {
                path: '/store/store_setting/store_print',
                name: 'store_print',
                // component: () => import('@/pages/store/store-setting/print/index'),
                component: resolve => require(['@/pages/store/store-setting/print/index'], resolve),
              },
              {
                path: '/store/store_setting/store_switch',
                name: 'switch',
                // component: () => import('@/pages/store/store-setting/switch/index'),
                component: resolve => require(['@/pages/store/store-setting/switch/index'], resolve),
              },
            ]
          },
          {
            path: '/store/qm_store_class',
            name: 'qm_store_class',
            meta: {
              title: '经营分类管理'
            },
            // component: () => import('@/pages/store/qm-store-class/index'),
            component: resolve => require(['@/pages/store/qm-store-class/index'], resolve),
            redirect: '/store/qm_store_class/index',
            children: [
              {
                path: '/store/qm_store_class/index',
                name: 'qm_store_class_base',
                meta: {
                  title: '分类管理'
                },
                // component: () => import('@/pages/store/qm-store-class/base/index'),
                component: resolve => require(['@/pages/store/qm-store-class/base/index'], resolve),
              },
              {
                path: '/store/qm_store_class/service_fee_list',
                name: 'qm_store_class_record',
                meta: {
                  title: '分类缴费记录'
                },
                // component: () => import('@/pages/store/qm-store-class/record/index'),
                component: resolve => require(['@/pages/store/qm-store-class/record/index'], resolve),
              },
              {
                path: '/store/qm_store_class/deposit_list',
                name: 'qm_store_class_corespondece',
                meta: {
                  title: '保证金往来记录'
                },
                // component: () => import('@/pages/store/qm-store-class/corespondece/index'),
                component: resolve => require(['@/pages/store/qm-store-class/corespondece/index'], resolve),
              },
              {
                path: '/store/qm_store_class/class_invoice_log',
                name: 'qm_store_class_invoice',
                meta: {
                  title: '开票申请'
                },
                // component: () => import('@/pages/store/qm-store-class/invoice/index'),
                component: resolve => require(['@/pages/store/qm-store-class/invoice/index'], resolve),
              }
            ]
          },
          {
            path: '/store/store_class',
            name: 'store_class',
            redirect: '/store/store_class/index',
            meta: {
              title: '销售商品分类'
            },
            // component: () => import('@/pages/store/store-class/index'),
            component: resolve => require(['@/pages/store/store-class/index'], resolve),
            children: [
              {
                path: '/store/store_class/index',
                name: 'store_class_base',
                meta: {
                  title: '分类列表'
                },
                // component: () => import('@/pages/store/store-class/base/index'),
                component: resolve => require(['@/pages/store/store-class/base/index'], resolve),
              },
              {
                path: '/store/store_class/advertisements',
                name: 'store_class_advertisements',
                meta: {
                  title: '广告视图'
                },
                // component: () => import('@/pages/store/store-class/advertisements/index'),
                component: resolve => require(['@/pages/store/store-class/advertisements/index'], resolve),
              }
            ]
          },
          {
            path: '/store/store_ap_adv',
            name: 'store_ap_adv',
            meta: {
              title: '广告位管理'
            },
            // component: () => import('@/pages/store/store-ap-adv/index'),
            component: resolve => require(['@/pages/store/store-ap-adv/index'], resolve),
            redirect: '/store/store_ap_adv/index',
            children: [
              {
                path: '/store/store_ap_adv/adv_list_two',
                name: 'store_ap_adv_adv_list_two',
                meta: {
                  title: '分类列表'
                },
                // component: () => import('@/pages/store/store-ap-adv/adv_list_two/index'),
                component: resolve => require(['@/pages/store/store-ap-adv/adv_list_two/index'], resolve),
              },
            ]
          },
          {
            path: '/store/store_goods_class',
            name: 'store_goods_class',
            meta: {
              title: '首页推荐分类'
            },
            // component: () => import('@/pages/store/store-goods-class/index'),
            component: resolve => require(['@/pages/store/store-goods-class/index'], resolve),
            redirect: '/store/store_goods_class/index',
            children: [
              {
                path: '/store/store_goods_class/index',
                name: 'store_goods_class_base',
                meta: {
                  title: '分类列表'
                },
                // component: () => import('@/pages/store/store-goods-class/base/index'),
                component: resolve => require(['@/pages/store/store-goods-class/base/index'], resolve),
              },
              {
                path: '/store/store_goods_class/store_goods/:stc_id/:stc_name/:show_type',
                name: 'store_goods_class_store_goods',
                meta: {
                  title: '分类列表'
                },
                // component: () => import('@/pages/store/store-goods-class/store_goods/index'),
                component: resolve => require(['@/pages/store/store-goods-class/store_goods/index'], resolve),
              },
            ]
          },
          {
            path: '/store/store_payment',
            name: 'store_payment',
            meta: {
              title: '线上支付管理'
            },
            // component: () => import('@/pages/store/store-payment/index'),
            component: resolve => require(['@/pages/store/store-payment/index'], resolve),
            redirect: '/store/store_payment/wxpay',
            children: [
              {
                path: '/store/store_payment/wxpay',
                name: 'store_payment_wxpay',
                meta: {
                  title: '线上支付管理'
                },
                // component: () => import('@/pages/store/store-payment/base/index'),
                component: resolve => require(['@/pages/store/store-payment/base/index'], resolve),
              }
            ]
          },
          {
            path: '/store/store_delivery',
            name: 'store_delivery',
            meta: {
              title: '达达配送管理'
            },
            component: resolve => require(['@/pages/store/store_delivery/index'], resolve),
            redirect: '/store/store_delivery/dada',
            children: [
              {
                path: '/store/store_delivery/dada',
                name: 'store_delivery_dada',
                meta: {
                  title: '达达配送管理'
                },
                component: resolve => require(['@/pages/store/store_delivery/dada/index'], resolve),
              },
              {
                path: '/store/store_delivery/recharge',
                name: 'store_delivery_recharge',
                meta: {
                  title: '达达账户充值'
                },
                component: resolve => require(['@/pages/store/store_delivery/recharge/index'], resolve),
              }
            ]
          }
        ]
      },
      {
        path: '/goods',
        name: 'goods',
        // component: () => import('@/pages/goods/index'),
        component: resolve => require(['@/pages/goods/index'], resolve),
        children: [
          {
            path: '/',
            name: 'goods_index',
            redirect: '/goods/store_goods_add'
          },
          {
            path: '/goods/store_goods_add/index',
            name: 'store_goods_add_index',
            redirect: '/goods/store_goods_add'
          },
          {
            path: '/goods/store_goods_add',
            name: 'store_goods_add',
            meta: {
              title: '商品发布'
            },
            // component: () => import('@/pages/goods/store-goods-add/index'),
            component: resolve => require(['@/pages/goods/store-goods-add/index'], resolve),
            children: [
              {
                path: '/',
                name: '',
                redirect: '/goods/store_goods_add/add_step_one'
              },
              {
                path: '/goods/store_goods_add',
                name: '',
                redirect: '/goods/store_goods_add/add_step_one'
              },
              {
                path: '/goods/store_goods_add/add_step_one/:commonId?/:gc_id_1?/:gc_id_2?/:gc_id_3?/:is_system?',
                name: 'store_goods_add_step_one',
                // component: () => import('@/pages/goods/store-goods-add/add_step_one/index'),
                component: resolve => require(['@/pages/goods/store-goods-add/add_step_one/index'], resolve),
              },
              {
                path: '/goods/store_goods_add/add_step_two/:classId?/:isStoreThird?/:commonId',
                name: 'store_goods_add_step_two',
                // component: () => import('@/pages/goods/store-goods-add/add_step_two/index'),
                component: resolve => require(['@/pages/goods/store-goods-add/add_step_two/index'], resolve),
              },
              {
                path: '/goods/store_goods_add/add_step_three/:commonId/:type?',
                name: 'store_goods_add_step_three',
                // component: () => import('@/pages/goods/store-goods-add/add_step_three/index'),
                component: resolve => require(['@/pages/goods/store-goods-add/add_step_three/index'], resolve),
              },
              {
                path: '/goods/store_goods_add/add_step_four/:commonId?',
                name: 'store_goods_add_step_four',
                // component: () => import('@/pages/goods/store-goods-add/add_step_four/index'),
                component: resolve => require(['@/pages/goods/store-goods-add/add_step_four/index'], resolve),
              },
            ]
          },
          {
            path: '/goods/store_goods_online',
            name: 'store_goods_online',
            meta: {
              title: '出售中的商品'
            },
            // component: () => import('@/pages/goods/store-goods-online/index'),
            component: resolve => require(['@/pages/goods/store-goods-online/index'], resolve),
            children: [
              {
                path: '/',
                name: '',
                redirect: '/goods/store_goods_online/index'
              },
              {
                path: '/goods/store_goods_online/index',
                name: 'store_goods_online_index',
                // component: () => import('@/pages/goods/store-goods-online/index/index'),
                component: resolve => require(['@/pages/goods/store-goods-online/index/index'], resolve),
                meta: {
                  keepAlive: true
                }
              },
            ]
          },
          {
            path: '/goods/store_goods_offline',
            name: 'store_goods_offline',
            meta: {
              title: '仓库中的商品'
            },
            // component: () => import('@/pages/goods/store-goods-offline/index'),
            component: resolve => require(['@/pages/goods/store-goods-offline/index'], resolve),
            children: [
              {
                path: '/',
                name: '',
                redirect: '/goods/store_goods_offline/index'
              },
              {
                path: '/goods/store_goods_offline/index',
                name: 'store_goods_offline_index',
                // component: () => import('@/pages/goods/store-goods-offline/index/index'),
                component: resolve => require(['@/pages/goods/store-goods-offline/index/index'], resolve),
                meta: {
                  keepAlive: true
                }
              },
              {
                path: '/goods/store_goods_offline/lockup',
                name: 'store_goods_offline_lockup',
                // component: () => import('@/pages/goods/store-goods-offline/lockup/index'),
                component: resolve => require(['@/pages/goods/store-goods-offline/lockup/index'], resolve),
                meta: {
                  keepAlive: true
                }
              },
              {
                path: '/goods/store_goods_offline/waitverify',
                name: 'store_goods_offline_waitverify',
                // component: () => import('@/pages/goods/store-goods-offline/waitverify/index'),
                component: resolve => require(['@/pages/goods/store-goods-offline/waitverify/index'], resolve),
                meta: {
                  keepAlive: true
                }
              },
            ]
          },
          {
            path: '/goods/store_goods_storage',
            name: 'store_goods_storage',
            meta: {
              title: '供应商商品库'
            },
            // component: () => import('@/pages/goods/store-goods-storage/index'),
            component: resolve => require(['@/pages/goods/store-goods-storage/index'], resolve),
            children: [
              {
                path: '/',
                name: '',
                redirect: '/goods/store_goods_storage/index'
              },
              {
                path: '/goods/store_goods_storage/index',
                name: 'store_goods_storage_index',
                // component: () => import('@/pages/goods/store-goods-storage/index/index'),
                component: resolve => require(['@/pages/goods/store-goods-storage/index/index'], resolve),
                meta: {
                  storageKeepAlive: true
                }
              },
              {
                path: '/goods/store_goods_storage/view/:commonId',
                name: 'store_goods_storage_view',
                // component: () => import('@/pages/goods/store-goods-storage/view/index'),
                component: resolve => require(['@/pages/goods/store-goods-storage/view/index'], resolve),
              }
            ]
          },
          {
            path: '/goods/inventory_warning',
            name: 'inventory_warning',
            meta: {
              title: '库存预警'
            },
            // component: () => import('@/pages/goods/inventory-warning/index'),
            component: resolve => require(['@/pages/goods/inventory-warning/index'], resolve),
            children: [
              {
                path: '/',
                name: '',
                redirect: '/goods/inventory_warning/index'
              },
              {
                path: '/goods/inventory_warning/index',
                name: 'inventory_warning_index',
                // component: () => import('@/pages/goods/inventory-warning/index/index'),
                component: resolve => require(['@/pages/goods/inventory-warning/index/index'], resolve),
              }
            ]
          }
        ]
      },
      {
        path: '/order',
        name: 'order',
        // component: () => import('@/pages/order/index'),
        component: resolve => require(['@/pages/order/index'], resolve),
        children: [
          {
            path: '/',
            name: 'order_index',
            redirect: '/order/store_order',
          },
          {
            path: '/order/store_evaluate',
            name: 'store_evaluate',
            meta: {
              title: '评价管理'
            },
            // component: () => import('@/pages/order/store-evaluate/index'),
            component: resolve => require(['@/pages/order/store-evaluate/index'], resolve),
            children: [
              {
                path: '/',
                name: 'store_evaluate_index',
                redirect: '/order/store_evaluate/list',
              },
              {
                path: '/order/store_evaluate/list',
                name: 'store_evaluate_list',
                component: () => import('@/pages/order/store-evaluate/list/index'),
                component: resolve => require(['@/pages/order/store-evaluate/list/index'], resolve),
              },
              {
                path: '/order/store_evaluate/templates',
                name: 'store_evaluate_templates',
                // component: () => import('@/pages/order/store-evaluate/templates/index'),
                component: resolve => require(['@/pages/order/store-evaluate/templates/index'], resolve),
              },
            ]
          },
          {
            path: '/order/store_refund',
            name: 'store_refund',
            meta: {
              title: '售后服务'
            },
            // component: () => import('@/pages/order/store-refund/index'),
            component: resolve => require(['@/pages/order/store-refund/index'], resolve),
            children: [
              {
                path: '/',
                name: 'store_refund_base',
                redirect: '/order/store_refund/refund',
              },
              {
                path: '/order/store_refund/index',
                name: 'store_refund_index',
                redirect: '/order/store_refund/refund',
              },
              {
                path: '/order/store_refund/refund',
                name: 'store_refund_refund',
                // component: () => import('@/pages/order/store-refund/refund/index'),
                component: resolve => require(['@/pages/order/store-refund/refund/index'], resolve),
              },
              {
                path: '/order/store_refund/return',
                name: 'store_refund_return',
                // component: () => import('@/pages/order/store-refund/refund/index'),
                component: resolve => require(['@/pages/order/store-refund/refund/index'], resolve),
              },
              {
                path: '/order/store_refund/return_wait',
                name: 'store_refund_return_wait',
                // component: () => import('@/pages/order/store-refund/refund/index'),
                component: resolve => require(['@/pages/order/store-refund/refund/index'], resolve),
              },
              {
                path: '/order/store_refund/wx_refund',
                name: 'store_refund_wx_refund',
                // component: () => import('@/pages/order/store-refund/refund/index'),
                component: resolve => require(['@/pages/order/store-refund/refund/index'], resolve),
              },
            ]
          },
          {
            path: '/order/store_order',
            name: 'store_order',
            redirect: '/order/store_order/index/index',
            meta: {
              title: '交易订单'
            },
            // component: () => import('@/pages/order/store-order/index'),
            component: resolve => require(['@/pages/order/store-order/index'], resolve),
            children: [
              {
                path: '/order/store_order/index',
                name: 'store_order_index',
                redirect: '/order/store_order/index/index',
                // component: () => import('@/pages/order/store-order/base/index'),
                component: resolve => require(['@/pages/order/store-order/base/index'], resolve),
              },
              {
                path: '/order/store_order/index/:state_type',
                name: 'store_order_index',
                // component: () => import('@/pages/order/store-order/base/index'),
                component: resolve => require(['@/pages/order/store-order/base/index'], resolve),
              },
            ]
          },
          {
            path: '/order/store_receiving',
            name: 'store_receiving',
            redirect: '/order/store_receiving/index',
            meta: {
              title: '接单'
            },
            // component: () => import('@/pages/order/store-receiving/index'),
            component: resolve => require(['@/pages/order/store-receiving/index'], resolve),
            children: [
              {
                path: '/order/store_receiving/index',
                name: 'store_receiving_index',
                // component: () => import('@/pages/order/store-receiving/base/index'),
                component: resolve => require(['@/pages/order/store-receiving/base/index'], resolve),
                meta: {
                  title: '接单'
                },
              },
              {
                path: '/order/store_receiving/order_print/:order_id',
                name: 'store_order_order_print',
                // component: () => import('@/pages/order/store-receiving/order-print/index'),
                component: resolve => require(['@/pages/order/store-receiving/order-print/index'], resolve),
                meta: {
                  title: '打印订单',
                  text:'打印订单'
                },
              },
            ]
          }
        ]
      },
      {
        path: '/data_center',
        name: 'data_center',
        // component: () => import('@/pages/data_center/index'),
        component: resolve => require(['@/pages/data_center/index'], resolve),
        children: [
          {
            path: '/data_center/store_transaction',
            name: 'store_transaction',
            meta: {
              title: '线上订单交易明细'
            },
            // component: () => import('@/pages/data_center/store_transaction/index'),
            component: resolve => require(['@/pages/data_center/store_transaction/index'], resolve),
            children: [
              {
                path: '/',
                name: '',
                redirect: '/data_center/store_transaction/index',
              },
              {
                path: '/data_center/store_transaction/index',
                name: 'store_transaction_base',
                meta: {
                  title: '线上订单交易明细列表页'
                },
                // component: () => import('@/pages/data_center/store_transaction/base/index'),
                component: resolve => require(['@/pages/data_center/store_transaction/base/index'], resolve),
              }
            ]
          },
          {
            path: '/data_center/store_total',
            name: 'store_total',
            meta: {
              title: '线上交易统计'
            },
            // component: () => import('@/pages/data_center/store_total/index'),
            component: resolve => require(['@/pages/data_center/store_total/index'], resolve),
            children: [
              {
                path: '/',
                name: '',
                redirect: '/data_center/store_total/online',
              },
              {
                path: '/data_center/store_total/online',
                name: 'store_total_online',
                meta: {
                  title: '线上交易统计'
                },
                // component: () => import('@/pages/data_center/store_total/online/index'),
                component: resolve => require(['@/pages/data_center/store_total/online/index'], resolve),
              }
            ]
          },
          {
            path: '/data_center/store_transaction_offline',
            name: 'store_transaction_offline',
            meta: {
              title: '线下订单交易明细'
            },
            // component: () => import('@/pages/data_center/store_transaction_offline/index'),
            component: resolve => require(['@/pages/data_center/store_transaction_offline/index'], resolve),
            children: [
              {
                path: '/',
                name: '',
                redirect: '/data_center/store_transaction_offline/index',
              },
              {
                path: '/data_center/store_transaction_offline/index',
                name: 'store_transaction_offline_base',
                meta: {
                  title: '线下订单交易明细列表页'
                },
                // component: () => import('@/pages/data_center/store_transaction_offline/base/index'),
                component: resolve => require(['@/pages/data_center/store_transaction_offline/base/index'], resolve),
              }
            ]
          },
          {
            path: '/data_center/store_sale_statistics',
            name: 'store_sale_statistics',
            meta: {
              title: '销售营业统计'
            },
            // component: () => import('@/pages/data_center/store_sale_statistics/index'),
            component: resolve => require(['@/pages/data_center/store_sale_statistics/index'], resolve),
            children: [
              {
                path: '/',
                name: '',
                redirect: '/data_center/store_sale_statistics/index',
              },
              {
                path: '/data_center/store_sale_statistics/index',
                name: 'store_sale_statistics_base',
                meta: {
                  title: '销售营业统计列表页'
                },
                // component: () => import('@/pages/data_center/store_sale_statistics/base/index'),
                component: resolve => require(['@/pages/data_center/store_sale_statistics/base/index'], resolve),
              }
            ]
          },
          {
            path: '/data_center/diliveryman',
            name: 'diliveryman',
            meta: {
              title: '配送员配送统计'
            },
            // component: () => import('@/pages/data_center/diliveryman/index'),
            component: resolve => require(['@/pages/data_center/diliveryman/index'], resolve),
            children: [
              {
                path: '/',
                name: '',
                redirect: '/data_center/diliveryman/index',
              },
              {
                path: '/data_center/diliveryman/index',
                name: 'diliveryman',
                meta: {
                  title: '配送员配送统计列表页'
                },
                // component: () => import('@/pages/data_center/diliveryman/base/index'),
                component: resolve => require(['@/pages/data_center/diliveryman/base/index'], resolve),
              },
              {
                path: '/data_center/diliveryman/delivery_eval_label',
                name: 'delivery_eval_label',
                meta: {
                  title: '配送员评价标签库'
                },
                // component: () => import('@/pages/data_center/diliveryman/delivery_eval_label/index'),
                component: resolve => require(['@/pages/data_center/diliveryman/delivery_eval_label/index'], resolve),
              },
              {
                path: '/data_center/diliveryman/label_add',
                name: 'label_add',
                meta: {
                  title: '添加/编辑配送员标签'
                },
                // component: () => import('@/pages/data_center/diliveryman/label_add/index'),
                component: resolve => require(['@/pages/data_center/diliveryman/label_add/index'], resolve),
              },
            ]
          },
          {
            path: '/data_center/favorites_store',
            name: 'favorites_store',
            meta: {
              title: '店铺会员'
            },
            // component: () => import('@/pages/data_center/favorites_store/index'),
            component: resolve => require(['@/pages/data_center/favorites_store/index'], resolve),
            children: [
              {
                path: '/',
                name: '',
                redirect: '/data_center/diliveryman/index',
              },
              {
                path: '/data_center/diliveryman/index',
                name: 'diliveryman',
                meta: {
                  title: '配送员配送统计列表页'
                },
                // component: () => import('@/pages/data_center/diliveryman/base/index'),
                component: resolve => require(['@/pages/data_center/diliveryman/base/index'], resolve),
              },
              {
                path: '/data_center/diliveryman/delivery_eval_label',
                name: 'delivery_eval_label',
                meta: {
                  title: '配送员评价标签库'
                },
                // component: () => import('@/pages/data_center/diliveryman/delivery_eval_label/index'),
                component: resolve => require(['@/pages/data_center/diliveryman/delivery_eval_label/index'], resolve),
              }
            ]
          },
          {
            path: '/data_center/favorites_store',
            name: 'favorites_store',
            meta: {
              title: '店铺会员'
            },
            // component: () => import('@/pages/data_center/favorites_store/index'),
            component: resolve => require(['@/pages/data_center/favorites_store/index'], resolve),
            children: [
              {
                path: '/',
                name: '',
                redirect: '/data_center/favorites_store/tag',
              },
              {
                path: '/data_center/favorites_store/tag',
                name: 'favorites_store',
                meta: {
                  title: '店铺会员列表'
                },
                // component: () => import('@/pages/data_center/favorites_store/tag/index'),
                component: resolve => require(['@/pages/data_center/favorites_store/tag/index'], resolve),
              },
              {
                path: '/data_center/favorites_store/tag_index',
                name: 'tag_index',
                meta: {
                  title: '会员标签管理'
                },
                // component: () => import('@/pages/data_center/favorites_store/tag_index/index'),
                component: resolve => require(['@/pages/data_center/favorites_store/tag_index/index'], resolve),
              }
            ]
          },
        ]
      }, {
        path: '/promotion',
        name: 'promotion',
        // component: () => import('@/pages/promotion/index'),
        component: resolve => require(['@/pages/promotion/index'], resolve),
        children: [
          {
            path: '/',
            name: 'promotion_index',
            redirect: '/promotion/store_promotion_bundling',
          },
          {
            path: '/promotion/store_promotion_bundling',
            name: 'store_promotion_bundling',
            meta: {
              title: '组合销售'
            },
            // component: () => import('@/pages/promotion/store-promotion-bundling/index'),
            component: resolve => require(['@/pages/promotion/store-promotion-bundling/index'], resolve),
            children: [
              {
                path: '/',
                name: 'store_promotion_bundling_index',
                redirect: '/promotion/store_promotion_bundling/bundling_list',
              },
              {
                path: '/promotion/store_promotion_bundling/bundling_list',
                name: 'store_promotion_bundling_list',
                // component: () => import('@/pages/promotion/store-promotion-bundling/bundling-list/index'),
                component: resolve => require(['@/pages/promotion/store-promotion-bundling/bundling-list/index'], resolve),
              },
              {
                path: '/promotion/store_promotion_bundling/bundling_add',
                name: 'store_promotion_bundling_list',
                // component: () => import('@/pages/promotion/store-promotion-bundling/bundling-add/index'),
                component: resolve => require(['@/pages/promotion/store-promotion-bundling/bundling-add/index'], resolve),
              },
            ]
          }, {
            path: '/promotion/sale_act',
            name: 'sale_act',
            meta: {
              title: '推广活动管理'
            },
            // component: () => import('@/pages/promotion/sale-act/index'),
            component: resolve => require(['@/pages/promotion/sale-act/index'], resolve),
            children: [
              {
                path: '/',
                name: 'sale_act_home',
                redirect: '/promotion/sale_act/index',
              },
              {
                path: '/promotion/sale_act/index',
                name: 'sale_act_list',
                // component: () => import('@/pages/promotion/sale-act/list'),
                component: resolve => require(['@/pages/promotion/sale-act/list'], resolve),
              },
              {
                path: '/promotion/sale_act/sale_act_add',
                name: 'sale_act_add',
                // component: () => import('@/pages/promotion/sale-act/sale-act-add'),
                component: resolve => require(['@/pages/promotion/sale-act/sale-act-add'], resolve),
              },
              {
                path: '/promotion/sale_act/salesman_list',
                name: 'salesman_list',
                // component: () => import('@/pages/promotion/sale-act/salesman-list'),
                component: resolve => require(['@/pages/promotion/sale-act/salesman-list'], resolve),
              },
              {
                path: '/promotion/sale_act/salegoods_list',
                name: 'salegoods_list',
                // component: () => import('@/pages/promotion/sale-act/salegoods-list'),
                component: resolve => require(['@/pages/promotion/sale-act/salegoods-list'], resolve),
              },
            ]
          },
          {
            path: '/promotion/store_coupon',
            name: 'store_coupon',
            meta: {
              title: '优惠券管理'
            },
            // component: () => import('@/pages/promotion/store-coupon/index'),
            component: resolve => require(['@/pages/promotion/store-coupon/index'], resolve),
            children: [
              {
                path: '/',
                name: 'store_coupon_home',
                redirect: '/promotion/store_coupon/index'
              },
              {
                path: '/promotion/store_coupon/index',
                name: 'store_coupon_index',
                // component: () => import('@/pages/promotion/store-coupon/index/index'),
                component: resolve => require(['@/pages/promotion/store-coupon/index/index'], resolve),
              },
              {
                path: '/promotion/store_coupon/add',
                name: 'store_coupon_add',
                // component: () => import('@/pages/promotion/store-coupon/add/index'),
                component: resolve => require(['@/pages/promotion/store-coupon/add/index'], resolve),
              },
              {
                path: '/promotion/store_coupon/show',
                name: 'store_coupon_show',
                // component: () => import('@/pages/promotion/store-coupon/show/index'),
                component: resolve => require(['@/pages/promotion/store-coupon/show/index'], resolve),
              },
            ]
          }
        ]
      },
    ]
  },
  {
    path: '/account',
    name: 'account',
    component: Main,
    children: [
      {
        path: '/account/store_info',
        name: 'store_info',
        meta: {
          title: '店铺信息'
        },
        // component: () => import('@/pages/account/store-info/index'),
        component: resolve => require(['@/pages/account/store-info/index'], resolve),
        children: [{
          path: "/",
          name: '',
          redirect: "/account/store_info/index"
        }, {
          path: '/account/store_info/index',
          name: 'store_info/index',
          meta: {
            title: '店铺信息'
          },
          // component: () => import('@/pages/account/store-info/index/index'),
          component: resolve => require(['@/pages/account/store-info/index/index'], resolve),
        }]
      }, {
        path: '/account/store_account_group',
        name: 'store_account_group',
        meta: {
          title: '账号组列表'
        },
        // component: () => import('@/pages/account/store-account-group/index'),
        component: resolve => require(['@/pages/account/store-account-group/index'], resolve),
        children: [
          {
            path: '/',
            name: '',
            redirect: "group_list"
          },
          {
            path: '/account/store_account_group/group_list',
            name: 'store-account-group/group-list',
            meta: {
              title: '账号组列表'
            },
            // component: () => import('@/pages/account/store-account-group/group-list/index')
            component: resolve => require(['@/pages/account/store-account-group/group-list/index'], resolve),
          },
          {
            path: '/account/store_account_group/group_edit',
            name: 'store-account-group/group-edit',
            meta: {
              title: '账号组编辑'
            },
            // component: () => import('@/pages/account/store-account-group/group-edit/index')
            component: resolve => require(['@/pages/account/store-account-group/group-edit/index'], resolve),

          },
          {
            path: '/account/store_account_group/group_add',
            name: 'store-account-group/group-add',
            meta: {
              title: '账号组编辑'
            },
            // component: () => import('@/pages/account/store-account-group/group-add/index')
            component: resolve => require(['@/pages/account/store-account-group/group-add/index'], resolve),

          }
        ]
      }
      , {
        path: '/account/store_account',
        name: 'store_account',
        meta: {
          title: '账号列表'
        },
        // component: () => import('@/pages/account/store-account/index'),
        component: resolve => require(['@/pages/account/store-account/index'], resolve),
        children: [{
          path: '/',
          name: '',
          redirect: "account/store_account/account_list"
        }, {
          path: '/account/store_account/account_list',
          name: 'store_account/account_list',
          meta: {
            title: '账号列表'
          },
          // component: () => import('@/pages/account/store-account/account-list/index')
          component: resolve => require(['@/pages/account/store-account/account-list/index'], resolve),

        },
        {
          path: '/account/store_account/account_edit',
          name: 'store_account/account_edit',
          meta: {
            title: '编辑账号'
          },
          // component: () => import('@/pages/account/store-account/account-edit/index')
          component: resolve => require(['@/pages/account/store-account/account-edit/index'], resolve),

        },
        {
          path: '/account/store_account/account_add',
          name: 'store_account/account_add',
          meta: {
            title: '添加账号'
          },
          // component: () => import('@/pages/account/store-account/account-add/index')
          component: resolve => require(['@/pages/account/store-account/account-add/index'], resolve),

        },
        ]
      },
      {
        path: '/account/seller_log',
        name: 'seller_log',
        meta: {
          title: '账号日志'
        },
        // component: () => import('@/pages/account/seller-log/index'),
        component: resolve => require(['@/pages/account/seller-log/index'], resolve),
        children: [{
          path: '/',
          name: '',
          redirect: "/account/seller_log/log_list"

        }, {
          path: '/account/seller_log/log_list',
          name: '/seller_log/log_list',
          meta: {
            title: '账号日志'
          },
          // component: () => import('@/pages/account/seller-log/log-list/index')
          component: resolve => require(['@/pages/account/seller-log/log-list/index'], resolve),
        }
        ]

      },
    ]
  },
  {
    path: '/change_pwd',
    name: '/change_pwd',
    component: Main,
    children: [{
      path: '/',
      name: '',
      redirect: "/change_pwd/change_pwd"
    },
    {
      path: '/change_pwd/change_pwd',
      name: '/change_pwd/change_pwd',
      // component: () => import('@/pages/account/change-pwd/change_pwd/index')
      component: resolve => require(['@/pages/account/change-pwd/change_pwd/index'], resolve),
    }]
  },
  {
    path: '/login',
    name: 'login',
    // component: () => import('@/pages/auth/login')
    component: resolve => require(['@/pages/auth/login'], resolve),
    meta: {
      title: '登录页面',
      text:'登录页面'
    },
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      title: '注册第一步',
      text:'注册页面'
    },
    // component: () => import('@/pages/auth/register')
    component: resolve => require(['@/pages/auth/register'], resolve),
  },
  {
    path: '/register2',
    name: 'register2',
    meta: {
      title: '注册第二步',
      text:'注册页面'
    },
    // component: () => import('@/pages/auth/register2')
    component: resolve => require(['@/pages/auth/register2'], resolve),
  },
  {
    path: '/register3',
    name: 'register3',
    meta: {
      title: '注册第三步',
      text:'注册页面'
    },
    // component: () => import('@/pages/auth/register3')
    component: resolve => require(['@/pages/auth/register3'], resolve),
  },
  {
    path: '/register4',
    name: 'register4',
    meta: {
      title: '注册第四步',
      text:'注册页面'
    },
    // component: () => import('@/pages/auth/register4')
    component: resolve => require(['@/pages/auth/register4'], resolve),
  },
  {
    path: '/modify1',
    name: 'register',
    meta: {
      title: '忘记密码第一步',
      text:'忘记密码'
    },
    // component: () => import('@/pages/auth/modify1')
    component: resolve => require(['@/pages/auth/modify1'], resolve),
  },
  {
    path: '/modify2',
    name: 'modify2',
    meta: {
      title: '忘记密码第一步',
      text:'忘记密码'
    },
    // component: () => import('@/pages/auth/modify2')
    component: resolve => require(['@/pages/auth/modify2'], resolve),
  },
  {
    path: '/modify3',
    name: 'modify3',
    meta: {
      title: '忘记密码第一步',
      text:'忘记密码'
    },
    // component: () => import('@/pages/auth/modify3')
    component: resolve => require(['@/pages/auth/modify3'], resolve),
  },
  {
    path: '/help_center',
    name: 'help_center',
    meta: {
      title: '帮助中心',
      text: '帮助中心'
    },
    // component: () => import('@/pages/home/help-index'),
    component: resolve => require(['@/pages/home/help-index'], resolve),
    children: [{
      path: '/',
      name: '',
      redirect: "/help_center/index"

    }, {
      path: '/help_center/index',
      name: 'help_center_index',
      meta: {
        title: '帮助中心',
        text: '帮助中心'
      },
      // component: () => import('@/pages/home/help-center/index')
      component: resolve => require(['@/pages/home/help-center/index'], resolve),
    }, {
      path: '/help_center/detail/:id?',
      name: 'help_center_detail',
      meta: {
        title: '帮助中心',
        text: '帮助中心'
      },
      // component: () => import('@/pages/home/help-center/detail')
      component: resolve => require(['@/pages/home/help-center/detail'], resolve),
    }
    ]
  },
]
