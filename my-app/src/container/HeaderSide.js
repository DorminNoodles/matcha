import React from 'react';
import { BrowserRouter as Route, Link } from "react-router-dom";
import UserProvider from '../context/UserProvider';
import { withRouter } from "react-router";

class HeaderSide extends React.Component {
    static contextType = UserProvider;

    logout = () => {
        this.context.logout();
        this.props.history.push('/');
    }

    render() {
        let { header, user } = this.context

        return (
            <nav id="side" className={header}>
                <Route />

                <ul style={{ display: "contents" }}>
                    <li>
                        <Link to="/" className={header}><i className="fas fa-home header-link"></i></Link>
                    </li>

                    {
                        user.token && user.token !== "" ?
                            <React.Fragment>

                                <li>
                                    <Link to="/user" className={header} ><i className="fas fa-user header-link"></i></Link>
                                </li>
                                <li>
                                    <Link to="/match" className={header} ><i className="fas fa-heart header-link"></i></Link>
                                </li>
                                <li>
                                    <Link to="/messages" className={header}><i className="fas fa-comments header-link"></i></Link>
                                </li>
                                <li>
                                    <button className={header} style={{ border: "none" }} onClick={this.logout}>
                                        <a className={header}><i className="fas fa-sign-out-alt header-link" /></a>
                                    </button>
                                </li>
                                <Link to="/parameters" className={header}><i className="fas fa-cog header-link"></i></Link>

                            </React.Fragment>
                            :

                            <li>
                                <Link to="/signin" className={this.context.header}><i className="fas fa-sign-in-alt header-link"></i></Link>
                            </li>
                    }

                    <li>
                        <Link to="/signup" className={this.context.header}><i className="fas fa-user-plus"></i></Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default withRouter(HeaderSide)