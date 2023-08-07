const db = require('../db/db');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { sendResponse } = require('../utils/helper');

// Create reservation
exports.createReservation = async (req, res) => {
	const {
		Firstname,
		Lastname,
		NumberOfPeople,
		ReservationDate,
		ReservationTime,
		ContactPhone,
	} = req.body;

	if (
		!Firstname ||
		!Lastname ||
		!NumberOfPeople ||
		!ReservationDate ||
		!ReservationTime ||
		!ContactPhone
	) {
		return sendResponse(400, 'Reservation data missing', res);
	}

	const insertQuery = `
	INSERT INTO Reservation
	(Firstname, Lastname, NumberOfPeople, ReservationDate, ReservationTime, ContactPhone) 
	VALUES
	("${Firstname}", "${Lastname}", "${NumberOfPeople}", "${ReservationDate}", "${ReservationTime}", "${ContactPhone}")
	`;

	db.query(insertQuery, (err, result) => {
		if (err) {
			return sendResponse(400, 'Failed to create reservation', res);
		}

		return res.status(200).send({
			success: true,
			msg: 'Created reservation',
			data: result.insertId,
		});
	});

	// Check if reservation already exists for given date and time

	// const checkIfExists = `
	// SELECT * FROM Reservation WHERE ReservationDate="${ReservationDate}" AND ReservationTime="${ReservationTime}"
	// `;

	// db.query(checkIfExists, (err, result) => {
	// 	if (err) {
	// 		return sendResponse(400, 'Failed to fetch reservation', res);
	// 	}

	// 	if (result.length > 0) {
	// 		return sendResponse(
	// 			400,
	// 			'Reservation with given date and time already exists',
	// 			res
	// 		);
	// 	}

	// });
};

// Delete reservation
exports.deleteReservation = async (req, res) => {
	const { ReservationId } = req.body;

	if (!ReservationId) {
		return sendResponse(400, 'Reservation id missing', res);
	}

	const deleteQuery = `
    DELETE FROM Reservation
    WHERE Id="${ReservationId}"
    `;

	db.query(deleteQuery, (err, result) => {
		if (err) {
			return sendResponse(400, 'Failed to delete reservation', res);
		}

		return res.status(200).send({ success: true, msg: `Deleted reservation` });
	});
};

// Update reservation (Check if time is at least 4 hours before reservation)
exports.updateReservation = async (req, res) => {
	const {
		ReservationId,
		Firstname,
		Lastname,
		NumberOfPeople,
		ReservationDate,
		ReservationTime,
		ContactPhone,
	} = req.body;

	if (
		!ReservationId ||
		!Firstname ||
		!Lastname ||
		!NumberOfPeople ||
		!ReservationDate ||
		!ReservationTime ||
		!ContactPhone
	) {
		console.log(req.body);
		return sendResponse(400, 'Reservation data missing', res);
	}

	const updateQuery = `
    UPDATE Reservation
    SET Firstname="${Firstname}", Lastname="${Lastname}", NumberOfPeople="${NumberOfPeople}", ReservationDate="${ReservationDate}", ReservationTime="${ReservationTime}", ContactPhone="${ContactPhone}"
    WHERE Id="${ReservationId}";
    `;

	db.query(updateQuery, (err, result) => {
		if (err) {
			return sendResponse(400, 'Failed to update reservation', res);
		}

		return res.status(200).send({ success: true, msg: `Updated reservation` });
	});
};

// Get all reservations without tables

exports.getAllReservationsWithoutTables = async (req, res) => {
	const selectQuery = `
	`;
};

// Get all reservations (Also get reservation table)

exports.getAllReservations = async (req, res) => {
	const selectQuery = `
	SELECT r.Id, r.FirstName, r.LastName, r.NumberOfPeople, r.ReservationDate, r.ReservationTime, r.ContactPhone, t.TableNumber, t.NumberOfSeats FROM ReservationTable rt
	JOIN Reservation r ON rt.ReservationId = r.Id
	JOIN Tables t ON rt.TableId = t.Id
    `;

	db.query(selectQuery, (err, result) => {
		if (err) {
			return sendResponse(400, 'Failed to fetch reservations', res);
		}

		if (result.length <= 0) {
			return sendResponse(404, 'No reservations', res);
		}

		return res.status(200).send({ success: true, msg: result });
	});
};

// Get all reservations for given date

exports.getAllReservationsByGivenDate = async (req, res) => {
	const { ReservationDate } = req.body;

	const selectQuery = `
	SELECT r.Id, r.FirstName, r.LastName, r.NumberOfPeople, r.ReservationDate, r.ReservationTime, r.ContactPhone, t.TableNumber, t.NumberOfSeats FROM ReservationTable rt
	JOIN Reservation r ON rt.ReservationId = r.Id
	JOIN Tables t ON rt.TableId = t.Id
	WHERE r.ReservationDate = "${ReservationDate}"
    `;

	db.query(selectQuery, (err, result) => {
		if (err) {
			return sendResponse(400, 'Failed to fetch reservations', res);
		}

		if (result.length <= 0) {
			return sendResponse(404, 'No reservations', res);
		}

		return res.status(200).send({ success: true, msg: result });
	});
};

