import React from 'react';
import { ProfileImg, Gallery, HomePassword } from '../export'
import { BrowserRouter as Route, Link } from "react-router-dom";

const HomePage = ({ params }) => {
    return (
        <div style={{ margin: "auto", width: "fit-content", flexDirection: "column", height: "fit-content", textAlign: "center" }}>
            <Route />
            <p className="title-matcha">Matcha</p>
            <div>
                <Link className="button white-red" style={{ margin: "10px" }} to="/signup">Signup</Link>
                <Link className="button white-red" style={{ margin: "10px" }} to="/signin">Signin</Link>
            </div>
            <br />
            {
                params.key === "signup" &&
                <p className="success">
                    <span>You have successfully create an account</span>
                    <br />
                    <span>A confirmation email has been sent to you</span>
                </p>
            }
        </div>
    )
}

const HomeUser = ({ id, sendFile, deletePhoto, sendAvatar, data, avatar }) => {
    return (
        <div style={{ margin: "auto", display: "flex", width: "90%", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: "100%" }}>
                <div style={{ width: "100%" }}>
                    <ProfileImg {...data} sendFile={sendAvatar} upload id={id} className="home-picture" avatar={avatar} />
                </div>
                <HomePassword />
                <Gallery {...data} sendFile={sendFile} deletePhoto={deletePhoto} />
            </div>
        </div>
    )
}

export { HomePage, HomeUser }