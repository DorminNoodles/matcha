import React from 'react';
import { ProfileImg, Gallery, HomePassword, Field } from '../export'
import { BrowserRouter as Link } from "react-router-dom";

const HomePage = ({ }) => {
    return (
        <div style={{ margin: "auto", width: "fit-content", flexDirection: "column", height: "fit-content" }}>
            <p className="title-matcha">Matcha</p>
            <div>
                <Link className="button white-red" style={{ margin: "10px" }} to="/signup">Signup</Link>
                <Link className="button white-red" style={{ margin: "10px" }} to="/signin">Signin</Link>
            </div>
        </div>
    )
}

const HomeUser = ({ photos, sendFile, deletePhoto, sendAvatar }) => {
    return (
        <div style={{ margin: "auto", display: "flex", width: "90%", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: "100%" }}>
                <div style={{ width: "100%" }}>
                    <ProfileImg {...this.state} sendFile={sendAvatar} upload={true} id={this.context.user.id} className="home-picture" />
                </div>
                <HomePassword />
                <Gallery  {...this.state} sendFile={sendFile} deletePhoto={this.deletePhoto.bind(this)} />
            </div>
        </div>
    )
}

export { HomePage, HomeUser }