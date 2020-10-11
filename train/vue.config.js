// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
  publicPath: '/',
  outputDir: '../dist', // 打包的目录
  lintOnSave: true, // 在保存时校验格式
  productionSourceMap: false, // 生产环境是否生成 SourceMap
  devServer: {
    open: false, // 启动服务后是否打开浏览器
    host: '0.0.0.0',
    port: 8888, // 服务端口
    https: false,
    hotOnly: false,
    proxy: {
      '/api': {
        target: 'http://gdjt.vieword.club/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }, // 设置代理
    before: app => { }
  }

  // 去掉console.log
  // configureWebpack: {
  //   optimization: {
  //     minimizer: [
  //       new UglifyJsPlugin({
  //         uglifyOptions: {
  //           compress: {
  //             warnings: false,
  //             drop_console: true, // console
  //             drop_debugger: false,
  //             pure_funcs: ['console.log']// 移除console
  //           }
  //         }
  //       })
  //     ]
  //   }
  // }

}
