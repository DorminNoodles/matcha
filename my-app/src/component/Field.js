import React from 'react';

function Field(props) {
    let { position, icon, onChange, placeholder } = { ...props }
    
    return (
        <div className="field">

            <p className={`control has-icons-${position}`}>
                <input className="input" type="text" placeholder={placeholder} onChange={onChange}/>
                <span className={`icon is-small is-${position}`}>
                    <i className={icon}></i>
                </span>
            </p>
        </div>
    )
}

export { Field }