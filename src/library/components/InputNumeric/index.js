import React, { useState, useEffect } from "react";
import { InputNumericWrapper } from "./styles";

export default function InputNumeric({ min, max, value, onChange }) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const onChangeCb = (e) => {
  if(+inputValue < +max) {
    setInputValue(Math.trunc(e.currentTarget.value));
    onChange(Math.trunc(e.currentTarget.value));
  } else {
    setInputValue(max);
    onChange(max);
  }
  };

  const increment = () => {
    if(+inputValue < +max) {
      setInputValue(+inputValue + 1);
      onChange(+inputValue + 1);
    } else {
      setInputValue(max);
      onChange(max);
    }
  };

  const decrement = () => {
    if(+inputValue > +min) {
      setInputValue(+inputValue - 1);
      onChange(+inputValue - 1);
    }
  };

  return (
    <InputNumericWrapper>
      <button disabled={inputValue === min} onClick={decrement} >-</button>
      <input type='number' min='0' step='1' pattern='[0-9]*' value={inputValue} onChange={onChangeCb} />
      <button disabled={inputValue === max} onClick={increment} >+</button>
    </InputNumericWrapper>
  );
}
