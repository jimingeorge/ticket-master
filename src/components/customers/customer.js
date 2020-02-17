import React from 'react'
import axios from '../../config/axios'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'

class Customer extends React.Component{
    constructor(){
        super()
        this.state={
            customers:[]
        }
    }
    componentDidMount(){
        axios.get('/customers',{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(res=>{
            console.log(res.data)
            const data = res.data
            this.setState({customers:data})
            
        })
        .catch(err=>alert(err))
        
    }
    handleRemove=(id)=>{
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
                axios.delete(`/customers/${id}`,{
                    headers:{
                        'x-auth':localStorage.getItem('authToken')
                    }
                })
                .then(res=>{
                    console.log(res.data);
                    this.setState(prevState=>({
                         customers:prevState.customers.filter(ele=>ele._id!=res.data._id)
                    })
                    )
                    
                })
                .catch(err=>alert(err))
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })

        
    }

    render(){
        return (
            <div>
                <h1>Customer Listing - {this.state.customers.length}</h1>
                {/* <ul>
                    {this.state.customers.map(customer=>{
                        return <li key={customer._id} style={{margin:'1% auto'}}>
                            <Link to='/customers/:id'>
                                {customer.name}
                            </Link> 
                            - {customer.email} -{customer.mobile} 
                            <Link to={`/customers/${customer._id}`} style={{margin:'auto 1%'}} >Show</Link>
                            <button type='button ' className='btn btn-sm btn-danger' onClick={()=>this.handleRemove(customer._id)}>Remove</button>
                            </li>
                    })}
                </ul> */}
                <table className='table'>
                    <thead>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>name</th>
                            <th scope='col'>mobile</th>
                            <th scope='col'>email</th>
                            <th scope='col'>actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.customers.map((customer,i)=>{
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td><Link to={`/customers/${customer._id}`}>
                                {customer.name}
                            </Link> </td>
                                <td>{customer.mobile}</td>
                                <td>{customer.email}</td>
                                <td>
                                <button type='button ' className='btn btn-sm btn-danger' onClick={()=>this.handleRemove(customer._id)}>Remove</button>
                                </td>
                            </tr>
                        )
                    })
                    }
                    </tbody>
                </table>

                <Link to='/customers/new'><button type='button' className='btn btn-primary'>Add new customer</button></Link>
            </div>
        )
    }
}

export default Customer