import React from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'
import EmployeeForm from './employees-form'
import Swal from 'sweetalert2'

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
                Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
        
    }
    render(){
        console.log(this.state.employees);
        
        return(
            <div>
                <h1>Employees List - {this.state.employees.length}</h1>
                {/* <ul>
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
                </ul> */}
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Department</th>
                        <th scope="col">Button</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.employees.map((emp,i)=>{
                            return(
                            <tr key={emp._id}>
                                <td>{i+1}</td>
                                <td><Link to={`/employees/${emp._id}`}>  {emp.name}</Link></td>
                                <td>{emp.email}</td>
                                <td>{emp.department.name}</td>
                                <td>
                                <button className='btn btn-sm btn-danger' onClick={()=>{this.handleRemove(emp._id)}}>Remove</button>
                                </td>
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
                <Link to='/employees/new'><button className='btn btn-sm btn-primary'>Add Employees</button></Link>
            </div>
        )
    }
}

export default Employees