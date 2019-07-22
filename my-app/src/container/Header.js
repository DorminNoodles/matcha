import React from 'react';
import { BrowserRouter as Route, Link } from "react-router-dom";
import UserProvider from '../context/UserProvider';

class Header extends React.Component {
    static contextType = UserProvider;

    render() {
        let { header, user } = this.context

        return (
            <nav id="header" className={header}>
                <Route />
                <ul>
                    <li>
                        <Link to="/parameters" className={header}><i className="fas fa-cog fa-lg"></i></Link>
                    </li>
                </ul>
                <div style={{ position: "absolute", right: "62px" }}>{user.username}</div>
            </nav>
        )
    }
}

export default Header;