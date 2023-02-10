(()=>{
	// Set countdown date & time
	const targetTime = new Date('2023-02-22T00:00:00').getTime();

	let time = {
		'days': '00',
		'hours': '00',
		'minutes': '00',
		'seconds': '00',
	};

	const countdown = {
		'days': {
			'back': document.querySelector('#days .countdown-value-back'),
			'top': document.querySelector('#days .countdown-value-top'),
			'bottom': document.querySelector('#days .countdown-value-bottom'),
		},
		'hours': {
			'back': document.querySelector('#hours .countdown-value-back'),
			'top': document.querySelector('#hours .countdown-value-top'),
			'bottom': document.querySelector('#hours .countdown-value-bottom'),
		},
		'minutes': {
			'back': document.querySelector('#minutes .countdown-value-back'),
			'top': document.querySelector('#minutes .countdown-value-top'),
			'bottom': document.querySelector('#minutes .countdown-value-bottom'),
		},
		'seconds': {
			'back': document.querySelector('#seconds .countdown-value-back'),
			'top': document.querySelector('#seconds .countdown-value-top'),
			'bottom': document.querySelector('#seconds .countdown-value-bottom'),
		},
	};

	function onFlipAnimEnd(e) {
		const parentId = e.target.parentNode.id;
		countdown[parentId]['back'].innerText = time[parentId];
		countdown[parentId]['top'].dataset.value = time[parentId];
		countdown[parentId]['top'].classList.remove('flip-top');
		countdown[parentId]['bottom'].dataset.value = time[parentId];
		countdown[parentId]['bottom'].classList.add('flip-bottom');
	}

	countdown.days.top.addEventListener('animationend', onFlipAnimEnd, false);
	countdown.hours.top.addEventListener('animationend', onFlipAnimEnd, false);
	countdown.minutes.top.addEventListener('animationend', onFlipAnimEnd, false);
	countdown.seconds.top.addEventListener('animationend', onFlipAnimEnd, false);

	function pad(num) {
		num = num.toString();
		while (num.length < 2) num = '0' + num;
		return num;
	}

	function updateTimeLeft() {
		const currentTime = new Date().getTime();
		const timeLeft = targetTime - currentTime;

		time.days = pad(Math.floor(timeLeft / (1000 * 60 * 60 * 24)));
		time.hours = pad(Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
		time.minutes = pad(Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)));
		time.seconds = pad(Math.floor((timeLeft % (1000 * 60)) / 1000));
	}

	function updatePage() {
		// Flip days
		if (countdown.days.top.dataset.value !== time.days) {
			countdown.days.bottom.classList.remove('flip-bottom');
			countdown.days.top.classList.add('flip-top');
		}
		// Flip hours
		if (countdown.hours.top.dataset.value !== time.hours) {
			countdown.hours.bottom.classList.remove('flip-bottom');
			countdown.hours.top.classList.add('flip-top');
		}
		// Flip minutes
		if (countdown.minutes.top.dataset.value !== time.minutes) {
			countdown.minutes.bottom.classList.remove('flip-bottom');
			countdown.minutes.top.classList.add('flip-top');
		}
		// Flip seconds
		countdown.seconds.bottom.classList.remove('flip-bottom');
		countdown.seconds.top.classList.add('flip-top');
	}

	function initPage() {
		updateTimeLeft();

		for (count in countdown) {
			countdown[count].back.innerText = time[count];
			countdown[count].bottom.dataset.value = time[count];
			countdown[count].top.dataset.value = time[count];
			countdown[count]['bottom'].classList.add('flip-bottom');
		}

		updatePage();
	}

	// Initialize page with starting values
	initPage();

	// Loop
	setInterval(() => {
		updateTimeLeft();
		updatePage();
	}, 1000);
})();