// React
import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'

//Style
import '../style/pageAccueil.css'

const PageAccueil = () => {

    return (
        <Fragment>
            <h1><Link to="/">Matcha</Link></h1>
            <div className="description">
                <div>Ca match ou pas...</div>
            </div>
            <Link to="/inscription"><button  className="btn btn-info btn-lg">Inscription</button></Link>
        </Fragment>
    )
}

export default PageAccueil