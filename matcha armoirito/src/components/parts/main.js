// React
import React, {Component, createRef} from 'react'

//Image
import Femme1 from '../../image/f1.png'

//Fontawesome
import { library , dom} from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import '../../style/fontawesome-free-5.6.1-web/css/all.css'



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

class Main extends Component {

    constructor(props) {
        super(props);
        this.inputField = createRef();
        this.inputField1 = createRef();

      }
    state = {
        white : true,
        hov : true
    }

    message = createRef()

    changeColor = (event) => {
        
        console.log(event)
        console.log(event.target.style)
        console.log(event.target.style.color)





    }

    render () {
    dom.watch();
        

        return (
            <div className='main-client'>
                            <div className='center-title testb'>
                                <div className='position-peoples'>
                                    <div className='title-peoples'>
                                        <div className=''>
                                            People
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='position-prefer testb'>
                                <div className='position-marge'>Cougar</div>
                                <div>Musique</div>
                                <div>Alcool</div>
                                <div>Cheveux</div>
                                <div>Sida</div>
                                <div>Vegan</div>
                            </div>


                            <div className=' position-picture-big'>

                            
                                
                                

                                <div className='picture-big' style={{ backgroundImage: `url(${Femme1})`}} >
                                    <div className=' heart-icon-picture'>
                                        <div  onClick={(e) => this.changeColor(e)}  style={{color : 'white'}} className='testb heart-icon-pic-white'>
                                            <i   className="fas fa-heart"></i>
                                        </div>
                                    </div>
                                    <div className='legend-icon-picture'>
                                        <div className='name-client'>
                                            <div>GaL Gadot</div>
                                            <div className="dot-green-picture"></div>
                                        </div>
                                        <div className="legend-client">
                                            <div className="position-legend">
                                                <FontAwesomeIcon className='icon-envelope' icon={['far', 'envelope']} />
                                                <FontAwesomeIcon className="icon-user" icon='user' />
                                                <FontAwesomeIcon className="icon-trophy" icon="trophy" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='picture-big' style={{ backgroundImage: `url(${Femme1})`}} >
                                    <div className=' heart-icon-picture'>
                                        <div  onClick={(e) => this.changeColor(e)}  className='testb heart-icon-pic-white'>
                                            <i  style={{color : 'blue'}} className="fas fa-heart"></i>
                                        </div>
                                    </div>
                                    <div className='legend-icon-picture'>
                                        <div className='name-client'>
                                            <div>GaL Gadot</div>
                                            <div className="dot-green-picture"></div>
                                        </div>
                                        <div className="legend-client">
                                            <div className="position-legend">
                                                <FontAwesomeIcon className='icon-envelope' icon={['far', 'envelope']} />
                                                <FontAwesomeIcon className="icon-user" icon='user' />
                                                <FontAwesomeIcon className="icon-trophy" icon="trophy" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                

                                
                                

                                

                                

                                
                            </div>
                        </div>
        )
    }
}

export default Main;