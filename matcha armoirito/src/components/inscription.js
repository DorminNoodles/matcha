//React
import React, {Component, Fragment} from 'react'
import {Link, Redirect} from 'react-router-dom'

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
            <div className="container-fluid">
                <div className="title-center">
                    <h1 className="title-inscription"><Link to="/">Matcha</Link></h1>
                </div>
                {/* Redirection vers connexion*/}
                {this.renderRedirect()}
                

                <div className="formulaire">
                <div>
                    <h2 className="title_form">Inscription</h2>
                    <form onSubmit={this.handleSubmit}>
                        
                            <div className="form-group ">
                                <input
                                    value={this.state.firstname}
                                    onChange={this.handleChange}
                                    placeholder="Firstname" 
                                    id="firstname" 
                                    type="text" 
                                    className="form-control" 
                                    />
                            </div>
                            <div className="form-group">
                                <input 
                                    value={this.state.lastname}
                                    onChange={this.handleChange}
                                    placeholder="Lastname" 
                                    id="lastname" 
                                    type="text" 
                                    className="form-control" 
                                    />
                            </div>
                        
                        
                            <div className="form-group">
                                <select 
                                    value={this.state.gender}
                                    onChange={this.handleChange}
                                    id="gender" 
                                    className="form-control">
                                    <option value="masculin">Masculin</option>
                                    <option value="feminin">Féminin</option>
                                </select>
                            </div>
                            <div className="form-group ">
                                <select 
                                    value={this.state.orientation}
                                    onChange={this.handleChange}
                                    id="orientation" 
                                    className="form-control">
                                    <option value="masculin">Hétéro</option>
                                    <option value="feminin">Gay</option>
                                </select>
                            </div>
                        
                        
                            <div className="form-group ">
                                <input
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    placeholder="Email" 
                                    id="email" 
                                    type="email" 
                                    className="form-control" 
                                    />
                            </div>
                            <div className="form-group ">
                                <input
                                    value={this.state.emailValidation}
                                    onChange={this.handleChange}
                                    placeholder="Confirm email" 
                                    id="emailValidation" 
                                    type="email" 
                                    className="form-control" 
                                    />
                            </div>
                        
                        
                            <div className="form-group ">
                                <input
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    placeholder="Password"
                                    id="password" 
                                    type="password" 
                                    className="form-control" 
                                    />
                            </div>
                            <div className="form-group ">
                                <input
                                    value={this.state.password_confirm}
                                    onChange={this.handleChange}
                                    placeholder="Confirm password"
                                    id="password_confirm" 
                                    type="password" 
                                    className="form-control" 
                                    />
                            </div>
                        
                        <div className="boutton-form ">
                            <input className="btn btn-info btn-lg button-inscription" type="submit" value="S'inscrire"/>
                        </div>
                    </form>
                </div>
                </div>
            </div>
        )
    }
}

export default Inscription