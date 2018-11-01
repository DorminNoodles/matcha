import React from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default class Profile extends React.Component {

	render(){
		return(
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
