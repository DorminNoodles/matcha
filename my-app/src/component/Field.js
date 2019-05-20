import React from 'react';

function Field({ position, icon, onChange, placeholder }) {

    return (
        <div className="field">

            <p className={`control has-icons-${position}`}>
                <input className="input" type="text" placeholder={placeholder} onChange={onChange} />
                <span className={`icon is-small is-${position}`}>
                    <i className={icon}></i>
                </span>
            </p>
        </div>
    )
}

export { Field }