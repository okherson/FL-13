function positiveSum(arr) {
  let sum = 0;
  if (arr) {
    const ARR_LEN = arr.length;
    let currentNumber = 0;
    if (arr instanceof Array) {
      for(let i = 0; i < ARR_LEN; i++) {
        currentNumber = +arr[i];
        sum += currentNumber > 0 ? currentNumber : 0;
      }
    }
  }
  return sum;
}
positiveSum();
