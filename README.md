项目采用webpack打包方式
引入vuex状态管理
引入axios   {拦截请求和响应,转换请求和响应数据,取消请求,自动转换JSON数据}
引入懒加载(在需要的时候进行加载，随用随载。)
路由懒加载
     component: () => import('@/pages/home/index')
     或
     component: resolve => require(['@/pages/home/index.vue'], resolve),
//组件懒加载
  components: {
    historyTab:resolve => {
    require(['../../component/historyTab/historyTab.vue'],resolve)
        },   
    },   

项目结构：
build：对 webpack 开发和打包的相关设置，包括入口文件、输出文件、使用的模块等；
config：主要是指定开发和打包中的静态资源路径、要压缩的文件类型、开发使用的端口号、开发使用虚拟服务器跨域请求 api 等。
node_modules: 项目的依赖库；
src 文件夹： 我们主要操作的地方，组件的增加修改等都在这个文件夹里操作
    api文件夹：用来存放发起后端接口请求的文件
    assets文件夹：用来存放静态资源，如图片，全局css等，放在这里的静态资源在打包时会进行压缩处理
    components文件夹：用来存放通用的组件
    config文件夹：用来存放项目的具体配置文件，如后端接口的ip配置等
    libs文件夹：用来存放工具类，如果request，缓存，日期转换等一些工具类
    mock文件夹：用来做数据的仿真处理,当后端接口未处理完成,可以将假数据放到这个文件夹
    pages文件夹：用来存放具体的页面代码，一个文件夹对应一个页面，页面可以有子页面
    router文件夹：用来存放路由配置
    store文件夹：存放数据状态管理的相关文件
    App.vue: 入口组件，pages 里的组件会被插入此组件中，此组件再插入 index.html 文件里，形成单页面应用；
    main.js: 入口 js 文件，影响全局，作用是引入全局使用的库、公共的样式和方法、设置路由等。
static 文件夹: 静态资源文件夹，放置不会变动的资源，直接被复制到最终的打包目录（默认是dist/static）下；
.babelrc: 使用 babel 的配置文件，用来设置转码规则和插件；
.editorconfig: 代码的规范文件，规定使用空格或 tab 缩进，缩进的长度是两位还是四位之类的代码风格，使用的话需要在编辑器里下载对应的插件；
.postcssrc: 指定使用的 css 预编译器，里面默认配置了 autoprefixer ，自动补全浏览器前缀；
favicon.ico: 浏览器标签页 title 旁边的小图标，这是需要我们自己粘贴过来的；
index.html: 首页文件，项目运行的时候，会自动将我们在 src 文件夹里生成的组件插入这个文件里；
package-lock.json: 当 node_modules 或 package.json 发生变化时自动生成的文件。这个文件主要功能是确定当前安装的包的依赖，以便后续重新安装的时候生成相同的依赖，而忽略项目开发过程中有些依赖已经发生的更新；
package.json: 指定项目开发和生成环境中需要使用的依赖库