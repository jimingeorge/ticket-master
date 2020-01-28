import React from 'react'
import axios from '../../config/axios'
import {Link} from 'react-router-dom'

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
    }

    render(){
        return (
            <div>
                <h1>Customer Listing - {this.state.customers.length}</h1>
                <ul>
                    {this.state.customers.map(customer=>{
                        return <li key={customer._id}>
                            <Link to='/customers/:id'>
                                {customer.name}
                            </Link> 
                            - {customer.email} -{customer.mobile} 
                            <Link to={`/customers/${customer._id}`} >Show</Link>
                            <button onClick={()=>this.handleRemove(customer._id)}>Remove</button>
                            </li>
                    })}
                </ul>

                <Link to='/customers/new'>Add new customer</Link>
            </div>
        )
    }
}

export default Customer