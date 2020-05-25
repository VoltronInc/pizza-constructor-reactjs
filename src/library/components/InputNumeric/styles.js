import styled from 'styled-components';

export const InputNumericWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  color: black; }
  * {
    box-sizing: border-box; }
  button,  input {
    color: inherit;
    font-size: inherit;
    border: 1px solid #C0C0C0;
    border-radius: 3px;
    cursor: pointer; }
  button:hover:not(:disabled),
  input:hover:not(:disabled) {
    border-color: #9a9a9a; }
  button:disabled,
  input:disabled {
    border-color: #cdcdcd;
    color: #C0C0C0; }
  button {
    height: 25px;
    width: 25px;
    padding: 0;
    background: #E1E1E1;
    -webkit-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none; }
  button:hover:not(:disabled) {
    background: #d9d9d9; }
  button:disabled {
    background: #eeeeee; }
  button:first-of-type {
    margin: 0 1px 0 0; }
  button:last-of-type {
    margin: 0 0 0 1px; }
  input {
    height: 25px;
    width: 45px;
    padding: 0 10px;
    background: #FFFFFF;
      text-align: center; }
  input {
    -webkit-appearance: textfield;
       -moz-appearance: textfield;
            appearance: textfield; }
    input::-webkit-inner-spin-button, input::-webkit-outer-spin-button {
      -webkit-appearance: none;
              appearance: none; }
`;