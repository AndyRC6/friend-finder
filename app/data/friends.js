var mysql = require("mysql");

var pool = mysql.createPool({
  host: "us-cdbr-iron-east-05.cleardb.net",
  port: 3306,

  // Your username
  user: "b0d8e565c6b6bd",

  // Your password
  password: "61b97b8d",
  database: "heroku_bca3519087a4c94"
});

module.exports = pool;
