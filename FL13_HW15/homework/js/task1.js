const assign = function() {
  let obj = arguments[0];

for(let i = 1; i < arguments.length; i++) {
    if (arguments[i]) {
      for(let key in arguments[i]) {
        if (arguments[i][key]) {
          obj[key] = arguments[i][key];
        }
      }	
    }
  }
  console.log(obj);
}