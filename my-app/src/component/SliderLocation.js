import React from 'react';
import 'rc-slider/assets/index.css';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const Handle = Slider.Handle;

class SliderLocation extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        min: '18',
        max: '100'
      };
      this.handle = this.handle.bind(this);
    }
  
    handle(props)  {
      console.log(props)

      const { value, dragging, index, ...restProps } = props;
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

      const wrapperStyle = { width: "calc(70vw - 50px)", height: "60px" };

      return (
        <div style={wrapperStyle}>
            <p>Distance</p>
            <Slider
            min={0}
            max={300}
            defaultValue={ 25 }
            tipFormatter={value => `${value}km`}
            handle={ this.handle }
            />
        </div>
      );
    }
  }
  

 
export { SliderLocation };