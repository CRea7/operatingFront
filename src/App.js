import React, { Component } from 'react';

import ProcedureList from "./Components/ProcedureList";
import ProcedureInput from "./Components/ProcedureInput";
import ProcedureApproval from "./Components/ProcedureApproval";
import ProcedureSend from "./Components/ProcedureSend";
import ProcedureDelete from "./Components/ProcedureDelete";
import ProcedureRevision from "./Components/ProcedureRevision";
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from "./Components/nav";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
        <Router>
        <div>
            <Nav/>
          <Switch>
            <Route path="/procedures" component={ProcedureList} />
            <Route path="/AddProcedure" component={ProcedureInput}/>
          </Switch>
        </div>
        </Router>
    );
  }
}

export default App;
