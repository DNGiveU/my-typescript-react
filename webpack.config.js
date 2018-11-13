const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    output: {
        filename: 'bundle.js',
        // path: __dirname + '/dist'
        path: path.resolve(__dirname, 'dist')
    },
    // https://webpack.js.org/guides/development/#using-source-maps
    // Enable sourcemaps for debugging webpack's output.
    devtool: 'source-map',
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'
            {test: /\.tsx?$/, loader: 'awesome-typescript-loader'},
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'
            {enforce: 'pre', test: /\.js$/, loader: 'source-map-loader'}
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist'])
    ],
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important bacause it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    }
}