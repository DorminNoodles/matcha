import React from 'react';
import { Tags }  from '../export'

function User() {
  return ( 
    <div id="user">
      <div style={{ flexWrap: "wrap", width: "100%", display: "flex", justifyContent: "center" }}>
      <figure className="image is-128x128" style={{ margin: "10px 0px" }}>
        <img className="is-rounded" src="https://www.wanimo.com/veterinaire/images/articles/chat/fibrosarcome-chat.jpg" alt="profil"/>
      </figure>
      <div id="info-user">
        <div style={{ 
          display: "flex",
          justifyContent: "space-between",
          textAlign: "end"
         }}>
          <div style={{ textAlign: "start"}}>
            <p>Login: Lisouiw</p>
            <p>Fistname: Lisa</p>
            <p>Lastname: TRAN</p>
            <p>Age: 20yo</p>
          </div>
          <div>
            <p>Gender: Female</p>
            <p>Preference: Heterosexual</p>
            <p>Lastname: TRAN</p>
            <p>Age: 20yo</p>
          </div>
        </div>
        <p>My Bio</p>
        <Tags/>
      </div>
      </div>
    </div>
  );
}

export { User };
