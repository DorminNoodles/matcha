//React
import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import Logo1 from '../image/logo1.png'

//Style
import '../style/connexion.css'



class Connexion extends Component {
    
    state = {
        redirect: false,
        mail_connection : null,
        password_connection : null
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/client' />
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

                <div className="formulaire-connexion">
                        <form onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="col-md-4 col-sm-2"></div>
                                <div className="col-md-4 col-sm-8 form-group">
                                    <input 
                                        onChange={this.handleChange}
                                        placeholder="Email"
                                        id="mail_connection"
                                        type="email"
                                        className="form-control"
                                        />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4 col-sm-2"></div>
                                <div className="col-md-4 col-sm-8 form-group">
                                    <input
                                        onChange={this.handleChange}
                                        placeholder="Password"
                                        id="password_connection"
                                        type="password" 
                                        className="form-control" 
                                        />
                                </div>
                            </div>
                            <div>
                                <div className="information_user">
                                    <Link to="/recup_motdepasse">Mot de passe oublié</Link><br />
                                    <Link to="/inscription">Pas encore inscrit ?</Link>
                                </div>
                            </div>
                            <div className="boutton-form">
                                <input 
                                    className="btn btn-info btn-lg button-inscription" 
                                    type="submit" 
                                    value="Connexion" 
                                    required />
                            </div>
                        </form>
                </div>
            </div>
        );
    }
}

export default Connexion