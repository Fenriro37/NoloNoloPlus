const express = require('express');
const cors = require('cors');
const apiRouter = require('./api/index.js');
const indexRouter = require('./route/index.js');
const cookieParser = require('cookie-parser');

const corsOptions = {
  // origin: 'http://localhost:8080',
  origin: '*',
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Origin', 'Content-Type'],
  exposedHeaders: 'Set-Cookie',
  credentials: true,
  optionSuccessStatus: 200
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());

app.use('/api/', apiRouter);
app.use('/', indexRouter);

const PORT = process.env.PORT || 8081;
// const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});