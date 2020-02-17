import React from 'react'
import axios from '../../config/axios'

class TicketForm extends React.Component{
    constructor(){
        super()
        this.state={
            customers:[],
            departments:[],
            employees:[],
            employeeShow:[],
            code:'',
            message:'',
            priority:'',
            customer:{},
            department:{},
            employees:{}
        }
        
    }

    componentDidMount(){
        {
            axios.get('/customers',{
                headers:{
                    'x-auth':localStorage.getItem('authToken')
                }
            })
            .then(res=>{
                console.log(res.data)
                const customers = res.data
                this.setState({customers})
            })
            .catch(err=>alert(err))
        }
        //--------Departments-----------
        {
            axios.get('/departments',{
                headers:{
                    'x-auth':localStorage.getItem('authToken')
                }
            })
            .then(res=>{
                console.log(res.data)
                const departments = res.data
                this.setState({departments})
            })
            .catch(err=>alert(err))
        }
        //--------Employees-----------
        {
            axios.get('/employees',{
                headers:{
                    'x-auth':localStorage.getItem('authToken')
                }
            })
            .then(res=>{
                console.log(res.data)
                const employees = res.data
                this.setState({employees})
            })
            .catch(err=>alert(err))
        }
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        
        const formData = {
            code:this.state.code,
            customer:this.state.customer,
            department:this.state.department,
            employees:this.state.employee,
            message:this.state.message,
            priority:this.state.priority
        }
        
        //console.log(formData);
        
        this.props.submit(formData)
        
    }
    handleChange=(e)=>{
        console.log([e.target.name],e.target.value)
                
        if(e.target.name == 'customerName'){
            const customer = this.state.customers.find(ele=>{
                return ele.name ==e.target.value
            })
            this.setState({customer})
        }else if(e.target.name == 'employeeName'){
            const employee = this.state.employees.find(ele=>{
                return ele.name == e.target.value
            })
            this.setState({employee})
        }else{
            this.setState({[e.target.name]:e.target.value})
        }
        
    }
    handleEmployee=(e)=>{
        const target = e.target.value
        
        const filterItem = this.state.employees.filter(ele=>{
            return ele.department.name == target
            })
        const department = this.state.departments.find(ele=>{
            return ele.name == target
        })
        this.setState({employeeShow:filterItem,department})
    }
    
    
    
    render(){
        return(
            
            <form onSubmit={this.handleSubmit}>
                 <div class="form-group">
                <label htmlFor='code'>Code</label>
                <br/>
                <input className="form-control" type='text' name='code' id='code' onChange={this.handleChange} value={this.state.code}/>
                </div>
                <div class="form-group">
                <label htmlFor='customer'>Customer</label>
                
                <select className="form-control" id='customer' name='customerName' onChange={this.handleChange}>
                    <option  value="">select</option>
                    {
                        this.state.customers.map(ele=>{
                            return <option key={ele._id}  value={ele.name}>{ele.name}</option>
                        })
                    }
                </select>
                </div>
                <div class="form-group">
                <label htmlFor='department'>Department</label>
                
                <select className="form-control" id='department' name='departmentName' onChange={this.handleEmployee}>
                    <option value="">select</option>
                    {
                        this.state.departments.map(ele=>{
                            return <option key={ele._id}  value={ele.name}>{ele.name}</option>
                        })
                    }
                </select>
                </div>
                <div class="form-group">
                <label htmlFor='employee'>Employees</label>
                
                <select className="form-control" id='employees' name='employeeName' onChange={this.handleChange}>
                    <option value="">select</option>
                    {
                       this.state.employeeShow.map(ele=>{
                                return <option key={ele._id} value={ele.name} >{ele.name}</option>
                            })
                        
                    }
                </select>
                </div>
                <div class="form-group">
                <label htmlFor='message'>Message</label>
                
                <textarea className="form-control" rows='4' cols='50' name='message' id='message' onChange={this.handleChange}></textarea>
                </div>
                <div class="form-group">
                <label class="form-check-label" htmlFor='priority' >Priority</label>
               <br/>
                <input className='form-check-input' type="radio" name="priority" value="High" onClick = {this.handleChange}/> High<br/>
                <input className='form-check-input' type="radio" name="priority" value="Medium" onClick={this.handleChange}/> Medium<br/>
                <input className='form-check-input' type="radio" name="priority" value="Low" onClick ={this.handleChange}/> Low<br/><br/>
                </div>
                <input type='submit'/>
            </form>
        )
    }
}

export default TicketForm