import React from 'react';



function Field({ position, icon, onChange, placeholder, error, success ,type}) {

    return (
        <div className="field">

            <p className={`control has-icons-${position}`}>
                <span className={`icon is-small is-${position}`}>
                    <i className={icon}></i>
                </span>
                <input className="input" type={type} placeholder={placeholder} onChange={onChange} />
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
            <p className="error">{error}</p>
            <p className="success">{success}</p>
        </div>
    )
}

export { Field }