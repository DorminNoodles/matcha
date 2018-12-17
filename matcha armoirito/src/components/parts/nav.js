// React
import React, {Component} from 'react'

//Fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'


import { 
    faBars, 
    faUser, 
    faCompass, 
    faHeart, 
    faTrophy, 
    faCommentAlt,
    faCog,
    faEnvelope
    } from '@fortawesome/free-solid-svg-icons'

library.add(far, fab)
library.add(
    faBars, 
    faUser, 
    faCompass, 
    faHeart, 
    faTrophy, 
    faCommentAlt,
    faCog,
    faEnvelope
)

class Nav extends Component {
    render () {
        return (
            <div className="icone-fontAwesome">
                <FontAwesomeIcon className="margin-icone1" icon="bars" />
                <FontAwesomeIcon className="margin-icone" icon={['far', 'user']} />
                <FontAwesomeIcon className="margin-icone" icon={['far', 'compass']} />
                <FontAwesomeIcon className="margin-icone" icon={['far', 'heart']} />
                <FontAwesomeIcon className="margin-icone" icon="trophy" />
                <span className="margin-icone fa-layers fa-fw">
                    <FontAwesomeIcon icon={['far', 'comment-alt']} />
                    <span className="fa-layers-counter">2</span>
                </span>
            </div>
        )
    }
}

export default Nav;