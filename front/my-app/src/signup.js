import React from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import countries from 'country-list';
import axios from './api'

function Submit(props) {
	return(
		<Button color="primary">Submit</Button>
	);
}

export default class Signup extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
		   username: '',
		   password: '',
		   firstname: '',
		   lastname: '',
		   email: '',
		   address: ''
	   	}
		this.signup = this.signup.bind(this)
	}

	signup(event) {
		event.preventDefault()

		axios.post('/user', {
			username: this.state.username,
			password: this.state.password,
			firstname: this.state.firstname,
			lastname: this.state.lastname,
			email: this.state.email,
			address: this.state.address
		})
		.then(function (response) {
			console.log('reponse:', response);
		})
		.catch(function (error) {
			console.log('ah merde alors ');
		});
	}

	handleChange = (event) => {
	  let newState = {}

	  newState[event.target.name] = event.target.value

	  this.setState(newState, (confirmed) => {
		  console.log('state has been updated', this.state)
	  })
 	}

  render() {

	  let listCountries = countries().getData().map((country) => {
		  return <option key={country.code}>{country.name}</option>
	  });

    return (

		<Form>
			<FormGroup row>
				<Label sm={{ size: 2, offset: 1 }}>Username</Label>
				<Col sm={7}>
					<Input onChange={this.handleChange} type="text" name="username" id="Username" placeholder="Buzz" />
				</Col>
			</FormGroup>
			<FormGroup row>
				<Label sm={{ size: 2, offset: 1 }}>Email</Label>
				<Col sm={7}>
					<Input onChange={this.handleChange} type="email" name="email" id="exampleEmail" placeholder="xyz@exemple.com" />
				</Col>
			</FormGroup>
			<FormGroup row>
				<Label sm={{ size: 2, offset: 1 }}>Password</Label>
				<Col sm={7}>
					<Input onChange={this.handleChange} type="password" name="password" id="password" placeholder="password" />
				</Col>
			</FormGroup>
			<FormGroup row>
				<Label sm={{ size: 2, offset: 1 }}>Firstname</Label>
				<Col sm={7}>
					<Input onChange={this.handleChange} type="text" name="firstname" id="firstname" placeholder="Leon" />
				</Col>
			</FormGroup>
			<FormGroup row>
				<Label sm={{ size: 2, offset: 1 }}>Lastname</Label>
				<Col sm={7}>
					<Input onChange={this.handleChange} type="text" name="lastname" id="lastname" placeholder="Durand" />
				</Col>
			</FormGroup>
			<FormGroup row>
				<Label sm={{ size: 2, offset: 1 }}>Address</Label>
				<Col sm={7}>
					<Input onChange={this.handleChange} type="text" name="address" id="Address" placeholder="18 Rue des courgettes" />
				</Col>
			</FormGroup>
			<FormGroup row>
				<Label sm={{ size: 2, offset: 1 }} for="exampleSelect">Country</Label>
				<Col sm={3}>
					<Input onChange={this.handleChange} type="select" name="select" id="exampleSelect">
						{listCountries}
					</Input>
				</Col>
			</FormGroup>
			<FormGroup check row>
				<Col sm={{ size: 1, offset: 1 }}>
					<Button onClick={this.signup}>Submit</Button>
				</Col>
			</FormGroup>
		</Form>
    );
  }
}


// <FormGroup row>
// 	<Label for="exampleEmail" sm={2}>Email</Label>
// 	<Col sm={10}>
// 		<Input type="email" name="email" id="exampleEmail" placeholder="xyz@exemple.com" />
// 	</Col>
// 	<Col sm={{size: 10, offset:10}}>
// 		<Button className="submit">Submit</Button>
// 	</Col>
// </FormGroup>
