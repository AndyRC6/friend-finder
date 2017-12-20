//===============Boiler Plate=================
var express = require('express');
var mysql = require('mysql');
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");

app = express();

var port = process.env.port || 3000;

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./app/routing/htmlroutes.js')(app);


app.listen(port);
