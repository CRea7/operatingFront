import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Form, Button} from 'react-bootstrap';
//import procedureservice from "../services/procedureservice";

export default class ProcdureList extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            revnum: 1,
            file: null,
            status: "draft",
            department: ""
        };
    }

    componentDidMount() {
        //loads navbar
        this.props.checkLoginStatus()
        //checks if user is logged in
        if(localStorage.getItem('id') == null)
        {
            this.props.history.push("/")
        }
    }

    handleChange = event => {
        this.setState({title: event.target.value});
    }

    handleDep = event => {
        this.setState({department: event.target.value})
    }

    handleCont = event => {
        this.setState({content: event.target.value})
    }

    onChangeHandler = event => {
        this.setState({file: event.target.files[0], loaded: 0})
    }

    handleSubmit = event => {
        event.preventDefault();

        const data = new FormData();

        data.append('title', this.state.title);
        data.append('revnum', "1");
        data.append('status', this.state.status);
        data.append('department', this.state.department);
        data.append('creator', localStorage.getItem('email'));
        data.append('file', this.state.file);

        axios.post(`http://localhost:3000/api/procedures`, data)
            .then(res => {
                console.log(res)
            })

    }
    render() {
        return(
            <div className="container center_div borders">
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Operating procedure title</Form.Label>
                    <Form.Control type="text" name="title" onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Select Department</Form.Label>
                    <Form.Control as="select"  name="department" onChange={this.handleDep}>
                        <option></option>
                        <option>General</option>
                        <option>HR</option>
                        <option>Finance</option>
                        <option>Development</option>
                        <option>Purchasing</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Procedure upload</Form.Label>
                    <Form.Control type="file" label='Upload' name="file" onChange={this.onChangeHandler}/>
                </Form.Group>
                <Button type="submit">submit draft</Button>
            </Form>
            </div>
        )
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
