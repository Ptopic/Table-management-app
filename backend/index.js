const epxress = require('express');
const app = epxress();
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const expressJSDocSwagger = require('express-jsdoc-swagger');
const port = 3001;

const { RateLimiterMemory } = require('rate-limiter-flexible');

const options = {
	points: 10000, // 6 points
	duration: 15 * 60, // Per second
};

const rateLimiter = new RateLimiterMemory(options);

const rateLimiterMiddleware = (req, res, next) => {
	rateLimiter
		.consume(req.ip)
		.then(() => {
			next();
		})
		.catch(() => {
			res.status(429).json({ message: TOO_MANY_REQUESTS_MESSAGE });
		});
};

require('dotenv').config();

// Main router import

const appRouter = require('./routes/app');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(epxress.json());
app.use(cors());

// Rate limiter usage
app.use(rateLimiterMiddleware);

// Using main router
app.use('/api/manage', appRouter);
// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
