var pg=require("pg");
var http = require('http'),
    fs = require('fs');
    
var conString = "postgres://postgres:hacker9494@localhost:5432/postgres";
var client = new pg.Client(conString);
client.connect();

var x=1;

while (x > 0) {
    var q=client.query("select * from emp");
    console.log(q);
    x = x - 1;
}
  
  connection.query(q,function(err,results){
    if(err){
     console.log(err);
    }
    console.log(results);
  });
 