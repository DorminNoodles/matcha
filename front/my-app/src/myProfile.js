import React from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, FormGroup, Label, Input, Nav, NavItem, NavLink  } from 'reactstrap';

export default class MyProfile extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			showForm: ''
		}


		// console.log("fetch");

		fetch('http://localhost:3000/api/user/2', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}
		})

		console.log(sessionStorage.getItem('id'))
		// this.fillUserData()
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
						<Input type="text" name="username" id="username" placeholder="Franklin"/>
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
					<Button onClick={this.submit}>Submit</Button>
				</Form>
			</div>
		)
	}
}
