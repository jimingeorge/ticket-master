import React from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

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
    handleRemove=(id)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
                axios.delete(`/tickets/${id}`,{
                    headers:{
                        'x-auth':localStorage.getItem('authToken')
                    }
                })
                .then(res=>{
                    console.log(res.data);
                    this.setState(prevState=>({
                        tickets:prevState.tickets.filter(ele=>{
                            return ele._id!==res.data._id
                        })
                    }))
                })
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
        
    }
    // componentDidMount(){
    //     console.log('mounting')
        
    //     {
    //         axios.get('/tickets',{
    //             headers:{
    //                 'x-auth':localStorage.getItem('authToken')
    //             }
    //         })
    //         .then(res=>{
    //             console.log(res.data)
    //             const tickets = res.data
    //             this.setState({tickets})
    //         })
    //         .catch(err=>alert(err))
    //     }
    //     //--------Customers-----------
    //     {
    //         axios.get('/customers',{
    //             headers:{
    //                 'x-auth':localStorage.getItem('authToken')
    //             }
    //         })
    //         .then(res=>{
    //             console.log(res.data)
    //             const customers = res.data
    //             this.setState({customers})
    //         })
    //         .catch(err=>alert(err))
    //     }
    //     //--------Departments-----------
    //     {
    //         axios.get('/departments',{
    //             headers:{
    //                 'x-auth':localStorage.getItem('authToken')
    //             }
    //         })
    //         .then(res=>{
    //             console.log(res.data)
    //             const departments = res.data
    //             this.setState({departments})
    //         })
    //         .catch(err=>alert(err))
    //     }
    //     //--------Employees-----------
    //     {
    //         axios.get('/employees',{
    //             headers:{
    //                 'x-auth':localStorage.getItem('authToken')
    //             }
    //         })
    //         .then(res=>{
    //             console.log(res.data)
    //             const employees = res.data
    //             this.setState({employees})
    //         })
    //         .catch(err=>alert(err))
    //     }
    // }
    // findCustomer=(id)=>{
        
    //         const find = this.state.customers.find(ele=>{
    //                 return ele._id === id
    //                 })
    //         const res = find.name
    //         return res
    // }
    // findDepartment=(id)=>{
    //     const find = this.state.departments.find(ele=>{
    //         return ele._id === id
    //         })
    //     const res = find.name
    //     return res 
    // }
    // findEmployee=(id)=>{
    //     const find = this.state.employees.find(ele=>{
    //         return ele._id === id
    //         })
    //     const res = find.name
    //     return res
    // }
    componentDidMount(){

        console.log("component did mount")
        const req1 = axios.get('/tickets',{
                        headers:{
                            'x-auth':localStorage.getItem('authToken')
                        }
                    })
        const req2 = axios.get('/customers',{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        const req3 = axios.get('/employees',{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        const req4 = axios.get('/departments',{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        Promise.all([req1, req2, req3, req4])
            .then(responses => {
                const tickets = responses[0].data
                const customers = responses[1].data
                const employees = responses[2].data
                const departments = responses[3].data
                tickets.forEach(ticket => {
                    ticket.customer = customers.find(cust => ticket.customer === cust._id)
                    ticket.department = departments.find(dept => ticket.department === dept._id) 
                    ticket.employees = ticket.employees.map(employee => {
                        employee = employees.find(empl => employee._id === empl._id)
                        return employee
                    })
                })

                this.setState({ tickets, employees, customers, departments})
            })
    }
    render(){
        console.log(this.state.tickets)
        return (
            <div style={{margin:'2% auto'}}>
                <h1>Tickets </h1>
                
                {this.state.tickets.length !==0 && 
                    <table className='table table-responsive table-fixed '>
                    <thead>
                        <tr>
                            <th  scope='col' >Code No</th>
                            <th scope='col'>Customer</th>
                            <th scope='col'>Department</th>
                            <th scope='col'>Employees</th>
                            <th scope='col'>Message</th>
                            <th scope='col'>Priority</th>
                            <th scope='col'>Actions</th>
                            <th scope='col'>Complete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.tickets.map(ticket=>{
                            let a={}
                            console.log(ticket.employees.map(empl => a={...empl}))
                            
                            return (
                                 <tr key={ticket._id}>
                                    
                                    <td className='col'>{ticket.code}</td>
                                    <td className='col'>{ticket.customer.name}</td>
                                    <td className='col'>{ticket.department.name}</td>
                                    <td className='col'>{a.name}</td>
                                    <td className='col'>{ticket.message}</td>
                                    <td className='col'>{ticket.priority}</td>
                                    
                                    <td className='col'><button onClick={()=>this.handleRemove(ticket._id)} className='btn btn-md btn-danger'>Remove</button></td>
                                    <td className='col'>{ticket.isResolved?'True':'False'}</td>
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </table>
                }

                <Link to='/tickets/new'><button className='btn btn-primary' type='button'>Add Ticket</button></Link>
            <br/>
            </div>
        )
    }
} 

export default Ticket