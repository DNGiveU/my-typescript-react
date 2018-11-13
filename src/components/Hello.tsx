import * as React from 'react';

/**
 * 组件外部状态
 */
export interface HelloProps {
    compiler: string;
    framework: string;
}

/**
 * 组件内部状态
 */
export interface State {

}

export class Hello extends React.Component<HelloProps, State> {

    render() {
        return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>
    }
}
