import React from 'react';
import { Tags } from '../export'


function UserProfil({ onChange, info, id }) {
    return (
        <React.Fragment>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>

                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", width: "50%" }}>
                    <figure className="image is-square" style={{ width: "100%" }}>
                        <img className="image is-rounded"
                            alt="username" onClick={() => onChange({ modal: "modal is-active" })} src="https://data.whicdn.com/images/296905234/superthumb.png?t=1505109579" />
                    </figure>
                </div>

                <div style={{ padding: "8px" }}>
                    <span style={{ display: "flex", fontWeight: "bold", fontSize: "larger" }}>
                        <p>{info.firstname} {info.lastname} (<span style={{ fontStyle: "italic", fontWeight: 600 }}>{info.username}</span>), {info.age}</p>
                    </span>

                    <span style={{ display: "flex", fontWeight: "bold", fontSize: "large", alignItems: "center" }}>
                        <p>{info.location}</p><i className="fas fa-map-marker-alt"/>
                    </span>
                    <br />

                    <span style={{ display: "flex", fontWeight: "bold", fontSize: "medium", alignItems: "center" }}>
                        <p>{info.orientation} - {info.gender}</p>
                    </span>
                    <br />
                </div>

            </div>
            <br />

            <p>{info.bio}</p>

            <Tags id={id} />
            <br />

            {
                id > 0 ?
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <button className="button red-white">Bloquer</button>
                        <button className="button red-white">Report</button>
                    </div> : <React.Fragment></React.Fragment>
            }
        </React.Fragment>
    )
}

export { UserProfil };