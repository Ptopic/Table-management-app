const {
	createTable,
	deleteTable,
	getAllTables,
	getTableById,
} = require('../controllers/tables');

const router = require('express').Router();

router.post('/create-table', createTable);

router.delete('/delete-table', deleteTable);

router.get('/get-tables', getAllTables);

router.get('/get-table', getTableById);

module.exports = router;
