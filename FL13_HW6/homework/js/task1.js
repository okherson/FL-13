let check = prompt('Pleace enter a check value');
let tip = prompt('Pleace enter a tip persentage');
let currencySymbols = ['$', '₴', '€', '£', '¥', '₽'];
if (check && isNaN(check[check.length - 1]) && currencySymbols.indexOf(check[check.length - 1]) !== -1) {
	check = check.replace(check[check.length - 1], '');
}
if (tip && isNaN(tip[tip.length - 1]) && tip[tip.length - 1] === '%') {
	tip = tip.replace(tip[tip.length - 1], '');
}
check =+ check;
tip =+ tip;
if (check && tip && !isNaN(check) && !isNaN(tip) && tip >= 0 && tip <= 100 && check >= 0) {
	let roundNumber = 2;
	let tipAmount = check * tip / 100;
	let totalSum = check + tipAmount;
	alert(`Check number: ${check.toFixed(roundNumber)}
Tip: ${tip.toFixed(roundNumber)}%
Tip amount: ${tipAmount.toFixed(roundNumber)}
Total sum to pay: ${totalSum.toFixed(roundNumber)}`);
} else {
	alert('Invalid input data');
}