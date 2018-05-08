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
			email: '',
			firstname: '',
			lastname: '',
			address: ''
		}
	}


	handleChange = (event) => {
		let newState = {}

		newState[event.target.name] = event.target.value;

		this.setState(newState);
	}

	signup = () => {

		fetch('http://localhost:3000/api/user', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(this.state)
		})
	}

	render() {
		return (
			<Form>
				<FormGroup>
					<Label for="username">Username</Label>
					<Input type="text" value={this.state.username} onChange={this.handleChange} name="username" id="username" placeholder="lover69" />
				</FormGroup>
				<FormGroup>
					<Label for="password">Password</Label>
					<Input type="password" value={this.state.password} onChange={this.handleChange} name="password" id="password" placeholder="qwerty" />
				</FormGroup>
				<FormGroup>
					<Label for="email">Email</Label>
					<Input type="email" name="email" value={this.state.email} onChange={this.handleChange} id="email" placeholder="abc@xyz.com" />
				</FormGroup>
				<FormGroup>
					<Label for="firstname">Firstname</Label>
					<Input type="firstname" name="firstname" value={this.state.firstname} onChange={this.handleChange} id="firstname" placeholder="Maurice" />
				</FormGroup>
				<FormGroup>
					<Label for="lastname">Lastname</Label>
					<Input type="lastname" name="lastname" value={this.state.lastname} onChange={this.handleChange} id="lastname" placeholder="Durand" />
				</FormGroup>
				<FormGroup>
					<Label for="address">Address</Label>
					<Input type="address" name="address" value={this.state.address} onChange={this.handleChange} id="address" placeholder="abc@xyz.com" />
				</FormGroup>
				<FormGroup check row>
					<Button onClick={this.signup}>Submit</Button>
				</FormGroup>
			</Form>
		);
	}
}



// export default class Signup extends React.Component {
// 	constructor(props) {
// 		super(props)
// 		this.state = {
// 		   username: '',
// 		   password: '',
// 		   firstname: '',
// 		   lastname: '',
// 		   email: '',
// 		   address: ''
// 	   	}
// 		this.signup = this.signup.bind(this)
// 	}
//
// 	signup(event) {
// 		event.preventDefault()
//
// 		axios.post('/user', {
// 			username: this.state.username,
// 			password: this.state.password,
// 			firstname: this.state.firstname,
// 			lastname: this.state.lastname,
// 			email: this.state.email,
// 			address: this.state.address
// 		})
// 		.then(function (response) {
// 			console.log('reponse:', response);
// 		})
// 		.catch(function (error) {
// 			console.log('ah merde alors ');
// 		});
// 	}
//
// 	handleChange = (event) => {
// 	  let newState = {}
//
// 	  newState[event.target.name] = event.target.value
//
// 	  this.setState(newState, (confirmed) => {
// 		  console.log('state has been updated', this.state)
// 	  })
//  	}
//
//   render() {
//
// 	  let listCountries = countries().getData().map((country) => {
// 		  return <option key={country.code}>{country.name}</option>
// 	  });
//
//     return (
//
// 		<Form>
// 			<FormGroup row>
// 				<Label sm={{ size: 2, offset: 1 }}>Username</Label>
// 				<Col sm={7}>
// 					<Input onChange={this.handleChange} type="text" name="username" id="Username" placeholder="Buzz" />
// 				</Col>
// 			</FormGroup>
// 			<FormGroup row>
// 				<Label sm={{ size: 2, offset: 1 }}>Email</Label>
// 				<Col sm={7}>
// 					<Input onChange={this.handleChange} type="email" name="email" id="exampleEmail" placeholder="xyz@exemple.com" />
// 				</Col>
// 			</FormGroup>
// 			<FormGroup row>
// 				<Label sm={{ size: 2, offset: 1 }}>Password</Label>
// 				<Col sm={7}>
// 					<Input onChange={this.handleChange} type="password" name="password" id="password" placeholder="password" />
// 				</Col>
// 			</FormGroup>
// 			<FormGroup row>
// 				<Label sm={{ size: 2, offset: 1 }}>Firstname</Label>
// 				<Col sm={7}>
// 					<Input onChange={this.handleChange} type="text" name="firstname" id="firstname" placeholder="Leon" />
// 				</Col>
// 			</FormGroup>
// 			<FormGroup row>
// 				<Label sm={{ size: 2, offset: 1 }}>Lastname</Label>
// 				<Col sm={7}>
// 					<Input onChange={this.handleChange} type="text" name="lastname" id="lastname" placeholder="Durand" />
// 				</Col>
// 			</FormGroup>
// 			<FormGroup row>
// 				<Label sm={{ size: 2, offset: 1 }}>Address</Label>
// 				<Col sm={7}>
// 					<Input onChange={this.handleChange} type="text" name="address" id="Address" placeholder="18 Rue des courgettes" />
// 				</Col>
// 			</FormGroup>
// 			<FormGroup row>
// 				<Label sm={{ size: 2, offset: 1 }} for="exampleSelect">Country</Label>
// 				<Col sm={3}>
// 					<Input onChange={this.handleChange} type="select" name="select" id="exampleSelect">
// 						{listCountries}
// 					</Input>
// 				</Col>
// 			</FormGroup>
// 			<FormGroup check row>
// 				<Col sm={{ size: 1, offset: 1 }}>
// 					<Button onClick={this.signup}>Submit</Button>
// 				</Col>
// 			</FormGroup>
// 		</Form>
//     );
//   }
// }


// <FormGroup row>
// 	<Label for="exampleEmail" sm={2}>Email</Label>
// 	<Col sm={10}>
// 		<Input type="email" name="email" id="exampleEmail" placeholder="xyz@exemple.com" />
// 	</Col>
// 	<Col sm={{size: 10, offset:10}}>
// 		<Button className="submit">Submit</Button>
// 	</Col>
// </FormGroup>
