import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import TopMenu from './navbar';
import Signup from './signup';
import Signin from './signin';
import MyProfile from './myProfile';
import MyCard from './card';


// import { Link } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

class Firstname extends React.Component {
	render()
	{
		return (
			<label>
				Lastname:
				<input type="text" name="Firstname" />
			</label>
		);
	}
}

class Lastname extends React.Component {
	render()
	{
		return (
			<label>
				Lastname:
				<input type="text" name="lastname" />
			</label>
		);
	}
}

class Mail extends React.Component {
	render()
	{
		return (
			<label>
				Mail:
				<input type="text" name="mail" />
				</label>
		);
	}
}

class Password extends React.Component {
	render()
	{
		return (
			<label>
				Password:
				<input type="text" name="password" />
				</label>
		);
	}
}

class Username extends React.Component {
	render()
	{
		return (
			<label>
				Username:
				<input type="text" name="username" />
			</label>
		);
	}
}

class Menu extends React.Component {
	// render()
	// {
	// 	<div class="">
	// 	<div>
	// }
}

class Hello extends React.Component {
	render()
	{
		return (
			<div>
				Hello
			</div>
		)
	}
}

class Game extends React.Component {
	render()
	{
		return (
			<div>
				Game
			</div>
		)
	}
}

class Main extends React.Component {
	render()
	{
		return (
			<main>
				<Switch>
					<Route exact path='/' component={Hello}/>
					<Route exact path='/game' component={Game}/>
					<Route exact path='/signup' component={Signup}/>
					<Route exact path='/signin' component={Signin}/>
					<Route exact path='/myprofile' component={MyProfile}/>
				</Switch>
			</main>
		)
	}
}

class Header extends React.Component {
	render()
	{
		return (
			<TopMenu />
		)
	}
}


class App extends React.Component {



	render()
	{
		// let data = {bordel: "hello"}
        //
        //
		// sessionStorage.setItem('myData', JSON.stringify(data))
        //
		// let data2 = JSON.parse(sessionStorage.getItem('myData'))
        //
		// console.log(data2.bordel);

		return (
			<div>
				<Header />
				<Main />
				<MyCard />
			</div>
		);
	}
}



class MonFormulaire extends React.Component{

	render(){
		return (
			<div>
			</div>
		);
	}

}

ReactDOM.render((
	<BrowserRouter>
		<App />
	</BrowserRouter>
), document.getElementById('root')
);
