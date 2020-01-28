import React from 'react'
import EmployeeForm from './employees-form'
import axios from '../../config/axios'

class EmployeeNew extends React.Component{
    handleSubmit=(formData)=>{
        console.log(formData);
        
        axios.post('/employees',formData,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(res=>{
            console.log(res.data);
            if(res.data.errors){
                alert(res.data.message)
            }else{
                this.props.history.push('/employees')
            }
        })
        .catch(err=>alert(err))
        
        

    }
    render(){
        return(
            <div>
                <h1>Add Employee</h1>
                <EmployeeForm submit={this.handleSubmit}/>
            </div>
        )
    }
}

export default EmployeeNew