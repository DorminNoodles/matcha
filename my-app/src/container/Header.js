import React from 'react';
import UserProvider from '../context/UserProvider';

class Header extends React.Component {
    static contextType = UserProvider;

    render() {
        let { header, user } = this.context

        return (
            <div id="header" className={header}>
                <div style={{ position: "absolute", right: "11px" }}>
                    <p>{this.props.number}</p>
                    <span onClick={() => { this.props.icon() }}><i className="fas fa-bell fa-lg" /></span>
                </div>
                <div style={{ position: "absolute", right: "62px" }}>{user.username}</div>
            </div >
        )
    }
}

export default Header;