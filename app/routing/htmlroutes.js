var connection = require('../data/friends.js');


module.exports = function(app){
    app.get("/", function(request, response){
        connection.connect(function(err) {
            if (err) throw err;
            console.log("connected as id " + connection.threadId);
          });

          connection.query("select * from friends", function(err, data){
            console.log(data);
            connection.destroy();
            response.render('index');
          })
        
})
}