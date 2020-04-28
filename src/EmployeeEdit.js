import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadEmployee, editEmployee } from './store'

class EmployeeEdit extends Component 
{
    constructor(props) 
    {
        let firstName = ''
        let lastName = ''
        let email = ''
        let title = ''
        if ( props.employee && props.employee.firstName && props.employee.lastName && props.employee.email && props.employee.title)
        {
            firstName = props.employee.firstName
            lastName = props.employee.lastName
            email = props.employee.email
            title = props.employee.title
        }
        super()
        this.state = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            title: title,
            error: ''
        }
        this.onSubmit = this.onSubmit.bind(this)
    }
    componentDidMount() 
    {
        const id = this.props.match.params.id
        this.props.getEmployee(id)
    }
    componentDidUpdate(prevProps) 
    {
        console.log(prevProps)
        if (prevProps.employee.firstName !== this.props.employee.firstName &&
            prevProps.employee.lastName !== this.props.employee.lastName && 
            prevProps.employee.email !== this.props.employee.email && 
            prevProps.employee.title !== this.props.employee.title) 
        {
            this.setState({ firstName: this.props.employee.firstName, lastName: this.props.employee.lastName, email: this.props.employee.email, title: this.props.employee.title })
        }
    }
    async onSubmit(ev) 
    {
        ev.preventDefault()
        try 
        {
            this.props.update(
            {
                id: this.props.employee.id,
                firstName: this.employee.firstName, 
                lastName: this.employee.lastName, 
                email: this.employee.email, 
                title: this.employee.title
            }, 
            this.props.history.push)
        }
        catch (ex) 
        {
            this.setState({ error: ex.response.data.message })
        }
    }
    render() 
    {
        const { onSubmit } = this
        const { firstName, lastName, email, title, error } = this.state
        return (
            <form className = 'employeeEdit' onSubmit = { onSubmit } >
                {
                    error
                }
                <div className = 'createInfo'>First Name: <input className = 'editName' value = { this.state.firstName } onChange = { ev => this.setState({ firstName: ev.target.value }) }></input></div>
                <div className = 'createInfo'>Last name: <input className = 'editName' value = { this.state.lastName } onChange = { ev => this.setState({ lastName: ev.target.value }) }></input></div>
                <div className = 'createInfo'>Email: <input className = 'editEmail' value = { this.state.email } onChange = { ev => this.setState({ email: ev.target.value }) }></input></div>
                <div className = 'createInfo'>Title: <input className = 'editTitle' value = { this.state.title } onChange = { ev => this.setState({ title: ev.target.value }) }></input></div>
                <button disabled = { !firstName || !lastName || !email || !title }>Update Employee Info</button>
            </form>
        )
    }
}

const mapStateToProps = ({ employees }) =>
{
    return { employees }
}

const mapDispatchToProps = (dispatch) => 
{
    return {
        getEmployee: (id) => dispatch(loadEmployee(id)),
        update: (employee, push) => dispatch(editEmployee(employee, push))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeEdit)