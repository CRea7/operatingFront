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
            user: {}
        }

        this.handleLogin = this.handleLogin.bind(this);
    }

    componentDidMount() {
        this.checkLoginStatus();
    }

    checkLoginStatus() {
        Axios.get("http://localhost:3000/api/logged_in", {withCredentials: true}).then(res => {
            console.log("logged in?", res);
        }).catch(error => {
            console.log("check login error", error);
        })
    }

    handleLogin(data){
        this.setState({
            loggedInStatus: "LOGGED_IN",
            user: data.user
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
                    <ProcedureList {... props} user={this.state.user} loggedInStatus={this.state.loggedInStatus}/>
                    )} />
            <Route path="/AddProcedure" component={ProcedureInput}/>
            <Route path="/ProcedureEdit/:id" component={ProcedureEdit}/>
          </Switch>
            <button onClick={() => this.checkLoginStatus()}>Check</button>
        </div>
        </Router>
    );
  }
}

export default App;