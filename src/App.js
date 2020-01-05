import React, { Component } from 'react';

import ProcedureList from "./Components/ProcedureList";
import ProcedureInput from "./Components/ProcedureInput";
import ProcedureApproval from "./Components/ProcedureApproval";
import ProcedureSend from "./Components/ProcedureSend";
import ProcedureDelete from "./Components/ProcedureDelete";
import ProcedureRevision from "./Components/ProcedureRevision";

class App extends Component {
  render() {
    return (
        <div>
          <ProcedureInput/>
          <ProcedureList/>
          <ProcedureSend/>
          <ProcedureApproval/>
          <ProcedureRevision/>
          <ProcedureDelete/>
        </div>
    );
  }
}

export default App;
