import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "react-fontawesome";
import '../App.css';
import { Table} from 'react-bootstrap';
//import procedureservice from "../services/procedureservice";

export default class ProcdureList extends React.Component{
    state = {
        procedures: [],
        id: ""
    }

    componentDidMount() {
        axios.get(`http://localhost:3000/api/procedures`).then(res => {
           console.log(res.data.data);
           this.setState({procedures: res.data.data});
        });
    }

    //deletes the selected procedure
    handleDelete = (procedure) => {

        var id = procedure.id;

        axios.delete(`http://localhost:3000/api/procedures/${id}`)
            .then(res => {
                console.log(res)
            })
    }

    //sends the clicked procedure for approval
    handleSendApprove = (procedure) => {

        var id = procedure.id;

        axios.put(`http://localhost:3000/api/procedures/${id}/awaiting`)
            .then(res => {
                console.log(res)
            })
    }

    handleClick = (procedure) => {

        var id = procedure.id;

        window.location.href = `/ProcedureEdit/${id}`
    }

    render() {



        const contents = this.state.procedures.map(procedure => {
            return<tr>
                <td>{procedure.id}</td>
                <td>{procedure.title}</td>
                <td>{procedure.revnum}</td>
                <td>{procedure.department}</td>
                <td>{procedure.status}</td>
                <td onClick={() => { if (window.confirm('Are you sure you wish to delete this procedure?')) this.handleDelete(procedure) } }>delete</td>
                <td onClick={() => { if (window.confirm('Are you sure you wish to send this procedure for approval?')) this.handleSendApprove(procedure) } }>Send for approval</td>
                <td onClick={() => this.handleClick(procedure)}>edit</td>
            </tr>
        })
            return(
                <div className="container center_div">
                <Table className="protable" striped bordered hover>
                    <thead>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Revision No.</th>
                        <th>Department</th>
                        <th>Status</th>
                        <th>Delete</th>
                        <th>Send for approval</th>
                        <th>Edit</th>
                    </thead>
                    <tbody>
                    {contents}
                    </tbody>
                </Table>
                </div>


            )
        }
}
