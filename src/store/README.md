store文件夹存放数据状态管理的相关文件
可再进行不同模块的细分，具体视数据量大小而定



store命名空间
目的：解决action取重名会被覆盖问题
例子：store-ap-adv.js

关键点：
各模块内加 namespaced:true,
根模块modules里各模块的引入改为
storeApAdv    ===》   storeApAdv:storeApAdv,
页面中mapAction中改为
...mapActions({     
    getList:'getList',
}),

===》

...mapActions('storeApAdv',{     
    getList:'getList',
}),
已经写好的模块不要修改，后面新增的模块都改为命名空间模式