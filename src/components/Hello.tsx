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
    visible: true
}

export class Hello extends React.Component<HelloProps, State> {

    constructor(props: HelloProps) {
        super(props);

        this.state = { visible: true };
    }

    render() {
        return (
            <div>
                <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>
                <div>this is state props {this.state.visible ? 'true' : 'false'}</div>
            </div>
        )
    }
}
