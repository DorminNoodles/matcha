import React from 'react';

function Signin() {
  return (
    <div id="signin">
      <div className="field">
        <p className="control has-icons-left has-icons-right">
          <input className="input" type="text" placeholder="Username" />
          <span className="icon is-small is-left">
            <i className="fas fa-user"></i>
          </span>
        </p>
      </div>

      <div className="field">
        <p className="control has-icons-left">
          <input className="input" type="password" placeholder="Password" />
          <span className="icon is-small is-left">
            <i className="fas fa-lock"></i>
          </span>
        </p>
      </div>
    </div>
  );
}

export { Signin };   