let gameAgreement = confirm('Do you want to play a game?');
let possiblePrize = ['25', '50', '100'];
let maxNumber = 5;
let multiplier = 1;
let totalPrize = 0;
let won, userNumber, attempt;

if (gameAgreement) {
	while (gameAgreement) {
		won = 0;
		attempt = 2;
		let numberToGuess = Math.floor(Math.random() * (maxNumber + 1));
		while (attempt >= 0) {
			userNumber = prompt(`Choose a roulette pocket number from 0 to ${maxNumber}
Attempts left: ${attempt + 1}
Total prize: ${totalPrize}$
Possible prize on current attempt: ${possiblePrize[attempt] * multiplier}$`);
			userNumber = userNumber ? + userNumber : null;
			if (userNumber === numberToGuess) {
				won = 1;
				break ;
			}
			attempt--;
		}
		if (won === 1) {
			totalPrize += possiblePrize[attempt] * multiplier;
			if (confirm(`Congratulation, you won! Your prize is: ${possiblePrize[attempt] * multiplier}$.
Do you want to continue?`)) {
				maxNumber += 5;
				multiplier *= 2;
				continue;	
			}
		}
		alert(`Thank you for your participation. Your prize is: ${totalPrize}$`);
		gameAgreement = confirm('Do you want to play again?');
		if (gameAgreement) {
			multiplier = 1;
			maxNumber = 5;
			totalPrize = 0;
		}
	} 
} else {
	alert('You did not become a billionaire, but can.');
}
