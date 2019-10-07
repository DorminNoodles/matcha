import profile from "../image/profile.png"
import React from 'react';

function ModalBlockReport({ index, modal, onChange, name, fct }) {

    let message = name === "block" ? "Are you sure to block this user?" : "Are you sure to report this user?"

    return (
        <Modal index={index} modal={modal} onChange={onChange}>
            <div className="white-red div-modal">
                <p style={{ margin: "10px 0px" }}>{message}</p>
                <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                    <button className="red-white button-modal" onClick={() => { fct(name) }}>Yes</button>
                    <button className="white-red button-modal" onClick={() => { onChange({ [index]: "modal" }) }}>No</button>
                </div>
            </div>
        </Modal>
    )
}

function ModalPhoto({ index, photos, modal, onChange, number, id, onChangePicture }) {
    let img = id && photos[number] ? process.env.REACT_APP_PUBLIC_URL + id + "/" + photos[number] : profile

    return (
        <div className={modal}>
            <div className="modal-background"></div>
            <div className="modal-content" style={{ alignItems: "center", display: "flex", justifyContent: "center" }}>
                <span onClick={() => { onChangePicture(number - 1) }}>
                    <i className="fas fa-chevron-left"></i>
                </span>
                <img className="is-square" style={{ width: "400px", height: "400px", display: "flex", margin: "auto" }} alt="username" src={img} />
                <span onClick={() => { onChangePicture(number + 1) }}>
                    <i className="fas fa-chevron-right"></i>
                </span>
            </div>
            <button className="modal-close is-large" onClick={() => { onChange({ [index]: "modal" }) }} aria-label="close"></button>
        </div>
    )
}

function Modal({ index, modal, onChange, children }) {
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

export { ModalPhoto, Modal, ModalBlockReport };