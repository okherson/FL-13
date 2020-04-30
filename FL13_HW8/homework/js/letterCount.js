function letterCount(strSource, strToSearch) {
	if (strToSearch && strSource) {
    strSource = strSource.toLowerCase();
    strToSearch = strToSearch.toLowerCase();
    let lenStrSource = strSource.length;
    let lenStrToSearch = strToSearch.length;
    let counter = 0;
    for(let i = 0; i < lenStrSource; i++) {
      for(let n = 0; i + n < lenStrSource && n < lenStrToSearch; n++) {
        if (strSource[i + n] !== strToSearch[n]) {
          break ;
        }
        if (n + 1 === lenStrToSearch) {
          i += n;
          counter++;
        }
      }
    }
    return counter;
  }
  return 0;
}
letterCount();
