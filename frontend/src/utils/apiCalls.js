import client from '../api/client';

const catchError = (error) => {
	if (error?.response?.data) {
		return error.response.data;
	} else {
		return { success: false, error: error.message };
	}
};

export const getTables = async () => {
	try {
		const { data } = await client.get('/manage/get-tables');
		return data;
	} catch (error) {
		return catchError(error);
	}
};

export const addNewTable = async (values) => {
	try {
		const { data } = await client.post('/manage/table', {
			...values,
		});
		return data;
	} catch (error) {
		return catchError(error);
	}
};

export const editTableData = async (values) => {
	try {
		const { data } = await client.put('/manage/table', {
			...values,
		});
		return data;
	} catch (error) {
		return catchError(error);
	}
};

export const deleteTable = async (tableId) => {
	try {
		console.log(tableId);
		const { data } = await client.delete('/manage/table', {
			data: { tableNumber: tableId },
		});
		return data;
	} catch (error) {
		return catchError(error);
	}
};

export const getReservations = async (date, time) => {
	try {
		console.log(date);
		console.log(time);
		const { data } = await client.get('/manage/reservations-datetime', {
			params: { ReservationDate: date, ReservationTime: time },
		});
		return data;
	} catch (error) {
		return catchError(error);
	}
};
