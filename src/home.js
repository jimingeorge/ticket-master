import React from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'

function Home(props){
    // Swal.fire({
    //     title: 'Add Department',
    //     input: 'text',
    //     inputAttributes: {
    //       autocapitalize: 'off'
    //     },
    //     showCancelButton: true,
    //     confirmButtonText: 'Submit',
    //     showLoaderOnConfirm: true,
    //     preConfirm: (data) => {
    //       return axios.post('http://dct-ticket-master.herokuapp.com/departments',{name:data},{
    //         headers:{
    //             'x-auth':localStorage.getItem('authToken')
    //         }
    //     })
    //         .then(res => {
    //           if (res.data.errors) {
    //             console.log(res.data)
    //           }else{
    //             return res.data
    //           } 
              
    //         })
    //         .catch(error => {
    //           Swal.showValidationMessage(
    //             `Request failed: ${error}`
    //           )
    //         })
    //     },
    //     allowOutsideClick: () => !Swal.isLoading()
    //   }).then((result) => {
    //     if (result.value) {
    //       Swal.fire({
    //         title: `Department Added`
    //       })
    //     }
    //   })

    return(
        <div>
            <h1>Welcome to Ticket Master</h1>
        <br/>
       
        </div>
    )
}

export default Home