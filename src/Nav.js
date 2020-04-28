import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

const Nav = ({ employees, ownProps }) => 
{
    const maxPages = Math.floor(employees.count/50)
    const pages = []
    for(let i = 1; i <= maxPages + 1; i++) 
    {
        pages.push(i);
    }
    const prev = () =>
    {
        if(Number(ownProps.location.pathname.slice(1)) > 0)
        {
            return Number(ownProps.location.pathname.slice(1)) - 1
        }
        else
        {
            return Number(ownProps.location.pathname.slice(1))
        }
    }
    const next = () =>
    {
        if(Number(ownProps.location.pathname.slice(1)) < maxPages)
        {
            return Number(ownProps.location.pathname.slice(1)) + 1
        }
        else
        {
            return Number(ownProps.location.pathname.slice(1))
        }
    }
    return (
        <nav>
            <NavLink to = { `/${prev()}` }>Prev</NavLink>
            {
                pages.map(page => 
                {
                    return(
                        <NavLink key = { page } className = { page === Number(ownProps.location.pathname.slice(1))+1 ? 'selected' : ''} to = {`/${ page - 1 }`} >{ page }</NavLink>
                    )
                })
            }
            <NavLink to = { `/${next()}` }>Next</NavLink>
        </nav>
    )
}
const mapStateToProps = ({ employees }, ownProps) => 
{
    return {
        employees,
        ownProps
    }
}

export default connect(mapStateToProps, null)(Nav)