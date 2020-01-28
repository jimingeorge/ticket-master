import React from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'
import EmployeeForm from './employees-form'

class Employees extends React.Component{
    constructor(){
        super()
        this.state={
            employees:[]
        }
    }
    componentDidMount(){
        axios.get('/employees',{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(res=>{
            console.log(res.data);
            if(res.data.errors){
                alert(res.data.message)
            }else{
                this.setState({employees:res.data})
            }
        })
        .catch(err=>alert(err))
    }
    handleRemove=(id)=>{
        //const data=e.target.value
        console.log(id);
        axios.delete(`/employees/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(res=>{
            console.log(res.data)
            this.setState((prevState)=>({
                employees:prevState.employees.filter(emp=>{
                    return emp._id != res.data._id 
                })
            }))
        
        })
    }
    render(){
        console.log(this.state.employees);
        
        return(
            <div>
                <h1>Employees List - {this.state.employees.length}</h1>
                <ul>
                    {
                        this.state.employees.map(emp=>{
                            return <li key={emp._id}>
                                
                                        {emp.name} - 
                                        {emp.email} - {emp.department.name} -
                                        <Link to={`/employees/${emp._id}`}>  Show</Link>
                                        <button onClick={()=>{this.handleRemove(emp._id)}}>Remove</button>
                                    </li>
                        })
                    }
                </ul>
                <Link to='/employees/new'>Add Employees</Link>
            </div>
        )
    }
}

export default Employees