function storeNames() {
  let namesArr = [];
  for(let i = 0; i < arguments.length; i++) {
    namesArr[i] = arguments[i];
  }
  return namesArr;
}
storeNames();
