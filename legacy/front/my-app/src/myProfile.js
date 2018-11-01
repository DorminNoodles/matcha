import React from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, FormGroup, Label, Input, Nav, NavItem, NavLink  } from 'reactstrap';

export default class MyProfile extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			username: "",
			firstname: "",
			lastname: "",
			email: "",
			address: ""
		}

		fetch('http://localhost:3000/api/user/', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'x-access-token': JSON.parse(sessionStorage.getItem('user')).token
			}
		})
		.then((response) => {
			return response.json();
		})
		.then((userData) => {
			console.log(userData)
			this.setState(userData)
		})
		.catch(() => {
			console.log("catch")
		})

		this.handleChange = this.handleChange.bind(this);
		// this.fillUserData()
	}

	handleChange(e){

		let newState = {}

		newState[e.target.name] = e.target.value
		this.setState(newState)

		console.log(e.target.value)

	}

	fillUserData(){

		// fetch('http://localhost:3000/api/login', {
		// 	method: 'GET',
		// 	headers: {
		// 		'Accept': 'application/json',
		// 		'Content-Type': 'application/json',
		// 		'Token': let data2 = JSON.parse(sessionStorage.getItem('myData'))
		// 	},
		// 	body: JSON.stringify(this.state)
		// })

	}

	render(){

		return(
			<div>
				<Form>
					<p>Username</p>
					<FormGroup>
						<Label for="username">Username</Label>
						<Input value={this.state.username} onChange={this.handleChange} type="text" name="username" id="username" placeholder="Franklin"/>
					</FormGroup>
					<p>Password</p>
					<FormGroup>
						<Label for="oldPassword">Current Password</Label>
						<Input type="password" name="oldPassword" id="oldPassword"/>
					</FormGroup>
					<FormGroup>
						<Label for="newPassword">New Password</Label>
						<Input type="password" name="newPassword" id="newPassword"/>
					</FormGroup>
					<FormGroup>
						<Label for="newPassword2">Confirm  New Password</Label>
						<Input type="password" name="newPassword2" id="newPassword2"/>
					</FormGroup>
					<FormGroup>
						<Label for="firstname">First Name</Label>
						<Input value={this.state.firstname} onChange={this.handleChange} type="text" name="firstname" id="firstname"/>
					</FormGroup>
					<FormGroup>
						<Label for="lastname">Last Name</Label>
						<Input value={this.state.lastname} onChange={this.handleChange} type="text" name="lastname" id="lastname"/>
					</FormGroup>
					<FormGroup>
						<Label for="email">Email</Label>
						<Input value={this.state.email} onChange={this.handleChange} type="text" name="email" id="email"/>
					</FormGroup>
					<FormGroup>
						<Label for="address">Address</Label>
						<Input value={this.state.address} onChange={this.handleChange} type="text" name="address" id="address"/>
					</FormGroup>
					<Button onClick={this.submit}>Submit</Button>
				</Form>
			</div>
		)
	}
}
