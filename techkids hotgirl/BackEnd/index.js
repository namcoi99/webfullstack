const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/tk-hotgirl-21',(err) => {
    if (err) console.log(err)
    else console.log("DB connect success!!");
})

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false }));

const userApiRouter = require('./routers/userApi');
app.use('/api/users',userApiRouter);

const postApiRouter = require('./routers/postApi');
app.use('/api/posts',postApiRouter);

app.listen(6969,function(err){
    if(err) console.log(err);
    else console.log("Server start success");
})