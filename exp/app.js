var express = require('express');
var pg=require("pg");
var http = require('http'),
    fs = require('fs');
var mysql=require("mysql");
var app = express();


var conString = "postgres://postgres:hacker9494@localhost:5432/postgres";
var client = new pg.Client(conString);
client.connect();
//var pgp = require('pg-promise')

// var connection = mysql.createConnection({
//  host:'localhost',
//  user:'xpack',
//  database:'postgres',
//  password:'azert'
// });


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
 
 
app.get("/home", function(req, res){
  fs.readFile( '/home/ubuntu/workspace/home.html', 'utf8', function(err, text){
        console.log("worked");
        res.send(text);
    })
});
 

 
app.listen(8080, function () {
 console.log('App listening on port 8080!');
});