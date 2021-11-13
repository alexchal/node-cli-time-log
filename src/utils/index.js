const getDayName = (dateString) => {
	const [date, options] = [new Date(dateString), { weekday: 'long' }];
	return new Intl.DateTimeFormat('en-Us', options).format(date);
}

const weekDaysChoices = () => {
	const curr = new Date;
	const week = [];

	for (let i = 1; i <= 5; i++) {
		const first = curr.getDate() - curr.getDay() + i;
		const date = new Date(curr.setDate(first)).toISOString().slice(0, 10);
		const fullDay = `${getDayName(date)} ${date}`;
		week.push(fullDay);
	}
	return week;
}

module.exports = {
	weekDaysChoices,
}