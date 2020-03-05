import React, {Component} from "react";
import Register from "./Register";
import axios from "axios";

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
            <div>
                <h1>Status: {this.props.loggedInStatus}</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required />
                    <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required />

                    <button type="submit">Login</button>
                </form>
                <Register/>
            </div>
        )
    }

}