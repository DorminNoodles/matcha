//React
import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import Logo1 from '../image/logo1.png'

//Style
import '../style/recuperationMotdepasse.css'


class Connexion extends Component {
    
    state = {
        redirect: false,
        mail_recup : ''
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/' />
        }
    }

    handleChange = (event) => {
        if (event.target.id in this.state) {
            this.setState({[event.target.id]: event.target.value})
        }
        console.log(event.target.id)
        console.log(this.state)
        console.log(this.state.email)
        
        
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
                                        id="mail_recup"
                                        type="email"
                                        className="form-control"
                                        required />
                                </div>
                            </div>
                            <div className="boutton-form">
                                <input 
                                    className="btn btn-info btn-lg button-recup" 
                                    type="submit" 
                                    value="Récupére ton mot de passe" 
                                    required />
                            </div>
                        </form>
                </div>
            </div>
        );
    }
}

export default Connexion