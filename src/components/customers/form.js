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
                    <div className="form-group">
                        <label for="exampleInputEmail1">Name</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Name" onChange={this.handleChange} name='name'/>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Email</label>
                        <input type="email" className="form-control" id="exampleInputPassword1" placeholder="email" onChange={this.handleChange} name='email'/>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Mobile</label>
                        <input type="number" className="form-control" id="exampleInputPassword1" placeholder="Mobile No" onChange={this.handleChange} name='mobile'/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
} 

export default CustomerForm