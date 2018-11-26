//React
import React from 'react'
import {Link} from 'react-router-dom'

//Style
import '../style/connexion.css'


const Connexion = () => {
    
    return (
        <div className="container">
            <h1><Link to="/">Matcha</Link></h1>
            <h2 className="title_form">Connexion</h2>
            <form >
                <div className="form-group">
                    <label htmlFor="mail_conection">Mail :</label>
                    <input  id="mail_conection" type="email" className="form-control" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password_connection">Mot de passe :</label>
                    <input id="password_connection" type="password" className="form-control" required />
                </div>
                <div>
                    <div className="information_user">
                        <Link to="/">Mot de passe oublié</Link><br />
                        <Link to="/inscription">Pas encore inscrit ?</Link>
                    </div>
                </div>
                <div className="boutton-form">
                    <input className="btn btn-info btn-lg" type="submit" value="Connecter" required />
                </div>
            </form>
        </div>
    );
}

export default Connexion