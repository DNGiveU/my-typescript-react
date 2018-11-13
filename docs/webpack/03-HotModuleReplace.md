> https://webpack.js.org/guides/hot-module-replacement/

webpack.HotModuleReplacementPlugin

```webpack.config.js
module.exports = {
    devServer: {
        // 服务器根路径
        contentBase: './',
        // 开启热加载
        hot: true,
        // 默认打开的页面
        openPage: './index.html'
    }
}
```