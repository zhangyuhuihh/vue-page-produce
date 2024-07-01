const path = require('path')
const minimist = require('minimist')
const env = process.env.NODE_ENV

// 开发时使用Vue.use(componentsStore)引入使用组件库
// 打包时去除这一块，使用cdn引入

const getBuildType = () => {
  const argv = minimist(process.argv.slice(2))
  return argv.buildType
}

const buildType = getBuildType()

module.exports = {
  publicPath: env === 'production' ? '/vue-page-produce' : '/',
  lintOnSave: true,
  productionSourceMap: false,
  parallel: false,
  configureWebpack: {
    externals: env === 'production' ? { vue: 'Vue' } : {},
  },
  chainWebpack: (config) => {
    // 修改webpack打包的入口文件。需要在根目录建两个对应入口js文件
    if (buildType !== 'lib') {
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
          'index-prod.html',
        ])
        return options
      })
    }
  },
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      // vue-cli文档: https://cli.vuejs.org/zh/guide/css.html#css-modules
      sass: {
        // prependData: `@import "@/styles/common.scss";`,
        additionalData: `@import "@/styles/common.scss";`
      },
    },
  },
  devServer: {
    port: 8088,
    open: true,
    proxy: {
      '/api': {
        target: 'http://192.168.200.248:50000/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
}
