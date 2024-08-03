import React from 'react';
import '../../styles/RangeSlider.css'; // CSS for styling the slider

const RangeSlider = ({ min, max, value, onChange, flow }) => {
  // eslint-disable-next-line
  const handleChange = (event: any) => {
    onChange(Number(event.target.value));
  };

  return (
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={handleChange}
      className="range-slider"
      style={{ direction: flow, transform: 'scaleX(-1)' }} // Invert the slider visually
    />
  );
};

export default RangeSlider;
