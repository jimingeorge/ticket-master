import React from 'react'

class DepartmentForm extends React.Component{
    constructor(){
        super()
        this.state={
            name:{}
        }
    }

    handleChange=(e)=>{
        const data = e.target.value
        this.setState({name:data})
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        const formData = {
            name:this.state.name
        }
        this.props.submit(formData)
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='name'>Department Name:</label>
                    <input type='text' is='name' onChange={this.handleChange} />
                    <button type='button' onClick={this.handleSubmit} className='btn btn-md btn-secondary'>Add Department</button>
                </form>
            </div>
        )
    }
}

export default DepartmentForm