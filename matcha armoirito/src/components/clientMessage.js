//React
import React, {Component, createRef} from 'react'

//Image

import Sha from '../image/sha.jpg'


//Nav 
import Nav from './parts/nav'

//Header

import Header from './parts/header'

//Style
import '../style/clientMessage.css'
import '../style/client.css'

class Message extends Component {

    state = {
        messagecurrent : '',
        message : {},
        pseudo: 'micka',
        lenght : 140,
        messageRest : 140,

        
    }

    componentDidUpdate() {
        const scrollDom = this.autoScroll.current
        console.log(scrollDom)
        console.log(scrollDom.scrollTop)
        scrollDom.scrollTop = scrollDom.scrollHeight
    }

    autoScroll = createRef()

   
    creacteMessage = () => {
        const message = {
            pseudo : this.state.pseudo,
            message : this.state.messagecurrent
        }
        return message

    }

    addMessage = () => {
        const message = {...this.state.message}
        message[`message-${Date.now()}`] = this.creacteMessage()
        this.setState({message : message})
        this.setState({messagecurrent : '', messageRest : 140})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.addMessage()
        
    }

    handleChange = (event) => {
        const messagecurrent = event.target.value
        let messageRest = this.state.lenght - messagecurrent.length
        this.setState({messagecurrent : messagecurrent, messageRest : messageRest})
        console.log(messagecurrent)

        
        }

    keyUpp = (event) => {
        if (event.key === 'Enter'  ){
            console.log(event.key);
            console.log(this.state.messagecurrent.length);
            console.log(this.state.messagecurrent.value);
            this.addMessage()
        }        
    }
    
    render () {
    const message = Object
                    .keys(this.state.message)
                    .map( key => (
                        <div key={key} >
                            <div className='message-actif testb'>
                                <div className='picture-cli ' style={{ backgroundImage: `url(${Sha})`}}></div>
                                <div className='message-cli testb'>{this.state.message[key].message}</div>
                            </div>
                        </div>
                    ))

                    

        return (
            <div className="global">
                <div className="menu_main ">
                    <Nav />
                    <div className="main-title ">
                        <Header />
                        <div className='personal testb '>
                            <div className='center-personal'>
                                <div className='title-message '>
                                    <div className='position-title '>
                                        Messages
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='testb message-global'>
                        
                            <div className='message-client testb'>
                                <div className='message'>
                                    <div className='message-top testb' ref={this.autoScroll}>
                                        {message}
                                    </div>
                                    <form onSubmit={this.handleSubmit} className='message-button'>
                                        <textarea 
                                            maxLength='140'
                                            value={this.state.messagecurrent}
                                            onChange={this.handleChange}
                                            onKeyUp={this.keyUpp}
                                        >
                                        </textarea>
                                        <div  className='button-message-center testb'>
                                            <div  >{this.state.messageRest}</div>
                                            <input className='button-message-send'
                                                type='submit'
                                                value='Envoyer'/>
                                        </div>
                                    </form>
                                </div>
                                <div className='mes-client'>
                                pp
                                </div>
                            </div>
                            
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default Message