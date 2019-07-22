import React from 'react';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';

const Handle = Slider.Handle;

function SliderLocation(props) {
  
  const handle = (props, {distance, onChange}) => {
    const { value, dragging, index, ...restProps } = props;

    if (value !== distance)
      onChange({ distance: value });

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

  return (
    <div className="field-param">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <p style={{ margin: "10px 0px" }}>Distance</p>
        <p>{props.distance} km</p>
      </div>
      <Slider
        min={5}
        max={300}
        defaultValue={25}
        handle={(e) => handle(e, props)}
      />
    </div>
  );
}

export { SliderLocation };