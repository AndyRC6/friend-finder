var mysql = require('../data/friends.js');

var difference = function (a, b) { return Math.abs(a - b); };


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
          connection.release();
        })
      })
        
})

    app.get("/survey", function(request, response){
      response.render("survey");
    })

    app.post("/find-friend", function(request, response){
      mysql.getConnection(function(err, connection){
        if(err) throw err;
        var myAnswers = request.body;
        var myArray = [];
        var theirArray = [];
        var smallestDiff = 1000;
        var smallestDiffId = 0;
        var smallestDiffJSON;

        //TODO: Clean this mess up...
        myArray.push(myAnswers.q1);
        myArray.push(myAnswers.q2);
        myArray.push(myAnswers.q3);
        myArray.push(myAnswers.q4);
        myArray.push(myAnswers.q5);
        myArray.push(myAnswers.q6);
        myArray.push(myAnswers.q7);
        myArray.push(myAnswers.q8);
        myArray.push(myAnswers.q9);
        myArray.push(myAnswers.q10);

        if(myAnswers.name === "" || myAnswers.img === ""){
          response.send("invalid");
        }
        else{
          
          connection.query("select * from friends", function(err, data){
            if(err) throw err;
            for(i = 0; i < data.length; i++){
              var theirId = data[i].id;
              var theirJSON = data[i];
              //TODO: Clean this mess up...
              theirArray.push(data[i].question1);
              theirArray.push(data[i].question2);
              theirArray.push(data[i].question3);
              theirArray.push(data[i].question4);
              theirArray.push(data[i].question5);
              theirArray.push(data[i].question6);
              theirArray.push(data[i].question7);
              theirArray.push(data[i].question8);
              theirArray.push(data[i].question9);
              theirArray.push(data[i].question10);
              
              var diff = 0;

              for(u = 0; u < theirArray.length; u++){
                diff = diff + difference(theirArray[u], myArray[u]);
              }

              if (diff < smallestDiff){
                smallestDiff = diff;
                smallestDiffId = theirId;
                smallestDiffJSON = theirJSON;
              }

              theirArray = [];

            }
            connection.query("insert into friends set ?", {name: myAnswers.name, 
              photo: myAnswers.img,
              question1: myAnswers.q1,
              question2: myAnswers.q2,
              question3: myAnswers.q3,
              question4: myAnswers.q4,
              question5: myAnswers.q5,
              question6: myAnswers.q6,
              question7: myAnswers.q7,
              question8: myAnswers.q8,
              question9: myAnswers.q9,
              question10: myAnswers.q10,
            }, function(err, results, fields){
              if(err) throw err;
            })
            response.json(smallestDiffJSON);
            connection.release();
            
          })
          
      }


      })
    })

}