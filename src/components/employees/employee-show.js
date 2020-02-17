import React from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'

class EmployeeShow extends React.Component{
    constructor(){
        super()
        this.state={
            name:'',
            email:''
        }
    }
    componentDidMount(){
        const id = this.props.match.params.id
        axios.get(`/employees/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }}
        ).then(res=>{
            this.setState({
                name:res.data.name,
                email:res.data.email
            })
        })
    }
    render(){
        return(
            <div>
                <h1>Employee Show</h1>
                <li class="list-group-item">{this.state.name} - {this.state.email}</li>
                <br/>
                <Link to='/employees'>Back</Link>
            </div>
        )
    }
}

export default EmployeeShow