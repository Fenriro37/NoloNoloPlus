const express = require('express');
const cors = require('cors');
const apiRouter = require('./api/index.js');
const indexRouter = require('./route/index.js');

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use('/api/', apiRouter);
app.use('/', indexRouter);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});