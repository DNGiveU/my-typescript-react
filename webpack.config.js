// https://webpack.js.org/

const path = require('path');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    output: {
        filename: 'bundle.js',
        // path: __dirname + '/dist'
        path: path.resolve(__dirname, 'dist')
    },
    // This option controls if and how source maps are generated.
    // https://webpack.js.org/guides/development/#using-source-maps
    // Enable sourcemaps for debugging webpack's output.
    devtool: 'source-map',
    // https://webpack.js.org/configuration/dev-server
    devServer: {
        // 服务器根路径
        contentBase: './',
        // 开启热加载
        hot: true,
        // 默认打开的页面
        openPage: './index.html',
        // 端口
        port: 8100
    },
    // https://webpack.js.org/configuration/resolve/
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader' or ts-loader
            {test: /\.tsx?$/, loader: 'awesome-typescript-loader', exclude: /node_modules/},
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'
            {enforce: 'pre', test: /\.js$/, loader: 'source-map-loader'},
            {
                test: /.css$/,
                loader: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: 'file-loader'
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: 'file-loader'
            },
            {
                test: /\.(csv|tsv)$/,
                loader: 'csv-loader'
            },
            {
                test: /.xml$/,
                loader: 'xml-loader'
            }
        ]
    },
    plugins: [
        // new CleanWebpackPlugin(['dist']),
        // 热加载
        new webpack.HotModuleReplacementPlugin()
    ],
    // https://webpack.js.org/configuration/externals/
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important bacause it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    }
}