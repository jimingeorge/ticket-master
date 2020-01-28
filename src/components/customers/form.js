import React from 'react'

class CustomerForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
            name: props.name ? props.name : '',
            email:props.email ? props.email : '',
            mobile:props.mobile ? props.mobile : ''
        }
    }
    
    handleSubmit=(e)=>{
        e.preventDefault()

        const formData = {
            name:this.state.name,
            email:this.state.email,
            mobile:this.state.mobile
        }
        this.props.submit(formData)
    }
    
    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })

    }
    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='name' >Name:</label>
                    <input type='text' onChange={this.handleChange} name='name' id='name' value={this.state.name}/><br/>

                    <label htmlFor='email' >Email:</label>
                    <input type='text' onChange={this.handleChange} name='email' id='email' value={this.state.email}/><br/>

                    <label htmlFor='mobile' >Mobile:</label>
                    <input type='number' onChange={this.handleChange} name='mobile' id='mobile' value={this.state.mobile}/><br/>

                    <input type='submit' value='Add'/>
                </form>
            </div>
        )
    }
} 

export default CustomerForm