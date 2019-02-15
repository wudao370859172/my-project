import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { HashRouter } from 'react-router-dom';
import Routes from '@routes'

require('./index.scss')

export default class Backbone extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Grid container spacing={32}>
                    <Grid item xs={12}>
                        <div id='top'>
                            <Paper className='top'>1</Paper>
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <div id='left'>
                            <Paper className='left'>2</Paper>
                        </div>
                    </Grid>
                    <Grid item xs={10}>
                        <div id='content'>
                            <Paper className='content'>
                                <HashRouter>
                                    <Routes />
                                </HashRouter>
                            </Paper>
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    }
}