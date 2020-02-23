import React from "react";
import axios from "../../config/axios";

class EmployeeForm extends React.Component {
  constructor() {
    super();
    this.state = {
      departments: [],
      name: "",
      email: "",
      mobile: "",
      departmentSelect: ""
    };
  }

  componentDidMount() {
    axios
      .get("/departments", {
        headers: {
          "x-auth": localStorage.getItem("authToken")
        }
      })
      .then(res => {
        console.log(res.data);
        this.setState({ departments: res.data });
      });
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSelect = e => {
    const department = e.target.value;
    console.log(department);

    this.setState({ departmentSelect: department });
  };
  handleSubmit = e => {
    e.preventDefault();

    const formData = {
      name: this.state.name,
      email: this.state.email,
      mobile: this.state.mobile,
      department: this.state.departmentSelect
    };
    this.props.submit(formData);
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div class="form-group">
            <label htmlFor="name">Name</label>
            <input className="form-control"
              type="text"
              name="name"
              id="name"
              onChange={this.handleChange}
            />
            <br />
          </div>
          <div class="form-group">
            <label htmlFor="email">Email</label>
            <input className="form-control"
              type="text"
              name="email"
              id="email"
              onChange={this.handleChange}
            />
            <br />
          </div>
          <div class="form-group">
            <label htmlFor="mobile">Mobile</label>
            <input className="form-control"
              type="text"
              name="mobile"
              id="mobile"
              onChange={this.handleChange}
            />
            <br />
          </div>
          <div class="form-group">
            <label htmlFor="department">Department</label>
            <select className="form-control" name="pets" id="pet-select" onChange={this.handleSelect}>
              <option value="">Please Select Department</option>
              {this.state.departments.map(dept => {
                return (
                  <option key={dept._id} value={dept._id}>
                    {dept.name}{" "}
                  </option>
                );
              })}
            </select>
          </div>
          <button type="submit" className='btn btn-small btn-primary' value="Add Employee">Add Employee</button>
        </form>
      </div>
    );
  }
}

export default EmployeeForm;
