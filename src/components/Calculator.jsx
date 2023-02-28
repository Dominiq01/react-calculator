import classes from "./Calculator.module.css";
import Display from "./Display";
import { useReducer } from "react";

let result = "";

const displayReducer = (currentDisplay, action) => {
  switch (action.type) {
    case "OPERATE":
      return {
        prevNumber: currentDisplay.currentNumber,
        mathSign: action.val,
        currentNumber: "",
      };
    case "GET_NUMBER":
      return {
        prevNumber: currentDisplay.prevNumber,
        mathSign: currentDisplay.mathSign,
        currentNumber: currentDisplay.currentNumber + action.val,
      };
    case "SHOW_RESULT":
      return { prevNumber: "", mathSign: "", currentNumber: result };
    case "CLEAR_RESULT":
      return { prevNumber: "", mathSign: "", currentNumber: "" };
    case "DOT":
      return {
        prevNumber: currentDisplay.prevNumber,
        mathSign: currentDisplay.mathSign,
        currentNumber: "0.",
      };
    case "MINUS":
      return { prevNumber: "", mathSign: "", currentNumber: action.val };
    case "SQRT":
      return {
        prevNumber: "√" + currentDisplay.currentNumber,
        mathSign: "",
        currentNumber: result,
      };
  }
};

function Calculator() {
  const [display, dispatch] = useReducer(displayReducer, {
    prevNumber: "",
    mathSign: "",
    currentNumber: "",
  });

  function operate(e) {
    let operator = e.target.innerText;
    if (display.currentNumber === "" && operator === "-") {
      return dispatch({ type: "MINUS", val: operator });
    } else if (
      display.currentNumber === "" ||
      (operator === "-" && display.currentNumber === "-")
    ) {
      return;
    }
    if (display.mathSign !== "" && display.mathSign === operator) {
      showResult();
      return;
    }
    if (operator === "√") {
      result = Math.sqrt(display.currentNumber);
      dispatch({ type: "SQRT" });
      return;
    }
    dispatch({ type: "OPERATE", val: operator });
  }

  function getNumber(e) {
    let number = e.target.innerText;
    if (String(display.currentNumber).includes(".") && number === ".") {
      return;
    } else if (number === "." && display.currentNumber === "") {
      return dispatch({ type: "DOT" });
    }
    dispatch({ type: "GET_NUMBER", val: number });
  }

  function showResult() {
    if (
      (display.prevNumber === "" && display.mathSign === "") ||
      display.prevNumber === "-" ||
      display.currentNumber === "-" ||
      display.currentNumber === ""
    ) {
      return;
    }
    let a = Number(display.currentNumber);
    let b = Number(display.prevNumber);
    let operator = display.mathSign;
    switch (operator) {
      case "+":
        result = a + b;
        break;
      case "-":
        result = b - a;
        break;
      case "×":
        result = a * b;
        break;
      case "÷":
        result = b / a;
        break;
    }
    dispatch({ type: "SHOW_RESULT" });
  }

  function clearResult() {
    result = "";
    dispatch({ type: "CLEAR_RESULT" });
  }

  return (
    <div className={classes.calculator}>
      <Display
        mathSign={display.mathSign}
        prevNumber={display.prevNumber}
        currentNumber={display.currentNumber}
      />
      <div className={classes.panel}>
        <button className={classes.operator} onClick={operate}>
          √
        </button>
        <button className={classes.operator} onClick={operate}>
          ÷
        </button>
        <button className={classes.operator} onClick={operate}>
          ×
        </button>
        <button className={classes.operator} onClick={clearResult}>
          C
        </button>
        <button className={classes.number} onClick={getNumber}>
          7
        </button>
        <button className={classes.number} onClick={getNumber}>
          8
        </button>
        <button className={classes.number} onClick={getNumber}>
          9
        </button>
        <button className={classes.operator} onClick={operate}>
          -
        </button>
        <button className={classes.number} onClick={getNumber}>
          4
        </button>
        <button className={classes.number} onClick={getNumber}>
          5
        </button>
        <button className={classes.number} onClick={getNumber}>
          6
        </button>
        <button className={classes.operator} onClick={operate}>
          +
        </button>
        <button className={classes.number} onClick={getNumber}>
          1
        </button>
        <button className={classes.number} onClick={getNumber}>
          2
        </button>
        <button className={classes.number} onClick={getNumber}>
          3
        </button>
        <button className={classes.equals} onClick={showResult}>
          =
        </button>
        <button className={classes.numberZero} onClick={getNumber}>
          0
        </button>
        <button className={classes.number} onClick={getNumber}>
          00
        </button>
        <button className={classes.number} onClick={getNumber}>
          .
        </button>
      </div>
    </div>
  );
}

export default Calculator;
