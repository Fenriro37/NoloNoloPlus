const express = require('express');
const cors = require('cors');

const apiRouter = require('./route/api.js');
const indexRouter = require('./route/index.js')
const authMiddleware = require('./route/auth.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(authMiddleware);

app.use('/', indexRouter);
app.use('/api/', apiRouter);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});