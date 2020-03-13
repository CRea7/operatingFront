import React, { Component } from 'react';

import ProcedureList from "./Components/ProcedureList";
import ProcedureInput from "./Components/ProcedureInput";
import ProcedureEdit from "./Components/ProcedureEdit";
import Register from "./Components/Register";
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from "./Components/nav";
import Axios from "axios";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from "./Components/Login";

class App extends Component {
    constructor(){
        super();

        this.state = {
            loggedInStatus: "NOT_LOGGED_IN",
            email: "",
            department: "",
            id: "",
        }

        this.handleLogin = this.handleLogin.bind(this);
    }

    componentDidMount() {
        this.checkLoginStatus();
    }

    checkLoginStatus() {
        if(localStorage.getItem('id') != null){
            console.log("HERE")
            this.setState({
                loggedInStatus: "LOGGED_IN",
                email: localStorage.getItem('email'),
                department: localStorage.getItem('department'),
                id: localStorage.getItem('id')
            })
        }
        else
        {
            localStorage.clear()
            this.setState({
                loggedInStatus: "NOT_LOGGED_IN",
                email: "",
                department: "",
                id: "",
            })
        }
    }

    handleLog(){
        localStorage.clear()
    }
    handleLogin(data){
        localStorage.setItem('email', data.user.email)
        localStorage.setItem('id', data.user.id)
        localStorage.setItem('department',data.user.department)
        console.log("DEPARTMENT " + localStorage.getItem('department'))

        this.setState({
            loggedInStatus: "LOGGED_IN",
            email: localStorage.getItem('email'),
            department: localStorage.getItem('department'),
            id: localStorage.getItem('id')
        })
    }

  render() {
    return (
        <Router>
        <div>
            <Nav/>
          <Switch>
            <Route
                exact path="/"
                render = {props => (
                    <Login {... props} handleLogin={this.handleLogin}loggedInStatus={this.state.loggedInStatus}/>
                )}/>
            <Route
                path="/procedures"
                render = {props => (
                    <ProcedureList {... props} email={this.state.email} department={this.state.department} loggedInStatus={this.state.loggedInStatus}/>
                    )} />
            <Route path="/AddProcedure" component={ProcedureInput}/>
            <Route path="/ProcedureEdit/:id" component={ProcedureEdit}/>
          </Switch>
            <button onClick={() => this.checkLoginStatus()}>Check</button>
            <button onClick={() => this.handleLog()}>i dunno</button>
        </div>
        </Router>
    );
  }
}

export default App;