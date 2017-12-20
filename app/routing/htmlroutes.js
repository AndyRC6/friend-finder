var connection = require('../data/friends.js');
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
  });

module.exports = function(app){
    app.get("/", function(request, response){
        connection.query("select * from friends", function(err, data){
            console.log(data);
        })
        response.render('index');
    })
}