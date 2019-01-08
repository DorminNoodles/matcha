//React
import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import Logo1 from '../image/logo1.png'
import axios from 'axios'

//Style
import '../style/connexion.css'



class Connexion extends Component {
    
    state = {
        redirect: false,
        mail_connection : null,
        password_connection : null,
        username: "mi"
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect push to='/client' />
        }
    }

    handleChange = (event) => {
        if (event.target.id in this.state) {
            this.setState({[event.target.id]: event.target.value})
        }
    }    
    
    handleSubmit = (event) => {
            axios.post('http://localhost:3000/api/user/register', this.state)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        this.setState({redirect: true})
    }

    render () {
        return (
            <div className="container">
                <div className="logo-center">
                        <Link to="/"> <img className="logo1" src={Logo1} alt="logo"/> </Link>
                </div>

                {/* Redirection vers connexion*/}
                {this.renderRedirect()}


                <div className='center-form'>
                        <form className='position-form' onSubmit={this.handleSubmit}>
                            <input 
                                onChange={this.handleChange}
                                placeholder="Email"
                                id="mail_connection"
                                type="email"
                                className="form-ins"
                                />
                            <input
                                onChange={this.handleChange}
                                placeholder="Password"
                                id="password_connection"
                                type="password" 
                                className="form-ins" 
                                />
                            <div className='center-button'>
                                <input 
                                    className="button-ins"
                                    type="submit"
                                    value="Connexion"
                                />
                            </div>
                            <div className="information_user">
                                <Link to="/recup_motdepasse">Mot de passe oublié</Link><br />
                                <Link to="/inscription">Pas encore inscrit ?</Link>
                            </div>
                        </form>
                    </div>
            </div>
        );
    }
}

export default Connexion