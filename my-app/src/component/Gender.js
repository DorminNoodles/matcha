import React from 'react';

class Gender extends React.Component {
    constructor(props) {
      super(props);
      this.state = { distance: '25'};
    }
  
    render() {

      const wrapperStyle = { width: "calc(70vw - 50px)", maxWidth: "400px", margin: "10px 0px", minHeight: "max-content", minHeight: "-moz-max-content" };

      // const wrapperStyle = { width: "calc(70vw - 50px)", height: "60px", maxWidth: "400px", margin: "10px 0px", minHeight: "max-content" };

      return (
        <div style={wrapperStyle}>
        <p style={{ margin: "10px 0px"}}>Gender</p>
        <div className="control">
            <label className="radio">
                <input type="radio" name="gender" style={{ marginRight: "5px" }}/>
                Male
            </label>
            <label className="radio">
                <input type="radio" name="gender" style={{ marginRight: "5px" }}/>
                Female
            </label>
            </div>
       
        </div>
      );
    }
  }
 
export { Gender };