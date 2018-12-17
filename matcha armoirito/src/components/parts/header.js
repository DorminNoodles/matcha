// React
import React, {Component} from 'react'

//Image
import Femme1 from '../../image/f1.png'
import Femme2 from '../../image/f2.jpg'
import Femme3 from '../../image/f3.jpg'

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

class Header extends Component {
    render () {
        return (
            <div className="mess-title">
                <div className='mess-title1'>
                    <div className="mess-title-picture">
                        <div className='mess'>
                            Katie Foster<br />
                            <span className="mess-client">"Ok, i love this ..."</span>
                        </div>
                        <div className='title-picture '>
                            <div className="dot-green"></div>
                            <img src={Femme1} alt='f1' className="picture-client picture-client3" />
                            <img src={Femme2} alt='f2' className="picture-client picture-client2" />
                            <img src={Femme3} alt='f3' className="picture-client picture-client1" />
                        </div>
                    </div>
                    <div className=' coq-icon'>
                        <FontAwesomeIcon className="cog-icone" icon="cog" spin />
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;