import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import UserProvider from '../context/UserProvider';

import { withRouter } from "react-router";

class HeaderSide extends React.Component {
    static contextType = UserProvider;

    logout = () => {
        this.context.logout();
        this.props.history.push('/home');
    }
    render() {

        let className = "white-red"
        return (
            <nav id="side" className={className}>
                <ul>
                    <li>
                        <Link to="/" className={className}><i className="fas fa-home fa-lg header-link"></i></Link>
                    </li>

                    {
                        this.context.token && this.context.token !== "" ?
                            <React.Fragment>

                                <li>
                                    <Link to="/user/" className={className} ><i className="fas fa-user fa-lg header-link"></i></Link>
                                </li>
                                <li>
                                    <Link to="/match/" className={className} ><i className="fas fa-heart fa-lg header-link"></i></Link>
                                </li>
                                <li>
                                    <Link to="/chat/" className={className}><i className="fas fa-comments fa-lg header-link"></i></Link>
                                </li>
                                <li>
                                    <a onClick={this.logout} ><i className="fas fa-sign-out-alt fa-lg header-link"></i></a>
                                </li>
                            </React.Fragment>
                            :

                            <li>
                                <Link to="/signin/" className={className}><i className="fas fa-sign-in-alt fa-lg header-link"></i></Link>
                            </li>
                    }

                    <li>
                        <Link to="/signup/" className={className}><i className="fas fa-user-plus"></i></Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default withRouter(HeaderSide)