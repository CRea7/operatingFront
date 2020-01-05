import React from 'react';
import axios from 'axios';
//import procedureservice from "../services/procedureservice";

export default class ProcdureList extends React.Component{
    state = {
        id: 0,
        title: "",
        revnum: 0,
        status: ""
    }

    handleChange = event => {
        this.setState({id: event.target.value});
    }

    handleSubmit = event => {
        event.preventDefault();

        axios.get(`http://localhost:3000/api/procedures/${this.state.id}`,)
            .then(res => {
                console.log(res)
                this.setState({title: res.data.data.title, revnum: res.data.data.revnum, status: res.data.data.status})
                this.handleSubmitArchive()
                this.handleCreate()
            })
    }

    handleSubmitArchive = event => {
        console.log(this.state.id)
        axios.put(`http://localhost:3000/api/procedures/${this.state.id}/archive`)
            .then(res => {
                console.log(res)
            })
    }

    handleCreate = event => {

        const revnoo = this.state.revnum;
        const revnoop = parseInt(revnoo)
        const hake = revnoop + 1;

        axios.post(`http://localhost:3000/api/procedures`, {title: this.state.title, revnum: hake, status: "draft"})
            .then(res => {
                console.log(res)
            })

    }
    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <label>Procedure title:
                    <input type="text" name="id" onChange={this.handleChange}/>
                </label>
                <button type="submit">Revise Procedure</button>
            </form>
        )
    }
}

