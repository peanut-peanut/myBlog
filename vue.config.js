// module.exports = {
//   devServer: {
//     proxy: {
//       "/api": {
//         target: "http://localhost:8088",
//         changeOrigin: true, // 是否跨域
//         ws: true,
//         pathRewrite: { "^/api": "/api" } //重写地址
//       }
//     }
//   }
// };

const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = {
  devServer: {
    proxy: {
      // 配置代理
      '/api': {
				target: 'http://localhost:8088', // 后端接口地址
				ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '' // 将请求中带有 /api 的替换为空
        }
      }
    }
  }
}
