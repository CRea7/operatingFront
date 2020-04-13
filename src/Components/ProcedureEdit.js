import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import {Button, Form} from 'react-bootstrap';
import {forEach} from "react-bootstrap/cjs/ElementChildren";
//import procedureservice from "../services/procedureservice";

export default class ProcedureEdit extends React.Component {
    state = {
        procedures: [],
        users: [],
        email: [],
        title: "",
        status: "draft",
        department: "",
        file: null
    }

    async componentDidMount() {
        //Login check
        if(localStorage.getItem('id') == null)
        {
            this.props.history.push("/")
        }
        //Loads Navbar
        const {id} = this.props.match.params

        console.log(id)

        await axios.get(`http://localhost:3000/api/procedures/${id}`).then(res => {
            console.log(res.data.data);
            this.setState({title: res.data.data.title});
            this.setState({department: res.data.data.department})
            this.setState({procedures: res.data.data});
            this.myFunction()
        });

        axios.get(`http://localhost:3000/api/sessions`).then(resu => {
            resu.data.data.forEach(user => {
                if(user.department === this.state.department){
                    this.state.email.push(user.email);
                }
            });
        });


        console.log(this.state.email)
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

    handleSubmit = event => {
        event.preventDefault();

        const {id} = this.props.match.params

        axios.delete(`http://localhost:3000/api/procedures/${id}`)
            .then(res => {
                console.log(res)
            })

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

    handleApprove = event => {

        const {id} = this.props.match.params
        this.training(id)

    };

    async training(id) {

        await axios.put(`http://localhost:3000/api/procedures/${id}/current`)
            .then(res => {
                console.log(res)
            });

        this.state.email.forEach(user => {

            axios.post(`http://localhost:3000/api/trianing`, {email: user, procedure: this.state.title, status: "Unfinished", proid: id})
                .then(res => {
                    console.log(res)
                });
        });

        this.props.history.push("/Procedures")

    }

    handleSubmitDraft = event => {
        event.preventDefault();

        const {id} = this.props.match.params;

        axios.put(`http://localhost:3000/api/procedures/${id}/draft`)
            .then(res => {
                console.log(res)
            })
    }
    //shows and hides approval buttons
     myFunction() {
        var x = document.getElementById("myDIV");
        if (this.state.procedures.status === "awaiting approval") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }

        console.log(this.state.procedures.status)
    }

    onChangeHandler = event => {
        this.setState({file: event.target.files[0], loaded: 0})
    }


    render() {

        return(
            <div className="container center_div">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Operating procedure title</Form.Label>
                        <Form.Control type="text" name="title" placeholder={this.state.procedures.title} onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Select Department</Form.Label>
                        <Form.Control as="select"  name="department" onChange={this.handleDep}>
                            <option>{this.state.procedures.department}</option>
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
                    <Button type="submit">submit changes</Button>
                </Form>
                <div id="myDIV">
                    <Button onClick={this.handleApprove}>Approve</Button>
                    <Button onClick={this.handleSubmitDraft}>Deny</Button>
                </div>
            </div>
        )
    }
}