import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Table} from 'react-bootstrap';
//import procedureservice from "../services/procedureservice";

export default class ProcdureList extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            procedures: [],
            refined: [],
            users: [],
            id: "",
            title: "",
            revnum: "",
            status: "",
            department: "",
            admin: "",
            approver: "",
            content: ""
        };
    }

    componentDidMount() {
        if(localStorage.getItem('id') == null)
        {
            this.props.history.push("/")
        }
        //checks logged in user
        this.props.checkLoginStatus();
        //gets all the users

        if(localStorage.getItem('approver') === "True") {
            axios.get(`http://localhost:3000/api/procedures`).then(res => {
                console.log(res.data.data);
                var ref = [];
                //loads correct data
                res.data.data.forEach(procedure => {
                    if (procedure.department === this.props.department || procedure.department === "General") {
                        ref.push(procedure)
                    }
                })
                this.setState({procedures: ref});
            });
        }
        else if (localStorage.getItem('admin')=== "True"){
            axios.get(`http://localhost:3000/api/procedures`).then(res => {
                console.log(res.data.data);
                this.setState({procedures: res.data.data});
            });
        }
        else {
            //TO:DO
            //send off page
        }
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
                window.location.reload(false);
            })
    }

    handleClick = (procedure) => {

        var id = procedure.id;

        window.location.href = `/ProcedureEdit/${id}`
    }

    //revision functions
    handleRevision = (procedure) => {

        var id = procedure.id;

        axios.get(`http://localhost:3000/api/procedures/${id}`,)
            .then(res => {
                console.log(res)
                this.setState({title: res.data.data.title, revnum: res.data.data.revnum, status: res.data.data.status, department: res.data.data.department, content: res.data.data.content})
                this.handleSubmitArchive(procedure.id)
                this.handleCreate()
            })
    }

    //changes old versions to archive
    handleSubmitArchive = (id) => {
        axios.put(`http://localhost:3000/api/procedures/${id}/archive`)
            .then(res => {
                console.log(res)
            })
    }

    //creates new procedure after revision
    handleCreate = event => {

        const revnoo = this.state.revnum;
        const revnoop = parseInt(revnoo)
        const hake = revnoop + 1;

        axios.post(`http://localhost:3000/api/procedures`, {title: this.state.title, revnum: hake, status: "draft", department: this.state.department, content: this.state.content, creator: localStorage.getItem('email')})
            .then(res => {
                console.log(res)
            })

    }

    reviseCheck(procedure) {
        if(procedure.status === "current")
        {
            if (window.confirm('Are you sure you wish to revise this procedure?')) this.handleRevision(procedure)
        }
        else
        {
            alert("can only revise current procedures")
        }
    }

    render() {



        const contents = this.state.procedures.map(procedure => {
            return<tr>
                <td>{procedure.id}</td>
                <td>{procedure.title}</td>
                <td>{procedure.revnum}</td>
                <td>{procedure.department}</td>
                <td>{procedure.status}</td>
                <td onClick={() => { if (window.confirm('Are you sure you wish to delete this procedure?')) this.handleDelete(procedure) } }><FontAwesomeIcon icon="trash"></FontAwesomeIcon></td>
                <td onClick={() => { if (window.confirm('Are you sure you wish to send this procedure for approval?')) this.handleSendApprove(procedure) } }><FontAwesomeIcon icon="paper-plane"/></td>
                <td onClick={() => this.handleClick(procedure)}><FontAwesomeIcon icon="pencil-alt"></FontAwesomeIcon></td>
                <td onClick={() => this.reviseCheck(procedure)}> <FontAwesomeIcon icon="recycle"/> </td>
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
                        <th>Approval</th>
                        <th>Edit</th>
                        <th>revise</th>
                    </thead>
                    <tbody>
                    {contents}
                    </tbody>
                </Table>
                </div>


            )
        }
}
