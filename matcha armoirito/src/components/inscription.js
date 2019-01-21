//React
import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import Logo1 from '../image/logo1.png'


//Style
import '../style/inscription.css'

class Inscription extends Component {
    state = {
        redirect: false,
        firstname : null,
        lastname : null,
        gender : null,
        orientation : null,
        email : null,
        password : null,
        password_confirm : null      
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
            <div className="inscription">
                <div className="logo-center">
                    <Link to="/"> <img className="logo1" src={Logo1} alt="logo"/> </Link>
                </div>

                {/* Redirection vers connexion*/}
                {this.renderRedirect()}
                
                    <div className='center-form'>
                        <form className='position-form' onSubmit={this.handleSubmit}>
                                    <input
                                        onChange={this.handleChange}
                                        placeholder="firstname" 
                                        id="firstname" 
                                        type="text" 
                                        className="form-ins" 
                                        />
                                    <input 
                                        onChange={this.handleChange}
                                        placeholder="lastname" 
                                        id="lastname" 
                                        type="text" 
                                        className="form-ins" 
                                        />
                                    <select 
                                        onChange={this.handleChange}
                                        id="gender" 
                                        className="form-ins">
                                        <option value="masculin">masculin</option>
                                        <option value="feminin">féminin</option>
                                    </select>
                                    <select 
                                        onChange={this.handleChange}
                                        id="orientation" 
                                        className="form-ins">
                                        <option value="hetero">hétéro</option>
                                        <option value="gay">gay</option>
                                    </select>
                                    <input
                                        onChange={this.handleChange}
                                        placeholder="email" 
                                        id="email" 
                                        type="email" 
                                        className="form-ins" 
                                        />
                                    <input
                                        onChange={this.handleChange}
                                        placeholder="password"
                                        id="password" 
                                        type="password" 
                                        className="form-ins" 
                                        />
                                    <input
                                        onChange={this.handleChange}
                                        placeholder="confirm password"
                                        id="password_confirm" 
                                        type="password" 
                                        className="form-ins" 
                                        />
                                    <div className='center-button'>
                                        <input 
                                            className="button-ins"
                                            type="submit"
                                            value="S'inscrire"
                                            />
                                    </div>
                                <div>
                                <div className="information_user">
                                    <Link to="/connexion">Déja client ?</Link><br />
                                </div>
                            </div>
                        </form>
                    </div>
            </div>
        )
    }
}

export default Inscription