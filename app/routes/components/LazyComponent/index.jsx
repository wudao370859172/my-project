import React, { Component } from 'react'

export default function lazyComponent(importComponent) {

    class LazyComponent extends Component {
        constructor(props) {
            super(props);
            this.state = {
                component: null
            }
        }

        async componentDidMount() {
            const { default: component } = await importComponent();
            this.setState({
                component,
            })
        }

        render() {
            const { component: C } = this.state;
            return C ? <C {...this.props}/> : null;
        }
    }

    return LazyComponent;
}