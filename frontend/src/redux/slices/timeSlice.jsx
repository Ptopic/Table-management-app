import { createSlice } from '@reduxjs/toolkit';

var today = new Date();
var todayTime = today.getHours() + ':' + today.getMinutes();

export const timeSlice = createSlice({
	name: 'time',
	initialState: {
		value: todayTime,
	},
	reducers: {
		setTime: (state, action) => {
			state.value = action.payload;
		},
	},
});

export const { setTime } = timeSlice.actions;

export default timeSlice.reducer;
