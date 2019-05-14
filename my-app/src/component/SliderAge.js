import React from 'react';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import { Range } from 'rc-slider';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';

const Handle = Slider.Handle;

class SliderAge extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        min: '18',
        max: '100'
      };
      this.handle = this.handle.bind(this);
    }
  
    handle(props)  {
      const { value, dragging, index, ...restProps } = props;

      if (index === 0 && value !== this.state.min)
        this.setState({ ...this.state, min : value });
      else if (index === 1 && value !== this.state.max)
        this.setState({ ...this.state, max : value });

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

      return (
        <div className="field-param">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <p style={{ margin: "10px 0px"}}>Show Ages: </p>
              <p>{this.state.min} - {this.state.max}</p>
            </div>
            <Range
              min={18}
              defaultValue={ [18, 25] }
              handle={ this.handle }
              pushable
            />
        </div>
      );
    }
  }
  
export { SliderAge };