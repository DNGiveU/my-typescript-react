打包模式

```webpack.config.js
module.exports = {
    mode: 'development'
}
```

inline-source-map

打包跟踪

```webpack.config.js
module.exports = {
    devtool: 'inline-source-map'
}
```

webpack-dev-server

提供web服务器功能以及简单的热加载

```webpack.config.js
module.exports = {
    devServer: {
        contentBase: './dist'
    }
}
```