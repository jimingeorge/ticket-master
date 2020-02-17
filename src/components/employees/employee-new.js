import React from 'react'
import EmployeeForm from './employees-form'
import axios from '../../config/axios'
import Swal from 'sweetalert2'

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
                Swal.fire(
                    'Oops!',
                    'There was an error in adding department',
                    'error'
                  )
            }else{
                this.props.history.push('/employees')
                Swal.fire(
                    'Department added to the list',
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
                <h1>Add Employee</h1>
                <EmployeeForm submit={this.handleSubmit}/>
            </div>
        )
    }
}

export default EmployeeNew