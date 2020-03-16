import React, { Component } from 'react';

import ReactDOM from 'react-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import {faTrash, faPencilAlt, faPaperPlane, faRecycle } from '@fortawesome/free-solid-svg-icons'

import ProcedureList from "./Components/ProcedureList";
import ProcedureInput from "./Components/ProcedureInput";
import ProcedureEdit from "./Components/ProcedureEdit";
import Register from "./Components/Register";
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from "./Components/nav";
import Axios from "axios";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from "./Components/Login";

library.add(faTrash, faPencilAlt, faPaperPlane, faRecycle)

class App extends Component {
    constructor(){
        super();

        this.state = {
            loggedInStatus: "NOT_LOGGED_IN",
            email: "",
            department: "",
            id: "",
            admin: "",
            approver: "",
            isNavBarHidden: true
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
                id: localStorage.getItem('id'),
                admin: localStorage.getItem('admin'),
                approver: localStorage.getItem('approver'),
                isNavBarHidden: null
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
                admin: "",
                approver: "",
                isNavBarHidden: true
            })
        }
    }

    handleLog(){
        localStorage.clear()
        window.location.reload();
    }
    handleLogin(data){
        localStorage.setItem('email', data.user.email);
        localStorage.setItem('id', data.user.id);
        localStorage.setItem('department',data.user.department);
        localStorage.setItem('admin' ,data.user.admin);
        localStorage.setItem('approver' ,data.user.approver);

        console.log("TESSST" + localStorage.getItem('admin'));

        this.setState({
            loggedInStatus: "LOGGED_IN",
            email: localStorage.getItem('email'),
            department: localStorage.getItem('department'),
            id: localStorage.getItem('id'),
            admin: localStorage.getItem('admin'),
            approver: localStorage.getItem('approver')
        })
    }

  render() {
    return (
        <Router>
        <div>
            {(this.state.isNavBarHidden) ? null : <Nav/> }
          <Switch>
            <Route
                exact path="/"
                render = {props => (
                    <Login {... props} handleLogin={this.handleLogin}loggedInStatus={this.state.loggedInStatus}/>
                )}/>
            <Route
                path="/procedures"
                render = {props => (
                    <ProcedureList {... props} checkLoginStatus ={() => this.checkLoginStatus()}
                                   email={this.state.email}
                                   department={this.state.department}
                                   admin={this.state.admin}
                                   approver={this.state.approver}
                                   loggedInStatus={this.state.loggedInStatus}/>
                    )} />
              <Route
                  path="/Register"
                  render = {props => (
                      <Register {... props} checkLoginStatus ={() => this.checkLoginStatus()} />
                  )} />
            <Route
                path="/AddProcedure"
                render = {props => (
                    <ProcedureInput {... props} checkLoginStatus ={() => this.checkLoginStatus()} />
                )} />
            <Route path="/ProcedureEdit/:id" component={ProcedureEdit}/>
          </Switch>
        </div>
        </Router>
    );
  }
}

export default App;