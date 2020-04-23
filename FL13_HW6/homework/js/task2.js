let str = prompt('Enter a word');
if (str && str !== '' && str.trim() !== '') {
	let strLen = str.length;
	let center;
	if (strLen % 2 === 0) {
		center = strLen / 2 - 1;
		alert(`"${str[center]}${str[center + 1]}"`);
	} else {
		center = Math.floor(strLen / 2);
		alert(`"${str[center]}"`);
	}
} else {
	alert('Invalid value');
}