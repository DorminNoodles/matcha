import React from 'react';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';

const Handle = Slider.Handle;

function SliderOne(props) {

  const handle = (props, { val, i, onChange }) => {
    const { value, dragging, index, ...restProps } = props;

    if (value !== val)
      onChange({ [i.toLowerCase()] : value });

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
        <p style={{ margin: "10px 0px" }}>{props.i}</p>
        <p>{props.val} {props.unite}</p>
      </div>
      <Slider
        min={props.min}
        max={300}
        defaultValue={props.val}
        handle={(e) => handle(e, props)}
      />
    </div>
  );
}

export { SliderOne };