const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const mySignUp = require("./scripts/signUp.js")

let app = express()

app.use(express.json());
app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "/public/html")))
app.use("/js/", express.static(path.join(__dirname, "/public/js")))
app.use("/css/", express.static(path.join(__dirname, "/public/css")))

app.use("/signUp", mySignUp);

app.listen(8000, function() {
	console.log(`App listening on port 8000.` )
})