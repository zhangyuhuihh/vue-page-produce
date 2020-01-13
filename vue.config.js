module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  lintOnSave: true,
  productionSourceMap: false,
  devServer: {
    port: 8088,
    open: true,
    proxy: {
      '/api': {
        target: 'http://192.168.200.248:50000/api',
        // target: 'http://192.168.200.245:50000/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/oa/web': {
        target: 'http://192.168.200.248:10002/oa/web',
        // target: 'http://192.168.200.245:10002/oa/web',
        changeOrigin: true,
        pathRewrite: {
          '^/oa/web': ''
        }
      },
      '/oa': {
        target: 'http://192.168.200.248:10002/oa',
        // target: 'http://192.168.200.245:10002/oa',
        changeOrigin: true,
        pathRewrite: {
          '^/oa': ''
        }
      }
    }
  }
}
