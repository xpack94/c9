var express = require('express');
var pg=require("pg");
var http = require('http'),
    fs = require('fs');
var mysql=require("mysql");
var app = express();
var conString = "postgres://postgres:hacker9494@localhost:5432/postgres";
var client = new pg.Client(conString);
var path = require('path');
client.connect();

app.use(express.static(path.join(__dirname, 'public')));

// var x=1;

// while (x > 0) {
//     client.query("INSERT INTO emp(empno, ename,job,mgr,hiredate,sal,comm,deptno) values(7999,'allen','CLERK',7839,'1980/12/25',1000,300,20)");
//     x = x - 1;
// }
 // var q="select count(*) from emp";
 // connection.query(q,function(err,results){
 //   if(err){
 //    console.log(err);
 //   }
 //   console.log(results);
 // });
 
//  app.set("view options", {layout: false});
// app.use(express.static(__dirname + '/public'));
 
 content =client.query("select * from emp",function(err,results){
   content=[];
    for(var i=0;i<results["rows"].length;i++){
            content.push(results["rows"][i]["ename"]);

          }
          return content;
 });
app.get("/home", function(req, res){
  res.render("/home/ubuntu/workspace/exp/views/home.ejs",{
    content:content
  });
  
  
  // fs.readFile( '/home/ubuntu/workspace/exp/views/home.html', 'utf8', function(err, text){
    
    
    
  //       client.query("select * from emp",function(err,results){
  //         for(var i=0;i<results["rows"].length;i++){
  //           console.log(results["rows"][i]);
  //         }
  //       });
  //       res.send(text);
  //  });
    
});
app.get("/", function(req, res){
  res.send("helloo herokuudduu!");
});
 

 
// app.listen(5000, function () {
//  console.log('App listening on port 8080!');
// });

app.listen((process.env.PORT || 5000), function(){
  console.log('listening on *:5000');
});