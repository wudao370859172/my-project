import React, {Component} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import lazyComponent from '@routes/components/LazyComponent';

export default class Routes extends Component {
    
    render() {
        return (
            <Switch>
                <Route exact path='/' component={lazyComponent(() => import('@components/Entry'))} />
                <Route path='/test' component={lazyComponent(() => import('@components/Test'))} />
            </Switch>
        )
    }
}