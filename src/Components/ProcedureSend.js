import React from 'react';
import axios from 'axios';
//import procedureservice from "../services/procedureservice";

export default class ProcdureList extends React.Component{
    state = {
        id: ""
    }

    handleChange = event => {
        this.setState({id: event.target.value});
    }

    handleSubmit = event => {
        event.preventDefault();

        axios.put(`http://localhost:3000/api/procedures/${this.state.id}/awaiting`)
            .then(res => {
                console.log(res)
            })
    }

    render() {
        return(
            <form>
                <label>Procedure Id:
                    <input type="text" name="id" onChange={this.handleChange}/>
                </label>
                <button onClick={this.handleSubmit}>Send for approval</button>
            </form>
        )
    }
}

