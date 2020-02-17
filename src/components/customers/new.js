import React from 'react'
import axios from '../../config/axios'
import CustomerForm from './form'
import Swal from 'sweetalert2'

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
                console.log(res.data.message)
                Swal.fire(
                    'Oops!',
                    'There was an error in adding customer',
                    'error'
                  )
            }else{
                this.props.history.push('/customers')
                Swal.fire(
                    'Customer added to the list',
                    '',
                    'success'
                  )
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