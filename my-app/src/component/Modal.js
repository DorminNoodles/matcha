import React from 'react';

class Modal extends React.Component {

    render() {
        return (

            <div class="modal ">
                <div class="modal-background"></div>
                <div class="modal-content" style={{ alignItems: "center", display: "flex", justifyContent: "center" }}>
                    <span>
                        <i class="fas fa-chevron-left"></i>
                    </span>
                    <img className="is-square" style={{ width: "400px", height: "400px", display: "flex", margin: "auto" }} alt="username" src="https://i.pinimg.com/originals/ba/de/f7/badef7c18045efffdab154a0b968a158.jpg"  />
                    <span>
                        <i class="fas fa-chevron-right"></i>
                    </span>
                </div>
                <button class="modal-close is-large" aria-label="close"></button>
            </div>
        )
    }
}

export { Modal };