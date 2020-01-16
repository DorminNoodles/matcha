import React from 'react';
import Suggest from './Suggest';

function Location({ onChangeLocation, city }) {

    return (

        <div>
            <p className="error center">
            </p>
            <div style={{ justifyContent: "space-between", display: "flex" }}>
                <p>City</p>
                <p>{city}</p>
            </div>

            <div style={{ margin: "20px auto", alignItems: "flex-start", display: "flex", justifyContent: "center" }}>
                <Suggest onChangeLocation={onChangeLocation} />
            </div>
        </div >
    );
}

export { Location };