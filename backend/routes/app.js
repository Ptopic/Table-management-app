const {
	createTable,
	deleteTable,
	getAllTables,
	getTableById,
	editTable,
} = require('../controllers/tables');

const {
	createReservation,
	deleteReservation,
	updateReservation,
	getAllReservationsWithoutTables,
	getAllReservations,
	getAllReservationsByGivenDate,
	getAllReservationsByGivenTime,
	getAllReservationsByDateAndTime,
	addTableToReservation,
	removeTableFromReservation,
	getAllReservationData,
} = require('../controllers/reservations');

const router = require('express').Router();

// Tables

router.post('/table', createTable);
router.put('/table', editTable);

router.delete('/table', deleteTable);

router.get('/get-tables', getAllTables);

router.get('/get-table', getTableById);

// Reservations

router.post('/reservation', createReservation);

router.delete('/reservation', deleteReservation);

router.put('/reservation', updateReservation);

// Fetch resercations

router.get('/reservations-without-tables', getAllReservationsWithoutTables);
router.get('/reservations', getAllReservations);
router.get('/reservations-date', getAllReservationsByGivenDate);
router.get('/reservations-time', getAllReservationsByGivenTime);
router.get('/reservations-datetime', getAllReservationsByDateAndTime);

// Reservation table

router.post('/reservation-table', addTableToReservation);

router.delete('/reservation-table', removeTableFromReservation);

// router.get('/reservation-table', getAllReservationData);

module.exports = router;
