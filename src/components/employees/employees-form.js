import React from 'react'
import axios from '../../config/axios'

class EmployeeForm extends React.Component{
    constructor(){
        super()
        this.state={
            departments:[],
            name:'',
            email:'',
            mobile:'',
            departmentSelect:''
        }
    }

    componentDidMount(){
        axios.get('/departments',{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(res=>{
            console.log(res.data);
            this.setState({departments:res.data})
        })
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleSelect=(e)=>{
        const department = e.target.value
        console.log(department);
        
        this.setState({departmentSelect:department})
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        
        const formData={
            name:this.state.name,
            email:this.state.email,
            mobile:this.state.mobile,
            department:this.state.departmentSelect
        }
        this.props.submit(formData)
    }
    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='name'>Name</label>
                    <input type='text' name='name' id='name' onChange={this.handleChange}/><br/>

                    <label htmlFor='email'>Email</label>
                    <input type='text' name='email' id='email' onChange={this.handleChange}/><br/>

                    <label htmlFor='mobile'>Mobile</label>
                    <input type='text' name='mobile' id='mobile' onChange={this.handleChange}/><br/>

                    <label htmlFor='department'>Department</label>
                    <select name="pets" id="pet-select" onChange={this.handleSelect}>
                        <option value=''>Please Select Department</option>
                        {
                            this.state.departments.map(dept=>{
                                return <option key={dept._id} value={dept._id}>{dept.name} </option>
                            })
                        }
                    </select>

                    <input type='submit' value='Add Employee'/>
                </form>
            </div>
        )
    }
}

export default EmployeeForm