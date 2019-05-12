import React from 'react';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';

const Handle = Slider.Handle;

class SliderLocation extends React.Component {
    constructor(props) {
      super(props);
      this.state = { distance: '25'};
      this.handle = this.handle.bind(this);
    }
  
    handle(props)  {

      const { value, dragging, index, ...restProps } = props;
      
      if (value !== this.state.distance)
        this.setState({ distance : value });

      return (
        <Tooltip
          prefixCls="rc-slider-tooltip"
          overlay={value}
          visible={dragging}
          placement="top"
          key={index}
        >
          <Handle value={value} {...restProps} />
        </Tooltip>
      );
    };
  
    render() {

      const wrapperStyle = { width: "calc(70vw - 50px)", height: "80px", maxWidth: "400px", margin: "10px 0px", minHeight: "max-content" };

      return (
        <div style={wrapperStyle}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <p style={{ margin: "10px 0px"}}>Distance</p>
              <p>{this.state.distance} km</p>
            </div>
            <Slider
              min={5}
              max={300}
              defaultValue={ 25 }
              handle={ this.handle }
            />
        </div>
      );
    }
  }
  

 
export { SliderLocation };