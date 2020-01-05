import React from 'react';
import axios from 'axios';
import '../App.css';
//import procedureservice from "../services/procedureservice";

export default class ProcdureList extends React.Component{
    state = {
        procedures: []
    }

    componentDidMount() {
        axios.get(`http://localhost:3000/api/procedures`).then(res => {
           console.log(res.data.data);
           this.setState({procedures: res.data.data});
        });
    }

    render() {
        return this.state.procedures.map(procedure => {
            return(
                <table>
                    <tr>
                        <td>{procedure.id}</td>
                        <td>{procedure.title}</td>
                        <td>{procedure.revnum}</td>
                        <td>{procedure.status}</td>
                    </tr>
                </table>
            )
        }
        );
        // return(
        //     <ul>
        //         {this.state.procedures.map(procedure => (<li key ={procedure.id}>{procedure.title}</li>))}
        //     </ul>
        // )
    }
}

/*
const ProcedureList = () => {
    return (
        <table>
            <thead>
            <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Revision Number</th>
                <th>Status</th>

            </tr>
            </thead>
            <tbody>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            </tbody>
        </table>
    );
}*/
