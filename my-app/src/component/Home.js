import React from 'react';
import { ProfileImg, Gallery, HomePassword, Field } from '../export'
import { BrowserRouter as Route, Link } from "react-router-dom";

const HomePage = ({ }) => {
    return (
        <div style={{ margin: "auto", width: "fit-content", flexDirection: "column", height: "fit-content" }}>
            <Route/>
            <p className="title-matcha">Matcha</p>
            <div>
                <Link className="button white-red" style={{ margin: "10px" }} to="/signup">Signup</Link>
                <Link className="button white-red" style={{ margin: "10px" }} to="/signin">Signin</Link>
            </div>
        </div>
    )
}

const HomeUser = ({ id, sendFile, deletePhoto, sendAvatar, data }) => {
    return (
        <div style={{ margin: "auto", display: "flex", width: "90%", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: "100%" }}>
                <div style={{ width: "100%" }}>
                    <ProfileImg {...data} sendFile={sendAvatar} upload={true} id={id} className="home-picture" />
                </div>
                <HomePassword />
                <Gallery {...data} sendFile={sendFile} deletePhoto={deletePhoto} />
            </div>
        </div>
    )
}

export { HomePage, HomeUser }