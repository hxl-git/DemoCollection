'use strict'
const path = require('path')
const name = '乐一'
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {

  /**
   * 生产环境是否要生成 sourceMap
   */
  productionSourceMap: false,

  /**
   * 部署应用包时的基本 URL
   */
  publicPath: './',

  /**
   * 打包时输出的文件目录
   */
  outputDir: 'dist',
  /**
   * 放置静态文件夹目录
   */
  assetsDir: 'assets',
  /**
   * dev环境下，webpack-dev-server 相关配置
   */
  devServer: {

    port: 11111, //开发环境运行时的端口

    https: false,//是否启用HTTPS协议

    open: true, //项目运行成功后是否直接打开浏览器

    hot: true,//是否开启热加载

    overlay: true,//当出现编译错误或警告时，在浏览器中显示全屏覆盖。
    /*
    proxy: {   //服务器代理

    }

     */
  },

  /**
   * 是否在开发环境下每次保存代码时都启用 eslint验证
   */
  lintOnSave: false,

  /**
   * css的处理
   */
  css: {
    loaderOptions: {

      scss: { prependData: `@import "~@/assets/public.scss";`},

      sass: { prependData: `@import "~@/assets/public.sass"`},

      css: {}

    }

  },

  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  /**
   * vue-cli内部的webpack配置
   * @param config
   */
  chainWebpack: config => {

  },

  /**
   * 可以用来传递任何第三方插件选项
   */
  pluginOptions: {}

}

