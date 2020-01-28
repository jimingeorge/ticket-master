import React from 'react'
import axios from '../../config/axios'
import DepartmentForm from './form'

class Department extends React.Component{
    constructor(){
        super()
        this.state={
            departments:[]
        }
    }

    componentDidMount(){
        axios.get('/departments',{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(res=>{
            console.log(res.data)
            this.setState({departments:res.data})
        })
    }

    handleSubmit=(formData)=>{
        console.log(formData);
        axios.post('/departments',formData,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(res=>{
            console.log(res.data);
            if(res.data.errors){
                alert(res.data.message)
            }else{
                this.setState(prevState=>({
                    departments:prevState.departments.concat(res.data)
                }))
            }
        })
    }

    
    handleRemove=(id)=>{
        console.log(id);
        axios.delete(`/departments/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(res=>{
            console.log(res.data);
            this.setState(prevState=>({
                departments:prevState.departments.filter(dept=>{
                    return dept._id!==res.data._id
                })
            }))
        })
    }

    render(){
        return(
            <div>
                <h1>Department List - {this.state.departments.length}</h1>
                <ul>
                    {
                        this.state.departments.map(dept=>{
                            return <li key={dept._id}>{dept.name}
                                <button onClick={()=>{this.handleRemove(dept._id)}}>Remove</button>
                            </li>
                        })
                    }
                    <DepartmentForm submit={this.handleSubmit}/>
                </ul>
            </div>
        )
    }
}

export default Department