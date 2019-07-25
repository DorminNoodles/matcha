import React from 'react';
import { Field } from "../export"
import profile from "../image/profile.png"
import { SliderAge, SliderLocation, Gender, SexualOrientation, SliderAgeRange } from '../export'

function ProfileImg({ image, sendFile }) {
    return (

        <div className="center" style={{ flexWrap: "wrap", flexDirection: "column" }}>
            <figure className="image is-128x128">
                <img className="is-rounded"
                    style={{ width: "128px", height: "128px" }}
                    src={image.value !== "" ? image.value : profile} alt="profil" />
            </figure>
            <p className="error">{image.error}</p>
            <p style={{
                fontFamily: "LadylikeBB",
                fontSize: "xx-large",
                textAlign: "center"
            }}>Matcha</p>

            <form encType="multipart/form-data">
                <input className="inputfile"
                    onChange={sendFile}
                    name="avatar"
                    placeholder="Choose avatar"
                    type="file"
                />
            </form>
        </div>

    )
}

function FirstPage({ info, onChange, changePage }) {
    let { firstname, lastname, username, email, password, confirmation } = info
    return (

        <React.Fragment>
            <Field placeholder="Firstname" position="left" action={{ onChange: onChange }} error={firstname.error} value={firstname.value} />
            <Field placeholder="Lastname" position="left" action={{ onChange: onChange }} error={lastname.error} value={lastname.value} />
            <br></br>
            <Field placeholder="Username" position="left" icon="fas fa-user" action={{ onChange: onChange }}error={username.error} value={username.value} />
            <Field placeholder="Email" position="left" icon="fas fa-envelope" action={{ onChange: onChange }} error={email.error} value={email.value} />
            <Field placeholder="Password" type="password" position="left" icon="fas fa-lock" action={{ onChange: onChange }} error={password.error} value={password.value} />
            <Field placeholder="Confirmation" type="password" position="left" icon="fas fa-lock" action={{ onChange: onChange }} error={confirmation.error} value={confirmation.value} />
            <button className="button" onClick={() => changePage(2)}>Continue</button>
        </React.Fragment>

    )
}

function SecondPage({ info, onChange, changePage }) {
    return (

        <div className="">
            <Gender onChange={onChange} gender={info.gender.value} />
            <p className="error-text">{info.gender.error}</p>

            <SexualOrientation onChange={onChange} orientation={info.orientation.value} />
            <br />
            <SliderAgeRange onChange={onChange} age={info.desired.value} />
            <SliderLocation onChange={onChange} distance={info.distance.value} />
            <br />
            <button className="button center" onClick={() => changePage(3)}>Continue</button>
            <span className="pointer center" style={{ marginTop: "10px" }} onClick={() => { changePage(1) }}>
                <i className="fas fa-arrow-circle-left fa-lg"></i>
            </span>
        </div>

    )
}

function ThirdPage({ info, onChange, changePage, error, button }) {
    return (

        <div className="">

            <div className="control">
                <textarea className="textarea has-fixed-size" placeholder="bio" onChange={(e) => { onChange({ "bio": e.target.value }) }} value={info.bio.value}></textarea>
            </div>
            <p className="error-text">{info.bio.error}</p>

            <br />
            <SliderAge onChange={onChange} age={info.age.value} />
            <br />

            <button className="button center" onClick={button.function}>{button.text}</button>
            <p className="error-text center">{error}</p>

            <span className="pointer center" style={{ marginTop: "10px" }} onClick={() => { changePage(2) }}>
                <i className="fas fa-arrow-circle-left fa-lg"></i>
            </span>

        </div>

    )
}

export { ProfileImg, FirstPage, SecondPage, ThirdPage }