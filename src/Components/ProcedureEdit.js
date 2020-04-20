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
        revnum:"1",
        status: "draft",
        department: "",
        oldproid: "",
        file: null
    }

    async componentDidMount() {
        //Login check
        if(localStorage.getItem('id') == null)
        {
            this.props.history.push("/")
        }
        const {id} = this.props.match.params

        console.log(id)

        await axios.get(`http://localhost:3000/api/procedures/${id}`).then(res => {
            console.log(res.data.data);
            this.setState({title: res.data.data.title});
            this.setState({department: res.data.data.department})
            this.setState({procedures: res.data.data});
            this.setState({revnum: res.data.data.revnum})
            this.myFunction()
        });
        //gets the rev number of the old procedure
        var num = this.state.revnum - 1;
        var numString = num.toString();
        console.log("NUM " + num);
        //takes in all the procedures to check against previous versions
        if (num != 0) {

            axios.get(`http://localhost:3000/api/procedures`).then(res => {
                console.log(res.data.data);
                var ref = [];
                res.data.data.forEach(procedure => {
                    //finds the previous revision of the procedure
                    if (procedure.title === this.state.title && procedure.revnum === numString) {
                        console.log("THERE IS AN OLD ONE " + procedure.title + " " + procedure.revnum)
                        this.setState({oldproid: procedure.id})
                    }
                })

                this.setState({oldpro: ref});
            });
        }

        //gets list of users in the same department as the procedure
        axios.get(`http://localhost:3000/api/sessions`).then(resu => {
            resu.data.data.forEach(user => {
                if(user.department === this.state.department){
                    console.log("users")
                    this.state.email.push(user.email);
                } else if(this.state.department === "General") //if the procedure is in the general department all users get added to the email list
                {
                    this.state.email.push(user.email);
                }
            });
        });

        if (localStorage.getItem('approver') == null && localStorage.getItem('admin') == null)
        {
            this.props.history.push("/Training")
        }

        if (localStorage.getItem('approver') != null)
        {
            this.hide();
        }

        console.log(this.state.email)
    }

    hide() {
        var x = document.getElementById("select");
        if (localStorage.getItem('approver') == "True") {
            x.style.display = "none";
        } else {
            x.style.display = "block";
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

    handleSubmit = event => {
        event.preventDefault();

        const {id} = this.props.match.params

        axios.delete(`http://localhost:3000/api/procedures/${id}`)
            .then(res => {
                console.log(res)
            })

        const data = new FormData();

        data.append('title', this.state.title);
        data.append('revnum', this.state.revnum);
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

        if(this.state.oldpro != null){
            axios.put(`http://localhost:3000/api/procedures/${this.state.oldproid}/archive`)
                .then(res => {
                    console.log(res)
                })
        }


        //sets the document to current
        await axios.put(`http://localhost:3000/api/procedures/${id}/current`)
            .then(res => {
                console.log(res)
            });

        //assigns triaing for all users in the department
        this.state.email.forEach(user => {
            axios.post(`http://localhost:3000/api/trianing`, {email: user, procedure: this.state.title, status: "Unfinished", proid: id})
                .then(res => {
                    console.log(res)
                });
        });

        //redirects users to the procedures tab
        this.props.history.push("/Procedures")

    }

    handleSubmitDraft = event => {
        event.preventDefault();

        const {id} = this.props.match.params;
        //if a procedure is denied it is redirected to draft
        axios.put(`http://localhost:3000/api/procedures/${id}/draft`)
            .then(res => {
                console.log(res)
                //redirects users to the procedures tab
                this.props.history.push("/Procedures")
            })
    }
    //shows and hides approval buttons
     myFunction() {
        var x = document.getElementById("myDIV");
        var y = document.getElementById("form")
        if (this.state.procedures.status === "Awaiting Approval") {
            x.style.display = "block";
            y.style.display = "none";
        } else {
            x.style.display = "none";
            y.style.display = "block";
        }
    }

    onChangeHandler = event => {
        this.setState({file: event.target.files[0], loaded: 0})
    }


    render() {

        return(
            <div className="container width_div">
                <Form id="form" className="protable" onSubmit={this.handleSubmit}>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Operating procedure title</Form.Label>
                        <Form.Control type="text" name="title" placeholder={this.state.procedures.title} onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group id="select" controlId="exampleForm.ControlSelect1">
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
                <div className="container center_div " id="myDIV">
                    <h3>Approve or deny procedure</h3>
                            <Button id="btn1" onClick={this.handleApprove}>Approve</Button>
                            <Button id="btn2" onClick={this.handleSubmitDraft}>Deny</Button>

                </div>
            </div>
        )
    }
}