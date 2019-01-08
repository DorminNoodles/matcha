//React
import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import Logo1 from '../image/logo1.png'

//Style
import '../style/connexion.css'



class RecupereMotdepasse extends Component {
    
    state = {
        redirect: false,
        mail_connection : null,
        password_connection : null,
        username: "mi"
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/recup_motdepasse' />
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


                <div className='center-form'>
                        <form className='position-form' onSubmit={this.handleSubmit}>
                            <input 
                                onChange={this.handleChange}
                                placeholder="Email"
                                id="mail_connection"
                                type="email"
                                className="form-ins"
                                />
                            <div className='center-button'>
                                <input 
                                    className="button-ins"
                                    type="submit"
                                    value="Change ton mot de passe"
                                />
                            </div>
                            <div className="information_user">
                                <Link to="/connexion">Connexion ?</Link><br />
                                
                            </div>
                        </form>
                    </div>
            </div>
        );
    }
}

export default RecupereMotdepasse