import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav} from 'react-bootstrap';
import axios from "axios";


function handleLog(){
    localStorage.clear()
    window.location.reload();
}

function handleread(){

    axios.get(`http://localhost:3000/api/procedures/24/filename`,)
        .then(res => {
            console.log(res.data.data)
            window.open(res.data.data)
        })


}

function Navq() {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">Operating Pro App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/procedures">Procedures</Nav.Link>
                    <Nav.Link href="/AddProcedure">Add Procedure</Nav.Link>
                    <Nav.Link href="/Training">Training</Nav.Link>
                </Nav>
                <Nav className="ml-auto">
                    <Nav.Link onClick={handleread}>Help</Nav.Link>
                    <Nav.Link href="/Register">Register</Nav.Link>
                    <Nav.Link onClick={handleLog}>Log Out</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Navq;

