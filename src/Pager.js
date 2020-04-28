import React from 'react'
import { connect } from 'react-redux'

const Pager = ({ employees }) =>
{
    return (
        <table>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Title</th>
                </tr>
            </thead>
            <tbody>
            {
                employees.rows && employees.rows.map( employee =>
                {
                    return(
                        <tr className = 'entry' key = { employee.id }>
                            <td>{ employee.firstName }</td>
                            <td>{ employee.lastName }</td>
                            <td>{ employee.email }</td>
                            <td>{ employee.title }</td>
                            <td><button className = 'delete'> Delete </button></td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    )
}

const mapStateToProps = ({ employees }) => 
{
    return { employees }
} 

export default connect(mapStateToProps, null)(Pager)