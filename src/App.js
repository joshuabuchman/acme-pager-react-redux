import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import Nav from './Nav';
import Pager from './Pager';
const { HashRouter, Route } = ReactRouterDOM;
import { loadEmployees } from './store'
const { Component } = React;
import { connect } from 'react-redux'

class App extends Component 
{
    constructor()
    {
        super()
    }
    render()
    {
        return (
            <HashRouter> 
                <br/>
                <h1>ACME Pager</h1>
                <Route path='/:page?' render={ ({ match }) => this.props.load( match.params.page )}/>
                <Route path='/' component = { Pager } />
                <Route component ={ Nav }/>
            </HashRouter>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        load: (page) => 
        {
            dispatch(loadEmployees(page))
        }
    }
}

export default connect(null, mapDispatchToProps)(App)