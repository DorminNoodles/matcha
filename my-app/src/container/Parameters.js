import React from 'react';
import { SliderAge, SliderLocation, Gender, SexualOrientation }  from '../export'

function Parameters() {
  return (
    <div id="parameters">
      <Gender/>
      <SexualOrientation/>
      <SliderAge/>
      <SliderLocation/>
      <button class="button">Save</button>
    </div>
  );
}

export { Parameters };   