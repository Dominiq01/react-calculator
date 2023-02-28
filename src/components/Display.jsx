import classes from "./Display.module.css";

function Display({mathSign, prevNumber, currentNumber}) {
  return (
    <div className={classes.display}>
      <div>
        <p className={classes.prevNumber}>{prevNumber}</p>
        <span className={classes.mathSign}>{mathSign}</span>
      </div>
      <p className={classes.currentNumber}>{currentNumber}</p>
    </div>
  )
}

export default Display;