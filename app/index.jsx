import React from 'react';
import ReactDom from 'react-dom';
import Backbone from '@pages/backbone'

class App extends React.Component {
    render() {
        return (
            <Backbone></Backbone>
        )
    }
}

ReactDom.render(
    <App></App>,
    document.getElementById("react")
  )