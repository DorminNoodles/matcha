import React from 'react';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import { Range } from 'rc-slider';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';

const Handle = Slider.Handle;

function SliderAgeRange(props) {

  const handle = (props, { age_min, age_max, onChangeAge }) => {
    const { value, dragging, index, ...restProps } = props;

    if (index === 0 && value !== age_min)
      onChangeAge(value, age_max);
    else if (index === 1 && value !== age_max)
      onChangeAge(age_min, value);

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
        <p>{props.age_min} - {props.age_max}</p>
      </div>
      <Range
        min={18}
        defaultValue={[props.age_min, props.age_max]}
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