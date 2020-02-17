import React from "react";
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function Navigation() {
    const handleLogout = ()=>{
        Swal.fire({
          title: 'Logout!?',
          text: "Are you sure? ",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, logout'
        }).then((result) => {
          if (result.value) {
            localStorage.removeItem('authToken')
          window.location.href='/account/login'
            Swal.fire(
              'Logged Out!',
              '',
              'success'
            )
          }
        })
        
      }
  return (
      <div>
          {localStorage.getItem('authToken')?  <div>
      <nav className="navbar navbar-expand-lg  navbar-dark bg-primary">
        <Link className="navbar-brand" to="/">
          Ticket Master
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home 
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/customers">
                Customers
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link " to="/departments">
                Departments
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link " to="/employees">
                Employees
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link " to="/tickets">
                Tickets
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link "  onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </ul>
          
        </div>
      </nav>
    </div> :  <div>
      <nav className="navbar navbar-expand-lg  navbar-dark bg-primary">
        <Link className="navbar-brand" to="/">
          Ticket Master
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home 
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/account/login">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link " to="/account/register">
                Register
              </Link>
            </li>            
          </ul>
          
        </div>
      </nav>
    </div>}
      </div>
   
  );
}
