import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import TopMenu from './navbar';


export default class Signin extends React.Component {

	submit(){
		console.log("connexion !")
	}

	render(){
		return (
			<Form>
				<FormGroup>
					<Label for="username">Username</Label>
					<Input type="text" name="username" id="username" placeholder="Franklin"/>
				</FormGroup>
				<FormGroup>
					<Label for="password">Password</Label>
					<Input type="password" name="password" id="password"/>
				</FormGroup>
				<Button onClick={this.submit}>Submit</Button>
			</Form>
		)
	}


}
