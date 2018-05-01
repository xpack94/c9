var express=require("express");
var app =express();

var port= process.env.PORT || 5000 ;

app.use(express.static(__dirname));

app.get("/", function(req, res){
  res.send("helloo herokuudduu!");
});


app.listen((port), function(){
  console.log('listening on *:5000');
});