import React, {Component} from "react";
import Register from "./Register";
import axios from "axios";
import {Button, Form} from "react-bootstrap";

export  default class Login extends Component{
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            loginErrors: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        //loads navbar
        this.props.checkLoginStatus()
        //checks if user is logged in
        if(localStorage.getItem('id') != null)
        {
            this.props.history.push("/Procedures")
        }
    }

    handleSubmit = event => {
        event.preventDefault();

        axios.post(`http://localhost:3000/api/sessions`, {
                email: this.state.email,
                password: this.state.password
            },
            {withCredentials: true}
        ).then(res => {
            if (res.data.status === 'created') {
                this.handleSuccessfulAuth(res.data)
            }
            console.log("registration response", res);
        }).catch(error => {
            console.log("login error", error);
        });
    };

    handleSuccessfulAuth(data) {
        this.props.handleLogin(data);
        this.props.history.push("/procedures")
    }

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
                                <h5 class="card-title text-center">Sign In</h5>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Control type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Control type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Button class="btn btn-lg btn-primary btn-block" type="submit">LOGIN</Button>
                </Form>
                            </div>
                        </div>
                    </div>
            </div>
            </div>

        )
    }

}