import React from 'react'
import TicketForm from './ticket-form'
import axios from '../../config/axios'

class TicketAdd extends React.Component{
    handleSubmit=(formData)=>{
        axios.post('/tickets',formData,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(res=>{
            console.log(res.data);
            window.location.href='/tickets'
        })
        .catch(err=>alert(err))
        console.log(formData);
        
    }
    render(){
        return(
            <div>
                <br/>
                <h1>Add Ticket</h1>
                <TicketForm submit={this.handleSubmit}/>
            </div>
        )
    }
}

export default TicketAdd