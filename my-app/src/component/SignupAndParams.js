import React from 'react';
import { Field } from "../export"
import profile from "../image/profile.png"
import { SliderOne, SliderAgeRange, Gender, SexualOrientation, Location } from '../export'

const ProfileImg = ({ error, sendFile, avatar, upload }) => {
    let imgProfil = !avatar ? profile : avatar

    return (

        <div className="center" style={{ flexWrap: "wrap", flexDirection: "column" }}>
            <figure className="image is-128x128" style={{ margin: "20px 0px" }}>
                <img className="is-rounded"
                    style={{ width: "128px", height: "128px" }}
                    src={imgProfil} alt="profil" />
            </figure>
            {
                upload === true &&
                <React.Fragment>
                    <p className="error">{error}</p>
                    <p className="title-matcha">Matcha</p>
                    <form encType="multipart/form-data">
                        <input className="inputfile"
                            onChange={sendFile}
                            name="avatar"
                            placeholder="Choose avatar"
                            type="file"
                        />
                    </form>
                </React.Fragment>
            }
        </div>

    )
}

function FirstPage({ info, onChange, changePage, status }) {
    let { firstname, lastname, username, email, password, confirmation } = info
    return (

        <React.Fragment>
            <Field placeholder="Firstname" position="left" action={{ onChange: onChange }} error={firstname.error} value={firstname.value} />
            <Field placeholder="Lastname" position="left" action={{ onChange: onChange }} error={lastname.error} value={lastname.value} />
            <br></br>
            <Field placeholder="Username" position="left" icon="fas fa-user" action={{ onChange: onChange }} error={username.error} value={username.value} />
            <Field placeholder="Email" position="left" icon="fas fa-envelope" action={{ onChange: onChange }} error={email.error} value={email.value} />{
                status.value === "signup" &&
                <React.Fragment>
                    <Field placeholder="Password" type="password" position="left" icon="fas fa-lock" action={{ onChange: onChange }} error={password.error} value={password.value} />
                    <Field placeholder="Confirmation" type="password" position="left" icon="fas fa-lock" action={{ onChange: onChange }} error={confirmation.error} value={confirmation.value} />
                </React.Fragment>
            }
            <button className="button" onClick={() => changePage(2)}>Continue</button>
        </React.Fragment>

    )
}

function SecondPage({ info, onChange, changePage, onChangeAge }) {
    return (

        <div className="">
            <Gender onChange={onChange} gender={info.gender.value} />
            <p className="error-text">{info.gender.error}</p>

            <SexualOrientation onChange={onChange} orientation={info.orientation.value} />
            <br />
            <SliderAgeRange onChangeAge={onChangeAge} ageMin={info.ageMin.value} ageMax={info.ageMax.value} />
            <SliderOne onChange={onChange} val={info.distance.value} i="Distance" unite="km" min={5} max={300} />
            <br />
            <button className="button center" onClick={() => changePage(3)}>Continue</button>
            <span className="pointer center" style={{ marginTop: "10px" }} onClick={() => { changePage(1) }}>
                <i className="fas fa-arrow-circle-left fa-lg"></i>
            </span>
        </div>

    )
}

function ThirdPage({ info, onChange, changePage, error, status, onChangeLocation, success, getGeocalisation }) {
    let { location, latitude, longitude } = info

    return (

        <div>

            <div className="control">
                <textarea className="textarea has-fixed-size" placeholder="bio" onChange={(e) => { onChange({ "bio": e.target.value }) }} value={info.bio.value}></textarea>
            </div>
            <p className="error-text">{info.bio.error}</p>

            <SliderOne onChange={onChange} val={info.age.value} i="Age" unite="years" min={18} max={100} />
            <br />

            <Location onChangeLocation={onChangeLocation} city={location.value} lat={latitude.value} long={longitude.value} />
            <p className="center">or</p>
            <button className="button white-red" style={{ width: "auto", borderRadius: "31px", margin: "20px auto", display: "flex" }} onClick={() => { getGeocalisation() }}>
                <span style={{ margin: "0px 5px" }}><i className="fas fa-map-marker-alt" /></span>
                <p>Geocalisation</p>
                <span style={{ margin: "0px 5px" }}><i className="fas fa-map-marker-alt" /></span>
            </button>
            <p className="error-text center">{info.location.error}</p>

            <br />

            <button className="button center" onClick={status.fct}>{status.text}</button>

            <p className="error-text center">{error}</p>
            <p className="success center">{success}</p>

            <span className="pointer center" style={{ marginTop: "10px" }} onClick={() => { changePage(2) }}>
                <i className="fas fa-arrow-circle-left fa-lg"></i>
            </span>

        </div>

    )
}

export { ProfileImg, FirstPage, SecondPage, ThirdPage, Location }