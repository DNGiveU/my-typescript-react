
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

核心依赖，请勿加`-dev`

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

or stateless functional components

```
import * as React from 'react';

export interface HelloProps {
    cimpiler: string;
    framework: string;
}

export const Hello = (props: HelloProps) => <h1>Hello from {props.cimpiler} and {props.framework}!</h1>
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
$ webpack --config webpack.config.js
```

或者在`package.json`中写入脚本命令

```
"scripts": {
    "dev": "webpack --config webpack.config.js"
}

$ npm run dev
```
## 小细节

- 用@types去安装react的声明文件后，可能会发现 ` import React from 'react' ` 会报一个没有默认导出的错，你需要在tsconfig.json里面新增一条` "allowSyntheticDefaultImports":true `的配置。tsx解析出错的话记得` "jsx":"react" `的配置。
- typescript配合react的话，**不需要**proptypes，typescript的类型检查比他强多了
- 如果使用redux的话，为state建立一个类型声明会让你方便很多，记得尽量减少对象层级嵌套，不仅仅在使用typescript时方便，而且本身也是最佳实践。
- redux的connect可以当作装饰器使用。如果不追求pure function的话，类继承的写法可能会很漂亮。
- 如果使用webpack，可以考虑用` awesome-typescript-loader `，据说比` ts-loader `好（但是我没试过）

## 用TypeScript与JavaScript开发React的区别

#### 文件定义

- [JavaScript] 文件定义为`js`或者`jsx`
- [TypeScript] 文件定义为`tsx`

#### state状态

- [JavaScript]

```
constructor(props) {
    super(props);
    this.state = {};
}
```
- [TypeScript] 先定义一个接口(props/state)，规范数据类型，通过泛型传入

```
export interface Props {
    outerProp: any
}
export interface State {
    internalState: any
}

export default class ReactComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        // 实例化状态
        this.state = { internalState: '' }
    }
}
```

#### 获取DOM节点

- [JavaScript] 在生命周期钩子函数`componentDidMount`获取

```
const myRef = this.refs.refName;
const myRefDom = ReactDom.findDOMNode(myRef);
```

- [TypeScript]

```
import * as ReactDOM from 'react-dom';

componentDidMount() {
    let myDOM = ReactDOM.findDOMNode<HTMLInputElement>(this.refs['refName']);
    myDOM.addEventListener('click', () => {

    });
}
```