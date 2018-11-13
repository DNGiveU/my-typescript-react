
输出多个打包文件

```javascript
entry: {
    app: './src/index.js',
    print: './src/print.js'
},
output: {
    // 将会输出两个文件 app.bundle.js 以及 print.bundle.js
    filename: '[name].bundle.js',
    path: __dirname + '/dist'
}
```

html-webpack-plugin

可以在不同改动index.html情况下，自动生成index.html，添加新的入口文件

```
new HtmlWebpackPlugin();
```

clean-webpack-plugin

每次构建都先清除指定文件夹

```
new CleanWebpackPlugin(['foldName'])
```

loading css

```
npm install --save-dev style-loader css-loader
```

```webpack.config.js
+   module: {
+     rules: [
+       {
+         test: /\.css$/,
+         use: [
+           'style-loader',
+           'css-loader'
+         ]
+       }
+     ]
+   }
```

loading image

```
npm install --save-dev file-loader
```

```
+       {
+         test: /\.(png|svg|jpg|gif)$/,
+         use: [
+           'file-loader'
+         ]
+       }
```

loading fonts

```
+       {
+         test: /\.(woff|woff2|eot|ttf|otf)$/,
+         use: [
+           'file-loader'
+         ]
+       }
```

loading data

```
npm install --save-dev csv-loader xml-loader
```

```
+       {
+         test: /\.(csv|tsv)$/,
+         use: [
+           'csv-loader'
+         ]
+       },
+       {
+         test: /\.xml$/,
+         use: [
+           'xml-loader'
+         ]
+       }
```