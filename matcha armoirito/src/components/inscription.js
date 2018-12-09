//React
import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import Logo1 from '../image/logo1.png'


//Style
import '../style/inscription.css'

class Inscription extends Component {
    state = {
        redirect: false,
        firstname : '',
        lastname : '',
        gender : '',
        orientation : '',
        email : '',
        emailValidation : '',
        password : '',
        password_confirm : ''      
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/connexion' />
        }
    }

    handleChange = (event) => {
        if (event.target.id in this.state) {
            this.setState({[event.target.id]: event.target.value})
        }
    }    
    
    handleSubmit = (event) => {
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
                
                <div className="formulaire">
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="col-md-4 col-sm-2"></div>
                                <div className="col-md-4 col-sm-8 form-group">
                                    <input
                                        onChange={this.handleChange}
                                        placeholder="Firstname" 
                                        id="firstname" 
                                        type="text" 
                                        className="form-control" 
                                        />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4 col-sm-2"></div>
                                <div className="col-md-4 col-sm-8 form-group">
                                    <input 
                                        onChange={this.handleChange}
                                        placeholder="Lastname" 
                                        id="lastname" 
                                        type="text" 
                                        className="form-control" 
                                        />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4 col-sm-2"></div>
                                <div className="col-md-4 col-sm-8 form-group">
                                    <select 
                                        onChange={this.handleChange}
                                        id="gender" 
                                        className="form-control">
                                        <option value="masculin">Masculin</option>
                                        <option value="feminin">Féminin</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4 col-sm-2"></div>
                                <div className="col-md-4 col-sm-8 form-group ">
                                    <select 
                                        onChange={this.handleChange}
                                        id="orientation" 
                                        className="form-control">
                                        <option value="hetero">Hétéro</option>
                                        <option value="gay">Gay</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4 col-sm-2"></div>
                                <div className="col-md-4 col-sm-8 form-group ">
                                    <input
                                        onChange={this.handleChange}
                                        placeholder="Email" 
                                        id="email" 
                                        type="email" 
                                        className="form-control" 
                                        />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4 col-sm-2"></div>
                                <div className="col-md-4 col-sm-8 form-group ">
                                    <input
                                        onChange={this.handleChange}
                                        placeholder="Confirm email" 
                                        id="emailValidation" 
                                        type="email" 
                                        className="form-control" 
                                        />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4 col-sm-2"></div>                          
                                <div className="col-md-4 col-sm-8 form-group ">
                                    <input
                                        onChange={this.handleChange}
                                        placeholder="Password"
                                        id="password" 
                                        type="password" 
                                        className="form-control" 
                                        />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4 col-sm-2"></div>
                                <div className="col-md-4 col-sm-8 form-group">
                                    <input
                                        onChange={this.handleChange}
                                        placeholder="Confirm password"
                                        id="password_confirm" 
                                        type="password" 
                                        className="form-control" 
                                        />
                                </div>
                            </div>
                            <div className="boutton-form">
                                <input 
                                    className="btn btn-info btn-lg button-inscription"
                                    type="submit"
                                    value="S'inscrire"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Inscription