import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import {Button, Form} from 'react-bootstrap';
//import procedureservice from "../services/procedureservice";

export default class ProcedureEdit extends React.Component {
    state = {
        procedures: [],
        training: [],
        id: "",
        title: "",
        status: "draft",
        department: "",
        content: ""
    }

    async componentDidMount() {
        //Login check
        if(localStorage.getItem('id') == null)
        {
            this.props.history.push("/")
        }

        const {id} = this.props.match.params
        var {proid} = "";

        await axios.get(`http://localhost:3000/api/trianing/${id}`).then(res => {
            console.log(res.data.data);
            proid = res.data.data.proid;
            this.setState({training: res.data.data});
        });

        axios.get(`http://localhost:3000/api/procedures/${proid}`).then(res => {
            console.log(res.data.data);
            this.setState({procedures: res.data.data});
        });
    }

    handleSubmit = id => {
        axios.put(`http://localhost:3000/api/trianing/${id}/complete`)
            .then(res => {
                console.log(res)
            })
        this.props.history.push("/Training")
    }

    render() {

        return(
            <div className="container center_div">
                <h2>{this.state.procedures.title}</h2>
                <h3>Department: {this.state.procedures.department}</h3>
                <p>{this.state.procedures.content}</p>
                <button onClick={() => { if (window.confirm('Are you sure you want to finish training on this procedure?')) this.handleSubmit(this.state.training.id) } }>Finish Training</button>
            </div>
        )
    }
}