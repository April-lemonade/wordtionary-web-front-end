module.exports = {
  publicPath: '/',
  devServer: {
    // 本地域名
    host: 'localhost',
    // 本地端口
    port: '8080',
    open: true,
    proxy: { //配置跨域
      // 当访问到 api 开头的接口时走下面的内容
      '/api': {
        // 最终想要访问的地址
        target: 'http://121.196.198.132:7002',
        changeOrigin: true,//允许跨域
        pathRewrite: {
          '^/': ''
        }
      }
    }
  }
}
