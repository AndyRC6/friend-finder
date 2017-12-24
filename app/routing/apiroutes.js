var mysql = require('../data/friends.js');

module.exports = function(app){
    app.get("/api/allfriends", function(request, response){

        mysql.getConnection(function(err, connection){
            if(err) throw err;
            
            connection.query("select * from friends", function(err, data){
                if(err) throw err;
                response.json(data);
                connection.release();
            })
        })
    })
}