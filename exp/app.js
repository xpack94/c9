var express = require('express');
var pg=require("pg");
var http = require('http'),
    fs = require('fs');
var mysql=require("mysql");
var bodyParser=require("body-parser");
var sessions=require("express-session");
var app = express();
var conString = "postgres://postgres:hacker9494@localhost:5432/postgres";
var client = new pg.Client(conString);
var path = require('path');

client.connect();
var session;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(sessions({
  secret:'this is a secret pass',
  resave:false,
  saveUnitialized:true
}));



app.use(express.static(path.join(__dirname, 'public')));

        //getting all the products from database
        var content=client.query("select * from objet,membre where objet.id_annonceur=membre.id_membre  ",function(err,results){
        content=[];
        for(var i=0;i<results["rows"].length;i++){
            content.push(results["rows"][i]);
            
          }
         
          return content;
        });
        
        
         //getting véhicules  products from database
        var véhicules=client.query("select * from Véhicule,membre,objet where Véhicule.id_objet=objet.id_objet and objet.id_annonceur=membre.id_membre ",function(err,results){
        véhicules=[];
        for(var i=0;i<results["rows"].length;i++){
            véhicules.push(results["rows"][i]);
          }
         
          return véhicules;
        });
        
        
         //getting alimentations  products from database
        var alimentations=client.query("select * from Alimentation,objet,membre where Alimentation.id_objet=objet.id_objet and objet.id_annonceur=membre.id_membre  ",function(err,results){
        alimentations=[];
        for(var i=0;i<results["rows"].length;i++){
            alimentations.push(results["rows"][i]);
           
          }
         
          return alimentations;
        });

     //getting meubles products from database
        var meubles=client.query("select * from meuble,objet,membre where meuble.id_objet=objet.id_objet and objet.id_annonceur=membre.id_membre  ",function(err,results){
        meubles=[];
        for(var i=0;i<results["rows"].length;i++){
            meubles.push(results["rows"][i]);

          }
         
          return meubles;
        });


     //getting vétements  products from database
        var vetements=client.query("select * from Vetement,objet,membre where Vetement.id_objet=objet.id_objet and objet.id_annonceur=membre.id_membre  ",function(err,results){
        vetements=[];
        for(var i=0;i<results["rows"].length;i++){
            vetements.push(results["rows"][i]);
          }
         
          return vetements;
        });


 //home route
app.get("/home", function(req, res){
   
  
  res.render("/home/ubuntu/workspace/exp/views/home.ejs",{
    
    content:content
  });
  
});
//alimentations route
app.get("/alimentations", function(req, res){
   
  res.render("/home/ubuntu/workspace/exp/views/alimentations.ejs",{
    
    content:alimentations
  });
 
});

//meubles route
app.get("/meubles", function(req, res){
   

  res.render("/home/ubuntu/workspace/exp/views/meubles.ejs",{
    
    content:meubles
  });
  
});

//véhicules route
app.get("/vehicules", function(req, res){
   
  res.render("/home/ubuntu/workspace/exp/views/vehicules.ejs",{
    
    content:véhicules
  });
  
});
//vetements route
app.get("/vetements", function(req, res){
   

  res.render("/home/ubuntu/workspace/exp/views/vetements.ejs",{
    
    content:vetements
  });
  
});

app.get("/", function(req, res){
  res.render("/home/ubuntu/workspace/exp/views/main.ejs");
});

app.get("/login", function(req, res){
  res.render("/home/ubuntu/workspace/exp/views/login.ejs");
});

 //login post form
app.post("/login", function(req, res){
  
  //res.end(JSON.stringify(req.body));
   isUser(req.body.username,req.body.password,function(result){
    if (result){
       sessions.id=req.body.username; 
       
    }
   res.redirect("/home");
      
  });

  
});

app.get("/logout", function(req, res){
  req.session.destroy(function(err){
   
    res.redirect("/");
  })
  
});

function isUser(username,password,retour){
  

   return client.query("select * from membre  ",function(err,results){
        for(var i=0;i<results["rows"].length;i++){
         
          if(results["rows"][i]["username"]==username && results["rows"][i]["motdepass"]==password){
              retour(true);
            }
          }
         
        });
      
  
};

app.listen((process.env.PORT || 5000), function(){
  console.log('listening on *:5000');
});