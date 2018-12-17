//React
import React, {Component} from 'react'

//Nav
import Nav from './parts/nav'

//Header
import Header from './parts/header'

//Main
import Main from './parts/main'

//Style
import '../style/client.css'

class Client extends Component {
    render () {
        return (
            <div className="container-fluid">
                <div className="row color">
                    <div className="col-1  fa-nav">
                        <Nav />
                    </div>

                    <div className="col-11 col-11-modif 1">
                        <Header />
                        <Main />
                    </div>
                </div>
            </div>
        )
    }
}

export default Client  

