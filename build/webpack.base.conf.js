'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const webpack = require('webpack')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}



module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    // app: './src/main.js'
    app: ["babel-polyfill", "./src/main.js"],
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  externals: {
    'vue': 'Vue',
    // 'vue-router': 'VueRouter',
    // 'vue-amap': 'VueAMap',
    'AMap': 'AMap',
    'jquery':'window.jQuery',
    'element-ui':'ELEMENT',
   },
  resolve: {
    extensions: ['.js', '.vue', '.json'],

    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'api': resolve('src/api/index'),
      'lib': resolve('src/libs'),
      'component': resolve('src/components'),
      'assets': resolve('src/assets'),
      'config': resolve('src/config'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.sass$/,
        loaders: ['style', 'css', 'sass']
      }
      // {
      //   test: /\.scss$/,
      //   use:  ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader', {
      //         loader: 'sass-resources-loader',
      //         options: {resources: path.resolve(__dirname, '../static/src/style/common.scss')}
      //       }]
      // }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },

  plugins: [
    　　new webpack.ProvidePlugin({
      　　 $: "jquery",
          jQuery: "jquery",
          jquery: "jquery",
          "window.jQuery": "jquery"
    　　})
    ]

}
