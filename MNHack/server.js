const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const NameModel = require("./NameModels");
app.use(bodyParser.urlencoded({extended:false}));
mongoose.connect(
  "mongodb://localhost/Score",
  {useNewUrlParser:true},
  function(err)
  {
    if(err) console.log(err);
    else console.log("Connect OK!");
  }
)

app.use('/',express.static(__dirname+'/'));

app.post('/games',function(req,res){
  const { name1, name2, name3, name4 } = req.body;
  console.log(name1);
  NameModel.create({
    name1: name1,
    name2: name2,
    name3: name3,
    name4: name4,
  },function(err,docCreated){
    if(err) console.log(err);
    else res.redirect('/');
  })
  // NameModel.create({
  //   name: name2,
  // },function(err,docCreated){
  //   if(err) console.log(err);
  //   else res.redirect('/');
  // })
  // NameModel.create({
  //   name: name3,
  // },function(err,docCreated){
  //   if(err) console.log(err);
  //   else res.redirect('/');
  // })
  // NameModel.create({
  //   name: name4,
  // },function(err,docCreated){
  //   if(err) console.log(err);
  //   else res.redirect('/');
  // })
})
app.get("/",function(req,res){
    res.sendFile(__dirname+"/create.html");
})

app.post("/games",function(req,res){
  const {name} = req.body;
  console.log(name);
  res.send(name);
})

app.listen(2020,function(error){
    if(error) console.log(error);
    else console.log("Server start success!!!");
});