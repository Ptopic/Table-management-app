const db = require('../db/db');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { sendResponse } = require('../utils/helper');

exports.createTable = async (req, res) => {
	const { tableNumber, numberOfSeats } = req.body;

	if (!tableNumber || !numberOfSeats) {
		return sendResponse(400, 'Table number or number of seats missing', res);
	}

	const createTableQuery = `INSERT INTO Tables
    (Id, TableNumber, NumberOfSeats)
    VALUES
    (${tableNumber}, ${tableNumber},${numberOfSeats})`;

	db.query(createTableQuery, (err, result) => {
		if (err) {
			return sendResponse(400, 'Failed to create table', res);
		}

		return res
			.status(200)
			.send({ success: true, msg: `Created table number ${tableNumber}` });
	});
};

exports.editTable = async (req, res) => {
	const { tableNumber, numberOfSeats } = req.body;

	if (!tableNumber || !numberOfSeats) {
		return sendResponse(400, 'Table number or number of seats missing', res);
	}

	const createTableQuery = `
	UPDATE Tables
    SET TableNumber="${tableNumber}", NumberOfSeats="${numberOfSeats}"
	WHERE Id="${tableNumber}"
	`;

	db.query(createTableQuery, (err, result) => {
		if (err) {
			return sendResponse(400, 'Failed to create table', res);
		}

		return res
			.status(200)
			.send({ success: true, msg: `Edited table number ${tableNumber}` });
	});
};

exports.deleteTable = async (req, res) => {
	const { tableNumber } = req.body;

	if (!tableNumber) {
		return sendResponse(400, 'Table number missing', res);
	}

	const deleteTableQuery = `DELETE FROM Tables
	WHERE TableNumber=${tableNumber};`;

	db.query(deleteTableQuery, (err, result) => {
		if (err) {
			return sendResponse(400, err, res);
		}

		return res
			.status(200)
			.send({ success: true, msg: `Deleted table with number ${tableNumber}` });
	});
};

exports.getAllTables = async (req, res) => {
	const selectTableQuery = `SELECT * FROM Tables;`;

	db.query(selectTableQuery, (err, result) => {
		if (err) {
			return sendResponse(400, err, res);
		}

		if (result <= 0) {
			return sendResponse(400, 'No tables to show please add some', res);
		}

		return res.status(200).send({ success: true, msg: result });
	});
};

exports.getTableById = async (req, res) => {
	const { tableNumber } = req.body;

	if (!tableNumber) {
		return sendResponse(400, 'Table number missing', res);
	}

	const selectTableQuery = `SELECT * FROM Tables WHERE TableNumber=${tableNumber};`;

	db.query(selectTableQuery, (err, result) => {
		if (err) {
			return sendResponse(400, 'Failed to fetch tables', res);
		}

		if (result <= 0) {
			return sendResponse(400, 'No tables to show please add some', res);
		}

		return res.status(200).send({ success: true, msg: result });
	});
};
