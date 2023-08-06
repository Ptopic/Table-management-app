import { configureStore } from '@reduxjs/toolkit';
import dateSlice from './slices/dateSlice';
import timeSlice from './slices/timeSlice';

export default configureStore({
	reducer: {
		date: dateSlice,
		time: timeSlice,
	},
});
