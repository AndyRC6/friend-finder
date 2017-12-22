var mysql = require('../data/friends.js');



module.exports = function(app){
    app.get("/", function(request, response){

      mysql.getConnection(function(err, connection){
        if(err) throw err;
        connection.query("select * from friends", function(err, data){
          if(err){
            console.log(err);
            console.log("there was an error!");
          }
          response.render("index", {friendCount: data.length});
        })
      })
        
})
}