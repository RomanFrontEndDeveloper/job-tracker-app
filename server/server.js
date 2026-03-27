const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true,
	}),
);

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
	res.json({ message: 'Job Tracker API is running' });
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
