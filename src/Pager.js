import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { deleteEmployee } from './store'

const Pager = ( employees ) =>
{
    return (
        <table>
            <thead>
                <tr>
                    <th className = 'fn'>First Name</th>
                    <th className = 'ln'>Last Name</th>
                    <th className = 'e'>Email</th>
                    <th className = 't'>Title</th>
                </tr>
            </thead>
            <tbody>
            {
                employees.employees.rows && employees.employees.rows.map( employee =>
                {
                    return(
                        <tr className = 'entry' key = { employee.id }>
                            <td className = 'firstName'>{ employee.firstName }</td>
                            <td className = 'lastName'>{ employee.lastName }</td>
                            <td className = 'email'>{ employee.email }</td>
                            <td className = 'title'>{ employee.title }</td>
                            <td className = 'button'><button className = 'edit'> Edit </button></td>
                            <td className = 'button'><button className = 'delete' onClick = { () => { employees.destroy(employee.id), window.location.reload(true)} }> Delete </button></td>
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

const mapDispatchToProps = (dispatch) => 
{
  return {
    destroy: (id) => 
    {
      console.log('You are deleting:', id)
      dispatch(deleteEmployee(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pager)