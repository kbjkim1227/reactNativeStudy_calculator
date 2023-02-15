import { useState } from "react";

export const useCalculator = () => {
  const [input, setInput] = useState(0); //* 입력한 값이 출력되는 거에 대한 state                               ex) 2 -> 14
  const [currentOperator, setCurrentOperator] = useState(null); //* 연산버튼을 눌렀을 때 테두리에 대한 state    ex) + -> null
  const [result, setResult] = useState(null); //* 이전 값 저장공간                                             ex) 12 -> 14
  const [tempInput, setTempInput] = useState(null); //* "="을 눌렀을 때 저장되있는 값???                       ex) Input의 2
  const [tempOperator, setTempOperator] = useState(null); //* "="을 눌렀을 때 저장되있는 수식???               ex) CurrentOperator의 +
  const [isClickedOperator, setIsClickedOperator] = useState(false);
  const [isClickedEqual, setIsClickedEqual] = useState(false); //* "=" 클릭시 기본값

  // const hasInput = input ? true : false;
  const hasInput = !!input;

  const onPressNum = (num) => {
    if (currentOperator && isClickedOperator) {
      setResult(input);
      setInput(num);
      setIsClickedOperator(false);
    } else {
      const newInput = Number(`${input}${num}`);
      setInput(newInput);
    }
  };

  const onPressOperator = (operator) => {
    if (operator !== "=") {
      setCurrentOperator(operator);
      setIsClickedOperator(true);
      setIsClickedEqual(false);
    } else {
      let finalResult = result;
      const finalInput = isClickedEqual ? tempInput : input; //* =을 눌렀을 때 tempinput의 연산자가 들어가고 아니면 input값이 들어간다
      const finalOperator = isClickedEqual ? tempOperator : currentOperator;
      switch (finalOperator) {
        case "+":
          finalResult = result + finalInput;
          break;
        case "-":
          finalResult = result - finalInput;
          break;
        case "*":
          finalResult = result * finalInput;
          break;
        case "/":
          finalResult = result / finalInput;
          break;
        default:
          break;
      }
      setResult(finalResult);
      setInput(finalResult);
      setTempInput(finalInput);
      setCurrentOperator(null);
      setTempOperator(finalOperator);
      setIsClickedEqual(true);
    }
  };

  const onPressReset = () => {
    if (hasInput) {
      setInput(0);
    } else {
      setInput(0);
      setCurrentOperator(null);
      setResult(null);
      setTempInput(null);
      setTempOperator(null);
    }
  };
  return {
    input,
    currentOperator,
    result,
    tempInput,
    tempOperator,
    hasInput,
    onPressNum,
    onPressOperator,
    onPressReset,
  };
};
