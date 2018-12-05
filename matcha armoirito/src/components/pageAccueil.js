// React
import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'

//Style
import '../style/pageAccueil.css'

const PageAccueil = () => {

    return (
        <Fragment>
            <div className="description">
                <h1 className="title">Matcha</h1>
                <Link to="/inscription"><p><button  className="btn btn-info btn-lg btn-pageaccueil">Inscription</button></p></Link>
            </div>
        </Fragment>
    )
}

export default PageAccueil