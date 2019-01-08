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
            <div className="global">
                <div className="menu_main testb">
                    <Nav />
                    <div className="main-title testb">
                        <Header />
                        <Main />
                    </div>
                </div>
            </div>
        )
    }
}

export default Client  

