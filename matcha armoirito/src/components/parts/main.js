// React
import React, {Component, Fragment} from 'react'

//Image
import Femme1 from '../../image/f1.png'

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

class Main extends Component {
    state = {
        white : true,
        hov : true
    }

    changeColor = () => {
        this.setState({white : !this.state.white})
        console.log('allo')
    }

    render () {
        let btn = this.state.white ? 'heart-icon-pic-white' : 'heart-icon-pic-pink';

        return (
            <Fragment>
                <div className=' position-peoples'>
                    <div className='1 title-peoples'>
                        <div className=''>
                            People
                        </div>
                    </div>
                </div>

                <div className=' position-prefer'>
                    <div>Cougar</div>
                    <div>Musique</div>
                    <div>Alcool</div>
                    <div>Cheveux</div>
                    <div>Sida</div>
                    <div>Vegan</div>
                </div>

                <div className=' position-picture-big'>
                    <div className='picture-big' style={{ backgroundImage: `url(${Femme1})`}} >
                        <div className=' heart-icon-picture'>
                            <div>
                                <FontAwesomeIcon onClick={this.changeColor} className={btn} icon='heart' />
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
                            <div>
                                <FontAwesomeIcon onClick={this.changeColor} className={btn} icon='heart' />
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
                            <div>
                                <FontAwesomeIcon onClick={this.changeColor} className={btn} icon='heart' />
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
                            <div>
                                <FontAwesomeIcon onClick={this.changeColor} className={btn} icon='heart' />
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
            </Fragment>
        )
    }
}

export default Main;