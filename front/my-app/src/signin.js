import React from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default class Signin extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			password: ''
		}
	}

	handleChange = (event) => {
		let newState = {}

		newState[event.target.name] = event.target.value;
		this.setState(newState)
		console.log(this.state)
	}

	submit = () => {
		console.log("connexion !")
		fetch('http://localhost:3000/api/login', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(this.state)
		})
		.then((response) => {
			return response.json();
		})
		.then((json) => {
			sessionStorage.setItem('token', JSON.stringify(json))
			console.log(json)
		})
	}

	render(){
		return (
			<Form>
				<FormGroup>
					<Label for="username">Username</Label>
					<Input type="text" onChange={this.handleChange} name="username" id="username" placeholder="Franklin"/>
				</FormGroup>
				<FormGroup>
					<Label for="password">Password</Label>
					<Input type="password" onChange={this.handleChange} name="password" id="password"/>
				</FormGroup>
				<Button onClick={this.submit}>Submit</Button>
			</Form>
		)
	}

}
