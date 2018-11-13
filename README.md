
> https://www.typescriptlang.org/docs/handbook/react-&-webpack.html

## React in TypeScript

```
npm install --save-dev webpack webpack-cli
```

Webpack 是一个将代码以及所有的依赖打包进一个独立的.js文件的工具。

> 如果按照指示发生无法加载`webpack-cli/package.json`，则多数是由于`webpack`和`webpack-cli`版本不兼容。请选择同一个大版本，如 3.x.x

```
npm install --save react react-dom @types/react @types/react-dom
```

#### Add a TypeScript configuration file

`tsconfig.json`包含一系列的输入文件以及编译设置

```
{
    "compilerOptions": {
        "outDir": "./dist/",
        "sourceMap": true,
        "noImplicitAny": true,
        "module": "commonjs",
        "target": "es5",
        "jsx": "react"
    },
    "include": [
        "./src/**/*"
    ]
}
```

#### Write Component

编写一个组件

```
import * as React from 'react';

export interface HelloProps {
    compiler: string;
    framework: string;
}

export class Hello extends React.Component<HelloProps, {}> {
    render() {
        return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>
    }
}
```

#### Write index.tsx

```
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Hello } from './components/Hello';

ReactDOM.render(<Hello compiler='TeypScript' framework='React'/>, document.getElementById('container'));
```

##### index.html

```
<!DOCTYPE>
<html>
    <head>
        <meta charset="UTF-8"/>
        <title>Hello React!</title>
    </head>
    <body>
        <div id="container"></div>
        <!-- Dependencies -->
        <script src="./node_modules/react/umd/react.development.js"></script>
        <script src="./node_modules/react-dom/umd/react-dom.development.js"></script>

        <!-- Main -->
        <script src="dist/bundle.js"></script>
    </body>
</html>
```

#### Create a webpack configuration file

```
module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist'
    },
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
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important bacause it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    }
}
```

You might be wondering about that `externals` field. We want to avoid bundling all of React into the same file, since this increases compilation time and browsers will typically be able to cache a library if it doesn’t change.

#### Putting it all together

```
$ npm install --save awesome-typescript-loader
$ npm install --save-dev typescript
$ webpack
```