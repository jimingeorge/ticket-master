import React from 'react'
import CustomerForm from './form'
import axios from '../../config/axios'

class CustomerEdit extends React.Component{
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
            console.log(res.data);
            
            this.setState({customer:res.data})
        })
        .catch(err=>alert(err))
    }
    handleSubmit=(FormData)=>{
        const id = this.props.match.params.id
        console.log(FormData);
        
        axios.put(`/customers/${id}`,FormData,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(res=>{
            console.log(res.data)
            this.props.history.push(`/customers/${id}`)
        })
        .catch(err=>alert(err))
    }

    render(){
        return(
            <div>
                <h1>Edit Customer</h1>
                {
                    Object.keys(this.state.customer).length != 0 && <CustomerForm {...this.state.customer}submit={this.handleSubmit}/>
                }
            </div>
        )
    }
}

export default CustomerEdit