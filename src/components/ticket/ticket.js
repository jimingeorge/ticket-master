import React from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'

class Ticket extends React.Component{
    constructor(){
        super()
        this.state={
            tickets:[],
            customers:[],
            departments:[],
            employees:[]
        }
    }
    componentDidMount(){
        console.log('mounting')
        
        {
            axios.get('/tickets',{
                headers:{
                    'x-auth':localStorage.getItem('authToken')
                }
            })
            .then(res=>{
                console.log(res.data)
                const tickets = res.data
                this.setState({tickets})
            })
            .catch(err=>alert(err))
        }
        //--------Customers-----------
        {
            axios.get('/customers',{
                headers:{
                    'x-auth':localStorage.getItem('authToken')
                }
            })
            .then(res=>{
                console.log(res.data)
                const customers = res.data
                this.setState({customers})
            })
            .catch(err=>alert(err))
        }
        //--------Departments-----------
        {
            axios.get('/departments',{
                headers:{
                    'x-auth':localStorage.getItem('authToken')
                }
            })
            .then(res=>{
                console.log(res.data)
                const departments = res.data
                this.setState({departments})
            })
            .catch(err=>alert(err))
        }
        //--------Employees-----------
        {
            axios.get('/employees',{
                headers:{
                    'x-auth':localStorage.getItem('authToken')
                }
            })
            .then(res=>{
                console.log(res.data)
                const employees = res.data
                this.setState({employees})
            })
            .catch(err=>alert(err))
        }
    }
    findCustomer=(id)=>{
        
            const find = this.state.customers.find(ele=>{
                    return ele._id === id
                    })
            const res = find.name
            return res
    }
    findDepartment=(id)=>{
        const find = this.state.departments.find(ele=>{
            return ele._id === id
            })
        const res = find.name
        return res 
    }
    findEmployee=(id)=>{
        const find = this.state.employees.find(ele=>{
            return ele._id === id
            })
        const res = find.name
        return res
    }
    render(){
        return (
            <div>
                <h1>Tickets </h1>
                
                <table border='1'>
                    <thead>
                        <tr>
                            <th>Code No</th>
                            <th>Customer</th>
                            <th>Department</th>
                            <th>Employees</th>
                            <th>Message</th>
                            <th>Priority</th>
                            <th>Actions</th>
                            <th>Remove</th>
                            <th>Complete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.tickets.map(ticket=>{
                            return (
                                 <tr key={ticket._id}>
                                    
                                    <td>{ticket.code}</td>
                                    <td>{this.state.customers.length!==0 & this.state.departments.length!==0 & this.state.employees.length!==0 && this.findCustomer(ticket.customer)}</td>
                                    <td>{this.state.customers.length!==0 & this.state.departments.length!==0 & this.state.employees.length!==0 && this.findDepartment(ticket.department)}</td>
                                    <td>{this.state.customers.length!==0 & this.state.departments.length!==0 & this.state.employees.length!==0 && console.log(ticket.employees[0])}</td>
                                    <td>{ticket.message}</td>
                                    <td>{ticket.priority}</td>
                                    <td>Show</td>
                                    <td>Remove</td>
                                    <td>{ticket.isResolved?'True':'False'}</td>
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </table>

                <Link to='/tickets/new'>Add Ticket</Link>
            </div>
        )
    }
} 

export default Ticket