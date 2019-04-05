const express = require('express');
const app = express();
const fs = require('fs');

app.get('/',function(req,res){
  console.log(__dirname);
  res.sendFile(__dirname+"/HW3.html");
})

app.get('/:Web',function (req,res) {
  const Web = req.params.Web;
  try{
    const data = JSON.parse(fs.readFileSync(__dirname + "/data/" + Web +".json",{encoding: 'utf-8'}));
    var output = '<ul style="font-size: 3rem; margin: 2rem;">';
    data.forEach(function(name){
      output+='<li>' + name + '</li>';
    });
    output += '</ul>';
    res.send(output);
  } catch (error) {
    console.log(error);
  }
})

app.listen(1234,function(error){
  if(error) console.log(error);
  else console.log("Server start success!");
});
