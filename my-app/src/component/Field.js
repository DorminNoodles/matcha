import React from 'react';

function Field({ position, icon, onChange, placeholder, error }) {

    return (
        <div className="field">

            <p className={`control has-icons-${position}`}>
                <span className={`icon is-small is-${position}`}>
                    <i className={icon}></i>
                </span>
                <input className="input" type="text" placeholder={placeholder} onChange={onChange} />
                {
                    error &&
                    <span className={`icon is-small is-right`}>
                        <i className="fas fa-times error"></i>
                    </span>
                }
            </p>
            <p className="error">{error}</p>
        </div>
    )
}

export { Field }