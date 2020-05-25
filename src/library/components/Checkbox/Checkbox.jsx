import React, { useState, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  FormControlLabel,
  Checkbox as MaterialCheckbox,
} from "@material-ui/core";
import InputNumeric from "../InputNumeric";
import { CounterWrapper, GreyText } from "./styles";

export default function Checkbox({
  checkboxCb,
  inputNumberCb,
  value,
  label,
  inputNumericMax,
  orderGroupArray,
  setDefaultExpanded,
}) {
  const { t } = useTranslation();
  const dataFromOrder = useMemo(() => orderGroupArray.find(({ name }) => name === value.name), [orderGroupArray, value.name]);
  const [checked, setChecked] = useState(!!dataFromOrder);
  value.portion = useMemo(() => dataFromOrder?.portion || 1, [dataFromOrder?.portion]);
  const [inputNumber, setInputNumber] = useState(value.portion);
  const [max, setMax] = useState(inputNumericMax + inputNumber);

  if (checked) setDefaultExpanded(true);

  useEffect(() => {
    setChecked(!!dataFromOrder);
    setInputNumber(value.portion);
    setMax(inputNumericMax + value.portion);
  }, [orderGroupArray, inputNumericMax, value.name]);

  return (
    <CounterWrapper>
      <FormControlLabel
        key={value.name}
        control={
          <MaterialCheckbox
            onChange={(e) => {
              setChecked(!checked);
              checkboxCb(e, value);
            }}
            name={label}
            color="primary"
            disabled={!checked && max === inputNumber}
            checked={checked}
          />
        }
        label={label}
      />
      <GreyText>{`${value.weight * value.portion}${t("g")}/${
        value.price * value.portion
      }${t("currency")}`}</GreyText>
      {checked && (
        <>
          <InputNumeric
            min={1}
            max={max}
            value={inputNumber}
            onChange={(num) => {
              if(num === value.portion) return;
              setInputNumber(num);
              inputNumberCb(num, value);
            }}
          />
        </>
      )}
    </CounterWrapper>
  );
}
