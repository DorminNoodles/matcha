import React from 'react';

function Field({ position, icon, placeholder, error, success, type, value, style, action }) {

    return (
        <div className="field" {...style}>

            <p className={`control has-icons-${position}`}>
                <span className={`icon is-small is-${position}`}>
                    <i className={icon}></i>
                </span>
                <input className="input" type={type} placeholder={placeholder} value={value} {...action} />
                {
                    error &&
                    <span className={`icon is-small is-right`}>
                        <i className="fas fa-times error"></i>
                    </span>
                }
                {
                    success &&
                    <span className={`icon is-small is-right`}>
                        <i className="fas fa-check success"></i>
                    </span>
                }
            </p>
            {/* <p className="error-text">{error}</p> */}
            <p className="error">{error}</p>
            <p className="success">{success}</p>
        </div>
    )
}

export { Field }