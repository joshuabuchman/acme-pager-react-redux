import React from 'react';
import { connect } from 'react-redux'
import * as ReactRouterDOM from 'react-router-dom';
import Nav from './Nav';
import Pager from './Pager';
import { loadEmployees } from './store'
import EmployeeEdit from './EmployeeEdit';
const { HashRouter, Route, Redirect } = ReactRouterDOM;
const { Component } = React;

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
                <Route exact path = '/' ><Redirect to = '/0' /></Route>
                <Route path='/:page?' render = { ({ match }) => this.props.load( match.params.page )}/>
                <Route exact path = '/employees/:id' component = { EmployeeEdit } />
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