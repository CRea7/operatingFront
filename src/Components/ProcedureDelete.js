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

        axios.delete(`http://localhost:3000/api/procedures/${this.state.id}`)
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
                <button onClick={this.handleSubmit}>Delete Procedure</button>
            </form>
        )
    }
}

