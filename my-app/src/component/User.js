import React from 'react';
import { Tags } from '../export'


function UserProfil({ onChange, info, id }) {
    return (
        <React.Fragment>

            <span style={{ display: "flex", fontWeight: "bold" }}>
                <p>{info.firstname} {info.lastname} (<span style={{ fontStyle: "italic", fontWeight: 600 }}>{info.username}</span>), {info.age}</p>
            </span>

            <br />

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
                <img className="is-square" alt="username" onClick={() => onChange({ modal: "modal is-active" })} src="https://data.whicdn.com/images/296905234/superthumb.png?t=1505109579" />
            </div>
            <br />

            <p>{info.bio}</p>

            <Tags id={id}/>
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