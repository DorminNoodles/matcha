import React from 'react';
import { Tags } from '../export'


function UserProfil({ onChange }) {
    return (
        <React.Fragment>

            <span style={{ display: "flex", fontWeight: "bold" }}><p>Lisa TRAN (
            <span style={{ fontStyle: "italic", fontWeight: 600 }}>Lisouiw</span>), 20</p>
            </span>

            <br />

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
                <img className="is-square" alt="username" onClick={() => onChange({ modal: "modal is-active" })} src="https://data.whicdn.com/images/296905234/superthumb.png?t=1505109579" />
            </div>
            <br />

            <p>
                Je suis une gentille fille. Très gentille!
                Je suis une gentille fille. Très gentille!
                Je suis une gentille fille. Très gentille!
                Je suis une gentille fille. Très gentille!
                Je suis une gentille fille. Très gentille!
                Je suis une gentille fille. Très gentille!
                Je suis une gentille fille. Très gentille!
          </p>

            <Tags />
            <br />

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button className="button red-white">Bloquer</button>
                <button className="button red-white">Report</button>

            </div>
        </React.Fragment>
    )
}

export { UserProfil };