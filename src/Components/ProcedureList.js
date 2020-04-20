import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Table} from 'react-bootstrap';
//import procedureservice from "../services/procedureservice";

export default class ProcedureList extends React.Component{

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

        if(procedure.status === "Draft")
        {
            if (window.confirm('Are you sure you wish to send this procedure for approval?'))
            {
                axios.put(`http://localhost:3000/api/procedures/${id}/awaiting`)
                    .then(res => {
                        console.log(res)
                        window.location.reload(false);
                    })
            }
        }
        else
        {
            alert("can only send Draft procedures for approval")
        }


    }

    handleClick = (procedure) => {

        var id = procedure.id;

        if(procedure.status === "Draft" || procedure.status === "Awaiting Approval")
        {
            window.location.href = `/ProcedureEdit/${id}`
        }
        else
        {
            alert("cannot edit this procedure")
        }
    }

    //revision functions
    handleRevision = (procedure) => {

        var id = procedure.id;

        axios.get(`http://localhost:3000/api/procedures/${id}`,)
            .then(res => {
                console.log(res)
                this.setState({title: res.data.data.title, revnum: res.data.data.revnum, status: res.data.data.status, department: res.data.data.department, content: res.data.data.content})
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

        axios.post(`http://localhost:3000/api/procedures`, {title: this.state.title, revnum: hake, status: "Draft", department: this.state.department, content: this.state.content, creator: localStorage.getItem('email')})
            .then(res => {
                console.log(res)
                window.location.reload(false);
            })

    }

    reviseCheck(procedure) {
        if(procedure.status === "Current")
        {
            if (window.confirm('Are you sure you wish to revise this procedure?')) this.handleRevision(procedure)
        }
        else
        {
            alert("can only revise current procedures")
        }
    }

    handleread = (procedure) => {

        var id = procedure.id;

        axios.get(`http://localhost:3000/api/procedures/${id}/filename`,)
            .then(res => {
                console.log(res.data.data)
                window.open(res.data.data)
            })


    }

    render() {



        const contents = this.state.procedures.map(procedure => {
            return<tr>
                <td>{procedure.id}</td>
                <td onClick={() => this.handleread(procedure)}>{procedure.title}</td>
                <td>{procedure.revnum}</td>
                <td>{procedure.department}</td>
                <td>{procedure.status}</td>
                <td onClick={() => { if (window.confirm('Are you sure you wish to delete this procedure?')) this.handleDelete(procedure) } }><FontAwesomeIcon icon="trash"></FontAwesomeIcon></td>
                <td onClick={() =>  this.handleSendApprove(procedure) }><FontAwesomeIcon icon="paper-plane"/></td>
                <td onClick={() => this.handleClick(procedure)}><FontAwesomeIcon icon="pencil-alt"></FontAwesomeIcon></td>
                <td onClick={() => this.reviseCheck(procedure)}> <FontAwesomeIcon icon="recycle"/> </td>
            </tr>
        })
            return(
                <div className="container center_div">
                <Table className="protable" responsive>
                    <thead className="thead">
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
