import React from 'react';
import UserProvider from '../context/UserProvider';

class Header extends React.Component {
    static contextType = UserProvider;

    render() {
        let { header, user } = this.context

        return (
            <div id="header" className={header}>
                <span style={{ position: "absolute", right: "11px" }} onClick={() => { this.props.icon() }}><i className="fas fa-bell fa-lg" /></span>
                <div style={{ position: "absolute", right: "62px" }}>{user.username}</div>
            </div >
        )
    }
}

export default Header;