// Get all reservations for given hour
// Assumes given date is todays date

exports.getAllReservationsByGivenTime = async (req, res) => {
	const { ReservationTime } = req.body;

	const selectQuery = `
	SELECT r.Id, r.FirstName, r.LastName, r.NumberOfPeople, r.ReservationDate, r.ReservationTime, r.ContactPhone, t.TableNumber, t.NumberOfSeats FROM ReservationTable rt
	JOIN Reservation r ON rt.ReservationId = r.Id
	JOIN Tables t ON rt.TableId = t.Id
	WHERE HOUR(r.ReservationTime)="${ReservationTime}"
    `;

	db.query(selectQuery, (err, result) => {
		if (err) {
			return sendResponse(400, 'Failed to fetch reservations', res);
		}

		if (result.length <= 0) {
			return sendResponse(404, 'No reservations', res);
		}

		return res.status(200).send({ success: true, msg: result });
	});
};

// Get all reservations for given date and time (time meaning hour)

exports.getAllReservationsByDateAndTime = async (req, res) => {
	const { ReservationDate, ReservationTime } = req.query;

	const selectQuery = `
	SELECT r.Id, r.FirstName, r.LastName, r.NumberOfPeople, r.ReservationDate, r.ReservationTime, r.ContactPhone, t.TableNumber, t.NumberOfSeats FROM ReservationTable rt
	JOIN Reservation r ON rt.ReservationId = r.Id
	JOIN Tables t ON rt.TableId = t.Id
	WHERE HOUR(r.ReservationTime)="${ReservationTime}" AND r.ReservationDate = "${ReservationDate}"
    `;

	db.query(selectQuery, (err, result) => {
		if (err) {
			return sendResponse(400, 'Failed to fetch reservations', res);
		}

		if (result.length <= 0) {
			return sendResponse(404, 'No reservations', res);
		}

		return res.status(200).send({ success: true, msg: result });
	});
};

// Add table to reservation (ReservationTable table in database)
// Called after creating reservation so check if reservation already exists when creating reservation
exports.addTableToReservation = async (req, res) => {
	// Check if table is already assigned in reservation for given time
	const { ReservationId, TableId } = req.body;

	// Check if reservation with that id already exists
	// Check if reservation already has assigned table

	const checkIfTableIsAlreadyAssigned = `
	SELECT * FROM ReservationTable WHERE ReservationId="${ReservationId}" AND TableId="${TableId}";
	`;

	db.query(checkIfTableIsAlreadyAssigned, (err, result) => {
		if (err) {
			return sendResponse(400, 'Failed to fetch reservations', res);
		}

		if (result.length > 0) {
			return sendResponse(
				400,
				'Table is already assigned to that reservation',
				res
			);
		}

		// Add table to reservation
		const assignTableToReservation = `
		INSERT INTO ReservationTable
		(ReservationId, TableId)
		VALUES
		(${ReservationId},${TableId})
		`;

		db.query(assignTableToReservation, (err, result) => {
			if (err) {
				return sendResponse(400, 'Failed to assign table to reservation', res);
			}

			return res.status(200).send({
				success: true,
				msg: `Table ${TableId} assigned to reservation`,
			});
		});
	});
};

// Remove a table from reservation (ReservationTable table in database)

exports.removeTableFromReservation = async (req, res) => {
	const { ReservationId, TableId } = req.body;

	const checkIfTableIsAlreadyAssigned = `
	SELECT * FROM ReservationTable WHERE ReservationId="${ReservationId}" AND TableId="${TableId}";
	`;

	db.query(checkIfTableIsAlreadyAssigned, (err, result) => {
		if (err) {
			return sendResponse(400, 'Failed to fetch reservations', res);
		}

		if (result.length <= 0) {
			return sendResponse(
				400,
				'That reservation and table combination do not exist',
				res
			);
		}

		// Remove table from reservation
		const assignTableToReservation = `
		DELETE FROM ReservationTable
		WHERE ReservationId="${ReservationId}" AND TableId="${TableId}"
		`;

		db.query(assignTableToReservation, (err, result) => {
			if (err) {
				return sendResponse(400, 'Failed to assign table to reservation', res);
			}

			return res.status(200).send({
				success: true,
				msg: `Table ${TableId} removed to reservation`,
			});
		});
	});
};

// // Get all reservation data (table and reservation from ReservationTable)

// exports.getAllReservationData = async (req, res) => {};
