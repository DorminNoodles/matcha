import React from 'react';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import { Range } from 'rc-slider';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';

const Handle = Slider.Handle;

function SliderAgeRange(props) {

  const handle = (props, { age, onChange }) => {
    const { value, dragging, index, ...restProps } = props;

    if (index === 0 && value !== age.min)
      onChange({ desired: { min: value, max: age.max } });
    else if (index === 1 && value !== age.max)
      onChange({ desired: { min: age.min, max: value } });

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
        <p style={{ margin: "10px 0px" }}>Show Ages: </p>
        <p>{props.age.min} - {props.age.max}</p>
      </div>
      <Range
        min={18}
        defaultValue={[props.age.min, props.age.max]}
        handle={(e) => handle(e, props)}
        pushable
      />
    </div>
  );
}

function SliderAge(props) {

  const handle = (props, { age, onChange }) => {
    const { value, dragging, index, ...restProps } = props;

    if (value !== age)
      onChange({ age: value });

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
        <p style={{ margin: "10px 0px" }}>Your Age</p>
        <p>{props.age} years</p>
      </div>
      <Slider
        min={18}
        max={100}
        defaultValue={props.age}
        handle={(e) => handle(e, props)}
      />
    </div>
  );
}

export { SliderAge, SliderAgeRange };