import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Table} from 'react-bootstrap';
import procedureservice from "../services/procedureservice";
//import procedureservice from "../services/procedureservice";

export default class ProcdureList extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            procedures: [],
            training: [],
            users:[],
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

    async componentDidMount() {
        if(localStorage.getItem('id') == null)
        {
            this.props.history.push("/")
        }
        //checks logged in user
        this.props.checkLoginStatus();

           await axios.get(`http://localhost:3000/api/procedures`).then(res => {
            console.log(res.data.data);
            this.setState({procedures: res.data.data});
        });

        axios.get(`http://localhost:3000/api/trianing`).then(res => {
            console.log(res.data.data);
            var ref = [];
            res.data.data.forEach(train => {
                console.log("TRAIN " + localStorage.getItem("email"))
                if (train.email === localStorage.getItem("email") && train.status === "Unfinished") {
                    this.state.procedures.forEach(pro => {
                        if(train.procedure === pro.title)
                        {
                            console.log("title " + pro.title)
                            train.proId = pro.id;
                            train.department = pro.department
                            ref.push(train)
                        }
                    });

                }
            })
            this.setState({training: ref});
            console.log("TRAINING " + this.state.training)
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


    // handleClick = (procedure) => {
    //
    //     var id = procedure.id;
    //
    //     axios.get(`http://localhost:3000/api/procedures/${id}filename`,)
    //         .then(res => {
    //             console.log(res.data)
    //         })
    //     //window.location.href = `/ProcedureEdit/${id}`
    // }

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

    handleClick = (training) => {

        var id = training.proId;

        axios.get(`http://localhost:3000/api/procedures/${id}/filename`,)
                 .then(res => {
                     console.log(res.data.data)
                     window.open(res.data.data)
                 })


    }

    handleTrainApprove = id => {
        axios.put(`http://localhost:3000/api/trianing/${id}/complete`)
            .then(res => {
                console.log(res)
            })
        this.props.history.push("/Training")
    }

    render() {



        const contents = this.state.training.map(training => {
            return<tr>
                <td>{training.proId}</td>
                <td>{training.procedure}</td>
                <td>{training.department}</td>
                <td>{training.status}</td>
                <td onClick={() => this.handleClick(training)}> <FontAwesomeIcon icon="book-reader"/> </td>
                <td onClick={() => { if (window.confirm('Are you sure you want to finish training?')) this.handleTrainApprove(training.id) } }><FontAwesomeIcon icon="paper-plane"/></td>
            </tr>
        })
        return(
            <div className="container center_div">
                <Table className="protable" striped bordered hover>
                    <thead>
                    <th>ID</th>
                    <th>Proceudre</th>
                    <th>Department</th>
                    <th>Status</th>
                    <th>Read</th>
                    <th>Approve</th>
                    </thead>
                    <tbody>
                    {contents}
                    </tbody>
                </Table>
            </div>


        )
    }
}
