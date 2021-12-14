const express = require('express');
const cors = require('cors');
const apiRouter = require('./api/index.js');
const indexRouter = require('./route/index.js');
const cookieParser = require('cookie-parser');

const corsOptions = {
  origin: ['*'],
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Accept',
    'Access-Control-Allow-Headers',  
    'Access-Control-Allow-Methods',
    'Access-Control-Allow-Origin',
    'Access-Control-Request-Headers',
    'Access-Control-Request-Method',
    'Authorization',
    'Content-Type', 
    'dataType',
    'Origin', 
    'withCredentials',
    'X-Requested-With'
  ],
  exposedHeaders: 'Set-Cookie',
  credentials: true,
  optionSuccessStatus: 200
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());

app.get('/test/', function(req, res) {
  res.status(200).send('Hello World from server');
})

app.use('/api/', apiRouter);
app.use('/', indexRouter);

const PORT = process.env.PORT || 8081;
// const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});