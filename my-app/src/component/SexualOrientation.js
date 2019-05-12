import React from 'react';

class SexualOrientation extends React.Component {
    constructor(props) {
      super(props);
      this.state = { distance: '25'};
    }
  
    render() {

      const wrapperStyle = { width: "calc(70vw - 50px)", height: "80px", maxWidth: "400px", margin: "10px 0px", minHeight: "max-content" };

      return (
        <div style={wrapperStyle}>
        <p style={{ margin: "10px 0px"}}>Sexual Orientaion</p>
        <div class="control" style={{ display: "table" }}>
            <label class="radio">
                <input type="radio" name="heterosexual" style={{ marginRight: "5px" }}/>
                heterosexual 
            </label>
            <label class="radio">
                <input type="radio" name="homosexual" style={{ marginRight: "5px" }}/>
                homosexual
            </label>
            <label class="radio">
                <input type="radio" name="bisexual" style={{ marginRight: "5px" }}/>
                bisexual
            </label>
            </div>
        </div>
      );
    }
  }
  

 
export { SexualOrientation };