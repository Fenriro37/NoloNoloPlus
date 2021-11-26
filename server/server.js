const express = require('express');
const cors = require('cors');
const apiRouter = require('./api/index.js');
const indexRouter = require('./route/index.js');
const cookieParser = require('cookie-parser');

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
  allowedHeaders: '*',
  exposedHeaders: '*'
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());

app.use('/api/', apiRouter);
app.use('/', indexRouter);

app.get('/test/', function(req, res) {
  res.cookie('name', 'express').send('cookie set'); //Sets name = express
})

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});