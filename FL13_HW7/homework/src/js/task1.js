let currentTime;
let goodDay = 'Good day, dear ';
let goodNight = 'Good evening, dear ';
let login = prompt('Enter your login:');
if (!login) {
	alert('Canceled.')
} else {
	if (login.length < 4) {
		alert('I don\'t know any users having name length less than 4 symbols');
	} else {
		if (login === 'User' || login === 'Admin') {
			let password = prompt('Pleace enter a password');
			if (!password) {
				alert('Canceled');
			} else {
				if (login === 'User' && password === 'UserPass') {
					currentTime = new Date().getHours();
					currentTime >= 8 && currentTime < 20 ? alert(goodDay + 'User!') : alert(goodNight + 'User!');
				} else if (login === 'Admin' && password === 'RootPass') {
					currentTime = new Date().getHours();
					currentTime >= 8 && currentTime < 20 ? alert(goodDay + 'Admin!') : alert(goodNight + 'Admin!');
				} else {
					alert('Wrong password');
				}
			}
		} else {
			alert('I don\'t know you');
		}
	}
}
