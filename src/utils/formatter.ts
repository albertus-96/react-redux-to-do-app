//formatter for showing date in table
export const formatDateTime = (val: string, dateOnly: boolean = false) => {
	const date = new Date(val);
	return dateOnly
		? `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`
		: `${('0' + date.getDate()).slice(-2)}-${('0' + (date.getMonth() + 1)).slice(
				-2
		  )}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
};
