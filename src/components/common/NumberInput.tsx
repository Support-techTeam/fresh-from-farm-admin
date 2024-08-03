import React, { useState } from 'react';
import '../../styles/NumberInput.css';

const NumberInput = ({ min, max }) => {
  const [value, setValue] = useState(min);

  const increment = () => {
    if (value < max) {
      setValue(value + 1);
    }
  };

  const decrement = () => {
    if (value > min) {
      setValue(value - 1);
    }
  };

  return (
    <div className="number-input">
      <button onClick={decrement} disabled={value <= min}>
        -
      </button>
      <span>{value}</span>
      <button onClick={increment} disabled={value >= max}>
        +
      </button>
    </div>
  );
};

export default NumberInput;
