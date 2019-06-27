import React from 'react';
import { Field } from "../export"
import profile from "../image/profile.png"
import { SliderAge, SliderLocation, Gender, SexualOrientation } from '../export'

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
    return (

        <React.Fragment>
            <Field placeholder="Firstname" position="left" onChange={onChange} error={info.firstname.error} />
            <Field placeholder="Lastname" position="left" onChange={onChange} error={info.lastname.error} />
            <br></br>
            <Field placeholder="Username" position="left" icon="fas fa-user" onChange={onChange} error={info.username.error} />
            <Field placeholder="Email" position="left" icon="fas fa-envelope" onChange={onChange} error={info.email.error} />
            <Field placeholder="Password" type="password" position="left" icon="fas fa-lock" onChange={onChange} error={info.password.error} />
            <Field placeholder="Confirmation" type="password" position="left" icon="fas fa-lock" onChange={onChange} error={info.confirmation.error} />
            <button className="button" onClick={() => changePage(2)}>Continue</button>
        </React.Fragment>

    )
}

function SecondPage({ register, info, onChange, changePage }) {
    return (

        <div className="">
            <Gender onChange={onChange} />
            <SexualOrientation onChange={onChange} />
            <br />
            <SliderAge onChange={onChange} age={info.desired.value} />
            <SliderLocation onChange={onChange} distance={info.distance.value} />
            <br/>
            <button className="button center" onClick={register} >Create an account</button>
            <span className="pointer center" style={{marginTop:"10px"}} onClick={() => { changePage(1) }}>
                <i className="fas fa-arrow-circle-left fa-lg"></i>
            </span>

        </div>

    )
}

export { ProfileImg, FirstPage, SecondPage }