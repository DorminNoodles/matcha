import React from 'react';
import { Tags } from '../export'
import profile from "../image/profile.png"

function UserProfil({ onChange, info, id, like, id_pic, date_active }) {
    let imgProfil = info.avatar && info.avatar !== "" ? info.avatar.toLowerCase() : profile

    return (
        <React.Fragment>
            <div>

                <div style={{ width: "50%", margin: "auto" }}>
                    <figure className="image is-square" style={{ width: "100%" }}>
                        <img className="image is-rounded"
                            alt="username" onClick={() => onChange({ modal: "modal is-active" })} src={imgProfil} />
                    </figure>
                </div>

                <div style={{ padding: "8px", textAlign: "center" }}>

                    <span style={{ display: "inline-flex", fontWeight: "bold", fontSize: "larger" }}>

                        <div>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                {
                                    !(Date.parse(info.active)) ?
                                        <p className="green-dot" style={{ marginRight: "5px" }}></p> :
                                        <p className="red-dot" style={{ marginRight: "5px" }}></p>
                                }
                                <p>{info.firstname} {info.lastname}</p>
                            </div>

                            (<span style={{ fontStyle: "italic", fontWeight: 600 }}>{info.username}</span>), {info.age}</div>
                    </span>

                    <br />
                    <br />
                    {
                        !(Date.parse(info.active)) ? <React.Fragment />
                            : <span>   Last connection: {info.date_active}</span>
                    }
                    <br />
                    <br />

                    <span style={{ display: "inline-flex", fontWeight: "bold", fontSize: "large", alignItems: "center" }}>
                        <p style={{ marginRight: "5px" }}>{info.location}</p><i className="fas fa-map-marker-alt" />
                    </span>
                    <br />
                    <br />

                    <span style={{ display: "inline-flex", fontWeight: "bold", fontSize: "medium", alignItems: "center" }}>
                        <p>{info.orientation} - {info.gender}</p>
                    </span>
                    <br />

                    <span style={{ display: "inline-flex" }}>
                        <i className="fas fa-trophy" style={{ marginRight: "5px" }} />
                        {info.score}
                    </span>

                    <br />

                    <br />
                </div>

            </div>
            <br />
            <span style={{ display: "flex" }}>
                {
                    info.likes === 0 && id > 0 &&
                    <span onClick={like}>
                        <i className="far fa-heart" />
                    </span>
                }
                {
                    info.likes === 1 && id > 0 &&
                    <span onClick={like}>
                        <i className="fa fa-heart has-text-danger" />
                    </span>
                }
                {id > 0 && <p style={{ marginLeft: "5px" }}>{info.nb_likes} likes</p>}
            </span>

            <br />

            <p>{info.bio}</p>

            <Tags id={id} />
            <br />

            {
                id > 0 ?
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <button className="button red-white" onClick={() => onChange({ modalBlock: "modal is-active" })}>Bloquer</button>
                        {info.report === 0 && <button className="button red-white" onClick={() => onChange({ modalReport: "modal is-active" })}>Report</button>}
                    </div> : <React.Fragment></React.Fragment>
            }
        </React.Fragment>
    )
}

export { UserProfil };