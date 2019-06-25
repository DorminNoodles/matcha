import React from 'react';
import { Field } from "../export"

export const ForgotPassword = ({ onChange, error, success, forgot }) => (
    <React.Fragment>
        <Field placeholder="Email" type="email" position="left" icon="fas fa-envelope" onChange={(e) => onChange(e, "value")} error={error} success={success} />
        <button className="button white-red" onClick={forgot} >Send</button>
    </React.Fragment>
)

export const NewPassword = ({ onChange, error, success, newPassword }) => (
    <React.Fragment>
        <Field placeholder="New Password" type="password" position="left" icon="fas fa-envelope" onChange={(e) => onChange(e, "value")} />
        <Field placeholder="Confirmation" type="password" position="left" icon="fas fa-envelope"  onChange={(e) => onChange(e, "confirm")} error={error} success={success} />
        <button className="button white-red" onClick={newPassword} >Change your password</button>
    </React.Fragment>
)