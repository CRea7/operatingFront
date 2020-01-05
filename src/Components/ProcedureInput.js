import React from 'react';
import axios from 'axios';
//import procedureservice from "../services/procedureservice";

export default class ProcdureList extends React.Component{
    state = {
        title: "",
        revnum: 1,
        status: "draft"
    }

    handleChange = event => {
        this.setState({title: event.target.value});
    }

    handleSubmit = event => {
        event.preventDefault();

        axios.post(`http://localhost:3000/api/procedures`, {title: this.state.title, revnum: this.state.revnum, status: this.state.status})
            .then(res => {
                console.log(res)
            })
        window.location.reload();
    }
    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <label>Procedure title:
                <input type="text" name="title" onChange={this.handleChange}/>
                </label>
                <button type="submit">Add</button>
            </form>
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
