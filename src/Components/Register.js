import React, {Component} from "react";
import axios from "axios";
import {Button, Form} from "react-bootstrap";

export  default class Register extends Component{
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            password_confirmation: "",
            department: "",
            admin: "",
            approver: "",
            registrationErrors: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this)
    }

    componentDidMount() {
        //loads navbar
        this.props.checkLoginStatus()
        //checks if user is logged in
        if(localStorage.getItem('id') == null)
        {
            this.props.history.push("/")
        }
    }

    handleSuccessfulAuth(data) {
        this.props.handleLogin(data);
        //this.props.history.push("/procedures")
    }

    handleSubmit = event => {
        event.preventDefault();

        axios.post(`http://localhost:3000/registrations`, {
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation,
                department: this.state.department,
            admin: this.state.admin,
            approver: this.state.approver
        },
            {withCredentials: true}
            ).then(res => {
                if (res.data.status === 'created') {
                    this.handleSuccessfulAuth(res.data)
                }
            console.log("registration response", res);
        }).catch(error => {
            console.log("registration error", error);
        });
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        return (

            <div className="container center_div">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card card-signin my-5">
                            <div className="card-body">
                                <h5 className="card-title text-center">Register User</h5>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="exampleForm.ControlInput1">
                                        <Form.Control type="email" name="email" placeholder="Email"
                                                      value={this.state.email} onChange={this.handleChange} required/>
                                    </Form.Group>
                                    <Form.Group controlId="exampleForm.ControlInput1">
                                        <Form.Control type="password" name="password" placeholder="Password"
                                                      value={this.state.password} onChange={this.handleChange}
                                                      required/>
                                    </Form.Group>
                                    <Form.Group controlId="exampleForm.ControlInput1">
                                        <Form.Control type="password" name="password_confirmation" placeholder="Password confirmation"
                                                      value={this.state.password_confirmation} onChange={this.handleChange}
                                                      required/>
                                    </Form.Group>
                                    <Form.Group controlId="exampleForm.ControlSelect1">
                                        <Form.Label>Select Department</Form.Label>
                                        <Form.Control as="select"  name="department" onChange={this.handleChange}>
                                            <option></option>
                                            <option>General</option>
                                            <option>HR</option>
                                            <option>Finance</option>
                                            <option>Development</option>
                                            <option>Purchasing</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="exampleForm.ControlSelect1">
                                        <Form.Label>Admin</Form.Label>
                                        <Form.Control as="select"  name="admin" onChange={this.handleChange}>
                                            <option></option>
                                            <option>True</option>
                                            <option>False</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="exampleForm.ControlSelect1">
                                        <Form.Label>Approver</Form.Label>
                                        <Form.Control as="select"  name="approver" onChange={this.handleChange}>
                                            <option></option>
                                            <option>True</option>
                                            <option>False</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Button class="btn btn-lg btn-primary btn-block" type="submit">REGISTER</Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            // <div>
            //     <form onSubmit={this.handleSubmit}>
            //         <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required />
            //         <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required />
            //         <input type="password" name="password_confirmation" placeholder="password_confirmation" value={this.state.password_confirmation} onChange={this.handleChange} required />
            //
            //         <button type="submit">Register</button>
            //     </form>
            //
            // </div>
        )
    }

}