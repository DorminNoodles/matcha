//React
import React, {Component} from 'react'


//Nav 
import Nav from './parts/nav'

//Header

import Header from './parts/header'

//Style
import '../style/clientProfil.css'
import '../style/client.css'

class Client extends Component {

    state = {
        email     : 'nobody@student.42.fr',
        username  : 'nobody42',
        firstname : 'Ethan',
        lastname  : 'Escobar',
        address   : '42 rue de baltringue Paris',
        birthdate : '10/31/1990'
    }

    handleChange = (event) => {
        if (event.target.name in this.state) {
            this.setState({[event.target.name]: event.target.value})
        }
    }
    
    render () {
        return (
            <div className="global">
                <div className="menu_main ">
                    <Nav />
                    <div className="main-title ">
                        <Header />
                        <div className='personal '>
                            <div className='center-personal'>
                                <div className='title-personal '>
                                    <div className='position-title '>
                                        Informations personnelles
                                    </div>
                                </div>
                            </div>

                            <div className='personnal-info '>
                                <div className="center-personal ">
                                    <form className="form-personal" onSubmit={this.handleSubmit}>
                                    <div className="">
                                        <div className="input-perso marge-perso ">
                                            <div>email</div>
                                            <input 
                                                onChange={this.handleChange}
                                                value={this.state.email}
                                                id="email_personnal"
                                                name='email'
                                                type="email"
                                                className=""
                                                />
                                        </div>
                                        <div className="input-perso ">
                                            <div>username</div>
                                            <input
                                                onChange={this.handleChange}
                                                value={this.state.username}
                                                name='username'
                                                id="username-personnal"
                                                type="text" 
                                                className="" 
                                                />
                                        </div>
                                        <div className="input-perso ">
                                            <div>firstame</div>
                                            <input
                                                onChange={this.handleChange}
                                                value={this.state.firstname}
                                                name='firstname'
                                                id="firstname-personnal"
                                                type="text" 
                                                className="" 
                                                />
                                        </div>
                                        <div className="input-perso ">
                                            <div>lastname</div>
                                            <input
                                                onChange={this.handleChange}
                                                value={this.state.lastname}
                                                name='lastname'
                                                id="lastname-personnal"
                                                type="text" 
                                                className="" 
                                                />
                                        </div>
                                        <div className="input-perso ">
                                            <div>address</div>
                                            <input
                                                onChange={this.handleChange}
                                                value={this.state.address}
                                                name='address'
                                                id="adress-personnal"
                                                type="text" 
                                                className="" 
                                                />
                                        </div>
                                        <div className="input-perso ">
                                            <div>birthdate</div>
                                            <input
                                                onChange={this.handleChange}
                                                value={this.state.birthdate}
                                                name='birthdate'
                                                id="birthdate-personnal"
                                                type="text" 
                                                className="" 
                                                />
                                        </div>
                                    </div>
                                        
                                    <div className=" perso-button ">
                                        <div className=" ">
                                            <input 
                                                className="button-submit-perso" 
                                                type="submit" 
                                                value="Envoyer" 
                                                />
                                        </div>
                                        <div className=" ">
                                            <input 
                                                className="button-cancel-perso" 
                                                type="submit" 
                                                value="Annuler" 
                                                />
                                        </div>
                                    </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Client 