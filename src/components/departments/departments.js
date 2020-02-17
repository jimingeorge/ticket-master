import React from 'react'
import axios from '../../config/axios'
import DepartmentForm from './form'
import Swal from 'sweetalert2'


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
                console.log(res.data.message)
                Swal.fire(
                    'Oops!',
                    'There was an error in adding department',
                    'error'
                  )
            }else{
                this.setState(prevState=>({
                    departments:prevState.departments.concat(res.data)
                }))
                Swal.fire(
                    'Department added to the list',
                    '',
                    'success'
                  )
            }
        })
    }

    
    handleRemove=(id)=>{
        console.log(id);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
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
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
        
    }

    render(){
        return(
            <div>
                <br/>
                <h1>Department List - {this.state.departments.length}</h1>
                <br/>
                <div className='row'>
                    <div className='col-md-7'>
                        <ul className="list-group">
                        {
                            this.state.departments.map(dept=>{
                                return <li  className="list-group-item " key={dept._id}>{dept.name}
                                    <button className='float-right btn btn-sm btn-danger'onClick={()=>{this.handleRemove(dept._id)}}>Remove</button>
                                </li>
                            })
                        }
                        <br/>
                        </ul>
                    </div>
                    <div className='col-md-1'></div>
                    <div className='col-md-4'>
                        <DepartmentForm submit={this.handleSubmit}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Department