import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import {Button, Form} from 'react-bootstrap';
//import procedureservice from "../services/procedureservice";

export default class ProcedureEdit extends React.Component {
    state = {
        procedures: [],
        id: "",
        title: "",
        status: "draft",
        department: "",
        content: ""
    }

    componentDidMount() {
        //Login check
        if(localStorage.getItem('id') == null)
        {
            this.props.history.push("/")
        }
        //Loads Navbar

        const {id} = this.props.match.params

        console.log(id)

        axios.get(`http://localhost:3000/api/procedures/${id}`).then(res => {
            console.log(res.data.data);
            this.setState({procedures: res.data.data});
            this.myFunction()
        });


        console.log(this.state.procedures)
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

        axios.put(`http://localhost:3000/api/procedures/${id}`, {title: this.state.title, revnum: this.state.procedures.revnum, status: this.state.status, department: this.state.department, content: this.state.content})
            .then(res => {
                console.log(res)
            })
    }

    handleApprove = event => {
        event.preventDefault();

        const {id} = this.props.match.params

        axios.put(`http://localhost:3000/api/procedures/${id}/current`)
            .then(res => {
                console.log(res)
            })
    }

    handleSubmitDraft = event => {
        event.preventDefault();

        const {id} = this.props.match.params

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
                        <Form.Label>Procedure content</Form.Label>
                        <Form.Control as="textarea" placeholder={this.state.procedures.content} rows="3"  name="content" onChange={this.handleCont}/>
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