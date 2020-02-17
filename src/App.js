import React from 'react'
import { Link , BrowserRouter , Route ,Switch } from 'react-router-dom'
import Home from './home'
import Login from './components/users/login'
import Register from './components/users/register'
import Customer from './components/customers/customer'
import CustomerShow from './components/customers/customer-show'
import CustomerNew from './components/customers/new'
import Department from './components/departments/departments'
import Employees from './components/employees/employees'
import EmployeeShow from './components/employees/employee-show'
import EmployeeNew from './components/employees/employee-new'
import CustomerEdit from './components/customers/Customer-Edit'
import Ticket from './components/ticket/ticket'
import TicketAdd from './components/ticket/ticket-add'
import Navigation from './components/navigation' 

import Swal from 'sweetalert2'

function App(props) {
  return (
    <BrowserRouter>
        <div className='container'>
          
          <Navigation/>
          {/* <Link to='/'>Home</Link>
          {localStorage.getItem('authToken') ? 
            <div>
                  <Link to='/customers'>Customers</Link>
                  <Link to='/departments'>Departments</Link>
                  <Link to='/employees'>Employees</Link>
                  <Link to='/tickets'>Tickets</Link>
                  <Link to='#' onClick={handleLogout}>Logout</Link>
            </div> :
            <div>
              <Link to='/account/login'>Login</Link>
              <Link to='/account/register'>Register</Link>
            </div>
          }
           */}
          
          
          <Switch>
            <Route path='/' component={Home} exact={true}/>

            <Route path='/account/login' component={Login} />
            <Route path='/account/register' component={Register} />
            <Route path='/account/logout' component={Register} />

            <Route path='/customers' component={Customer} exact={true}/>
            <Route path='/customers/new' component={CustomerNew} />
            <Route path='/customers/edit/:id' component={CustomerEdit} />
            <Route path='/customers/:id' component={CustomerShow} />
            

            <Route path='/departments' component={Department} />

            <Route path='/employees' component={Employees} exact={true}/>
            <Route path='/employees/new' component={EmployeeNew} />
            <Route path='/employees/:id' component={EmployeeShow} />

            <Route path='/tickets' component={Ticket} exact={true}/>
            <Route path='/tickets/new' component={TicketAdd} />
          </Switch>

        </div>
    </BrowserRouter>
  )
}

export default App;
