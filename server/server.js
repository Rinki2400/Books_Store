const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();
const PORT = process.env.PORT || 2000;

// connect mongoose db
connectDB();
app.use(cors());
app.use(express.json());

app.use('/api',require('./router/Routes'));
app.use('/apibook',require('./router/bookRoutes'));
app.use('/apiUser',require('./router/Routes'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
