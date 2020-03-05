import React, {Component} from "react";
import axios from "axios";

export  default class Register extends Component{
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            password_confirmation: "",
            registrationErrors: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this)
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
            password_confirmation: this.state.password_confirmation
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
            <div>
                <h1>Status: {this.props.loggedInStatus}</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required />
                    <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required />
                    <input type="password" name="password_confirmation" placeholder="password_confirmation" value={this.state.password_confirmation} onChange={this.handleChange} required />

                    <button type="submit">Register</button>
                </form>

            </div>
        )
    }

}