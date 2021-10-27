const express = require('express');
const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");
const config = require("./config.js")
const apiRouter = require('./route/api.js')
const authMiddleware = require('./route/auth.js')
const cors = require('cors')
const path = require('path')
const funzionarioPath = __dirname + '/client/dist/';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(funzionarioPath));
app.use('/auth/', authMiddleware);
app.use('/api/', apiRouter);

app.use("/", express.static(path.join(__dirname, "/client/public/html")))
app.use("/js/", express.static(path.join(__dirname, "/client/public/js")))
app.use("/css/", express.static(path.join(__dirname, "/client/public/css")))
app.use("/media/", express.static(path.join(__dirname, "/client/public/media")))

app.get('/', function (req, res) {
    res.sendFile(funzionarioPath + "index.html");
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});