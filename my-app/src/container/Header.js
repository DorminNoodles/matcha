import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

export default Header => {
    return (
        <nav id="header" className="white-red">
            <ul>
                <li>
                    <Link to="/parameters" className="white-red"><i className="fas fa-cog fa-lg"></i></Link>
                </li>
            </ul>
            <div style={{ position: "absolute", right: "62px" }}>lisa</div>
        </nav>
    )
}