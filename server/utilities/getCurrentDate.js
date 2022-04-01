const { format } = require('date-fns');

const getCurrentDate = () => {
	const date = new Date();
	return format(date, 'EEEE yyyy-MM-dd HH:mm:ss');
}

module.exports = getCurrentDate;
