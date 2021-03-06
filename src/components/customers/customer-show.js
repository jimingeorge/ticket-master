import React from 'react'
import axios from '../../config/axios'
import {Link} from 'react-router-dom'

class CustomerShow extends React.Component{
    constructor(){
        super()
        this.state={
            customer:{}
        }
    }

    componentDidMount(){
        const id = this.props.match.params.id

        axios.get(`/customers/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(res=>{
            console.log(res.data)
            this.setState({customer:res.data})
        })
        .catch(err=>alert(err))
    }

    render(){
        
        return(
            <div>
                <h1>customer show</h1>
                <p>{this.state.customer.name} - {this.state.customer.email} - {this.state.customer.mobile}</p>
                <Link to={`/customers/edit/${this.props.match.params.id}`}>Edit</Link>
                {'  '}
                <Link to='/customers' >Back</Link>
            </div>
        )
    }
}

export default CustomerShow