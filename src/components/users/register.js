import React from 'react'
import axios from '../../config/axios'

class Register extends React.Component{
    constructor(){
        super()
        this.state={
            username:'',
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
            username:this.state.username,
            email:this.state.email,
            password:this.state.password
        }
        console.log(formData);
        
        axios.post('/users/register',formData)
            .then(res=>{
                console.log(res.data);
                if(res.data.errors){
                    alert(res.data.message)
                }else{
                    this.props.history.push('/login')
                }
            })
            .catch(err=>alert(err))
    }
    render(){
        return(
            <div>
                <h1>Register Here</h1>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='username'>Username:</label>
                    <input type='text' value={this.state.username} onChange={this.handleChange} name='username' id='username'/>

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

export default Register