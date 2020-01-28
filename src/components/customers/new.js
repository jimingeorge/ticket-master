import React from 'react'
import axios from '../../config/axios'
import CustomerForm from './form'

class CustomerNew extends React.Component{

    handleSubmit=(formData)=>{
        console.log(formData);
        
        axios.post('/customers',formData,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(res=>{
            console.log(res.data);
            if(res.data.errors){
                alert(res.data.message)
            }else{
                this.props.history.push('/customers')
            }
        })
        .catch(err=>alert(err))
        
        

    }

    render(){
        return(
            <div>
                <h1>Add New Customer</h1>
                <CustomerForm submit={this.handleSubmit}/>
            </div>
        )
    }
}

export default CustomerNew