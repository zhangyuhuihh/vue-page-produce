const path = require('path')
const env = process.env.NODE_ENV

// 开发时使用Vue.use(componentsStore)引入使用组件库
// 打包时去除这一块，使用cdn引入

module.exports = {
  publicPath: env === 'production' ? './' : '/',
  lintOnSave: true,
  productionSourceMap: false,
  // configureWebpack: {
  //   externals: {
  //     vue: 'Vue'
  //   }
  // },
  chainWebpack: (config) => {
    // 修改webpack打包的入口文件。需要在根目录建两个对应入口js文件
    config.when(env === 'production', (config) => {
      config
        .entry('app')
        .clear()
        .add('./src/main-prod.js') // 生产环境
    })
    config.when(env === 'development', (config) => {
      config
        .entry('app')
        .clear()
        .add('./src/main-dev.js') // 开发环境
    })
    config.plugin('html').tap((options) => {
      options[0].template =
        env === 'production'
          ? path.join(__dirname, '/public/index-prod.html')
          : path.join(__dirname, '/public/index-dev.html')
      return options
    })
    config.plugin('copy').tap((options) => {
      Array.prototype.push.apply(options[0][0].ignore, [
        'index-dev.html',
        'index-prod.html'
      ])
      return options
    })
  },
  devServer: {
    port: 8088,
    open: true,
    proxy: {
      '/api': {
        target: 'http://192.168.200.248:50000/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
