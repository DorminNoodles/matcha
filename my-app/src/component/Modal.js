import React from 'react';

function ModalPhoto({ index, modal, onChange }) {

    return (

        <div className={modal}>
            <div className="modal-background"></div>
            <div className="modal-content" style={{ alignItems: "center", display: "flex", justifyContent: "center" }}>
                <span>
                    <i className="fas fa-chevron-left"></i>
                </span>
                <img className="is-square" style={{ width: "400px", height: "400px", display: "flex", margin: "auto" }} alt="username" src="https://i.pinimg.com/originals/ba/de/f7/badef7c18045efffdab154a0b968a158.jpg" />
                <span>
                    <i className="fas fa-chevron-right"></i>
                </span>
            </div>
            <button className="modal-close is-large" onClick={() => { onChange({ [index]: "modal" }) }} aria-label="close"></button>
        </div>
    )
}

function Modal( { index, modal, onChange, children } ) {

    return (

        <div className={modal}>
            <div className="modal-background"></div>
            <div className="modal-content" style={{ alignItems: "center", display: "flex", justifyContent: "center" }}>
                {children}
            </div>
            <button className="modal-close is-large" onClick={() => { onChange({ [index]: "modal" }) }} aria-label="close"></button>
        </div>
    )
}

export { ModalPhoto, Modal };