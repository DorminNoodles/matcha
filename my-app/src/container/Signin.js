import React from 'react';
import { Field } from "../export"

function Signin() {
  return (
    <div id="signin">

      <Field placeholder="Username" position="left" icon="fas fa-user"/>
      <Field placeholder="Password" position="left" icon="fas fa-lock"/>

    </div>
  );
}

export { Signin };   