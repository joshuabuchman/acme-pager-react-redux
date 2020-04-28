import axios from 'axios';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunks from 'redux-thunk';

const LOAD_EMPLOYEES = 'LOAD_EMPLOYEES';
const LOAD_EMPLOYEE = 'LOAD_EMPLOYEE';
const CREATE_EMPLOYEE = 'CREATE_EMPLOYEE';
const EDIT_EMPLOYEE = 'EDIT_EMPLOYEE';
const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE';

//REDUCERS
const employeesReducer = (state = [], action) => 
{
    if(action.type === LOAD_EMPLOYEES)
    {
      return action.employees
    }
    if(action.type === LOAD_EMPLOYEE)
    {
      return action.employee
    }
    if(action.type === EDIT_EMPLOYEE)
    {
      return state.rows.map(employee => 
      {
        if (employee.id === action.employee.id) 
        {
            return action.employee
        }
        return employee
      })
    }
    if(action.type === CREATE_EMPLOYEE)
    {
      return [...state, action.employee]
    }
    if(action.type === DELETE_EMPLOYEE) 
    {
      return state.rows.filter(employee => employee.id !== action.id)
    }
    return state;
};

const reducer = combineReducers({
  employees: employeesReducer
});

//ACTION CREATORS
const _loadEmployees = ( employees ) => 
{
  return {
    type: LOAD_EMPLOYEES,
    employees
  }
}

const _loadEmployee = ( employee ) => 
{
  return {
    type: LOAD_EMPLOYEE,
    employee
  }
}

const _createEmployee = (employee) => 
{
  return {
    type: CREATE_EMPLOYEE,
    employee
  }
}

const _editEmployee = (employee) => 
{
  return {
    type: EDIT_EMPLOYEE,
    employee
  }
}

const _deleteEmployee = ( id ) => 
{
  return {
    type: DELETE_EMPLOYEE,
    id
  }
}

//THUNKS
const loadEmployees = ( page ) =>
{
    return async (dispatch) => 
    {
        const response = await axios.get(`/api/employees/${page}`)
        dispatch(_loadEmployees(response.data))
    }
}

const loadEmployee = (id) =>
{
    return async (dispatch) => 
    {
        const { data: employee } = await axios.get(`/api/employees/${id}`)
        dispatch(_loadEmployee(employee))
    }
}

const createEmployee = (employee) =>
{
    return async (dispatch) => 
    {
        const response = await axios.post('/api/employees', employee)
        dispatch(_createEmployee(response.data))
    }
}

const editEmployee = (employee, push) => async (dispatch) => 
{
    const { data: editedEmployee } = await axios.put(`/api/employees/${employee.id}`, employee)
    dispatch(_editEmployee(editedEmployee))
    if(push)
    {
      push('/employees')
    }
}

const deleteEmployee = (id) =>
{
    return async (dispatch) => 
    {
      await axios.delete(`/api/employees/${id}`)
      dispatch(_deleteEmployee(id))
    }
}

const store = createStore(reducer, applyMiddleware(thunks));

export default store;

export {
  reducer,
  loadEmployees,
  loadEmployee,
  createEmployee,
  editEmployee,
  deleteEmployee
};

