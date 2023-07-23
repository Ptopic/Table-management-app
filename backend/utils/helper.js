exports.sendResponse = (status, msg, res) => {
	if (status == 400) {
		return res.status(status).send({ success: false, error: msg });
	} else {
		return res.status(status).send({ success: true, data: msg });
	}
};
