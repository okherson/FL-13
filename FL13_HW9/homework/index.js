function convert(...args) {
  const TYPE_OF_NUMBER = 'number';
  const TYPE_OF_STRING = 'string';
  let convertedArr = [];
  for (let property in args) {
    if (typeof args[property] === TYPE_OF_NUMBER) {
      convertedArr[property] = '' + args[property];
    } else if (typeof args[property] === TYPE_OF_STRING){
      convertedArr[property] = +args[property];
    } else {
      convertedArr[property] = args[property];
    }
  }
  return convertedArr;
}
function executeforEach(arr, toDo) {
  for (let property in arr) {
    if (arr[property]) {
      toDo(arr[property]);
    }
  }
}
function mapArray (arr, toDoFunction) {
  const TYPE_OF_STRING = 'string';
  let arrOfNums = [];
  for(let prop in arr) {
    if (typeof arr[prop] === TYPE_OF_STRING) {
      arrOfNums[prop] = parseInt(arr[prop], 10);
    } else {
      arrOfNums[prop] = arr[prop];
    }
  }
  let nArr = [];
  executeforEach(arrOfNums, function f (el) {
    nArr.push(toDoFunction(el));
  });
  return nArr;
}
function filterArray(arr, toDoFunction) {
  let filteredArr = [];
  executeforEach(arr, function f (el) {
    if (toDoFunction(el)) {
      filteredArr.push(el);
    }
  });
  return filteredArr;
}
function containsValue(arr, val) {
  let isContains = false;
  executeforEach(arr, function(el) {
    if (el === val) {
      isContains = true;
    }
  });
  return isContains;
}
function flipOver(str) {
  let revStr = '';
  for(let letter of str) {
    revStr = letter + revStr;
  }
  return revStr;
}
function makeListFromRange(arr) {
  let list = [];
  if (arr && arr[0] && arr[1]) {
    const FROM_NUMBER = arr[0] < arr[1] ? arr[0] : arr[1];
    const TILL_NUMBER = arr[0] < arr[1] ? arr[1] : arr[0];
    for (let i = FROM_NUMBER; i <= TILL_NUMBER; i++) {
      list.push(i);
    }
  }
  return list;
}
function getArrayOfKeys(obj, keyName) {
  let arrayOfKeys = [];
  executeforEach(obj, function(el) {
    if (el[keyName]){
      arrayOfKeys.push(el[keyName]);
    }
  });
  return arrayOfKeys;
}
function substitute(arr) {
  const LOWER_BORDER = 10;
  const UPPER_BORDER = 20;
  let resArr = mapArray(arr, function(el){
    if (el > LOWER_BORDER && el < UPPER_BORDER) {
      return '*';
    } else {
      return el;
    }
  })
  return resArr;
}
function getPastDay(date, pastValue){
  let lastDate = new Date(date);
  lastDate.setDate(lastDate.getDate() - pastValue);
  return lastDate.getDate();
}
function formatDate(date) {
  const DATE_STR = date.toLocaleDateString('en-ZA');
  const TIME_STR = date.toLocaleTimeString([], {hour12: false, hour: '2-digit', minute: '2-digit'});
  return DATE_STR + ' ' + TIME_STR;
}
