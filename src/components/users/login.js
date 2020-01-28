import React from 'react'
import axios from '../../config/axios'

class Login extends React.Component{
    constructor(){
        super()
        this.state={
            email:'',
            password:''
        }
    }
    handleChange=(e)=>{
        
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        const formData={
            email:this.state.email,
            password:this.state.password
        }
        console.log(formData);
        
        axios.post('/users/login',formData)
            .then(res=>{
                console.log(res.data);
                if(res.data.error){
                    alert(res.data.error)
                }else{
                    const token = res.data.token
                    localStorage.setItem('authToken',token)
                    this.props.history.push('/')
                    window.location.reload()
                    
                }
            })
            .catch(err=>alert(err))
    }

    render(){
        return(
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='email' >Email:</label>
                    <input type='text' value={this.state.email} onChange={this.handleChange} name='email' id='email'/>

                    <label htmlFor='password'>Password</label>
                    <input type='password' value={this.state.password} onChange={this.handleChange} name='password' id='password'/>

                    <input type='submit'/>
                </form>
            </div>
        )
    }
}

export default Login