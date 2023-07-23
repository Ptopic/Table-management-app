const epxress = require('express');
const app = epxress();
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const expressJSDocSwagger = require('express-jsdoc-swagger');
const port = 3001;

const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests
	standardHeaders: true,
	legacyHeaders: false,
});

require('dotenv').config();

// Main router import

const appRouter = require('./routes/app');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(epxress.json());
app.use(cors());

// Rate limiter usage
app.use(limiter);

// Using main router
app.use('/api/manage', appRouter);
// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
