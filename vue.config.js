const { defineConfig } = require("@vue/cli-service");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = defineConfig({
  transpileDependencies: true,
  // proxyTable: {
  //   // 配置跨域
  //   "/test": {
  //     target: `http://www.dango1123.top`, //请求后台接口
  //     changeOrigin: true, // 允许跨域
  //   },
  // },
  chainWebpack(config) {
    config.plugin("monaco").use(new MonacoWebpackPlugin());
  },
});
