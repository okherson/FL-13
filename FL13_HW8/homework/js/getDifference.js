const isBigger = (firstNumber, secondNumber) => {
  return +firstNumber > +secondNumber;
}
function getDifference(firstNumber, secondNumber) {
  return isBigger(firstNumber, secondNumber) ? firstNumber - secondNumber : secondNumber - firstNumber;
}
getDifference();
