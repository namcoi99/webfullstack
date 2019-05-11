const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const QuestionModel = require("./models/questionModel");

mongoose.connect(
	"mongodb://localhost/quyet-de-21",
	{ useNewUrlParser: true },
	function(err) {
		if(err) console.log(err)
		else console.log("DB connect ok!");

		// QuestionModel.create({
		// 	content: "Hello",
		// }, function(err,docCreated){
		// 	if(err) console.log(err);
		// 	else console.log("Created!");
		// })
		// QuestionModel.find({}, function(err, docs) {
		// 	if(err) console.log(err)
		// 	else console.log("Questions: ", docs);
		// });
	}
);

app.use(bodyParser.urlencoded({extended: false}));

app.get('/jquery.js',function(req,res){
  res.sendFile(__dirname+'/jquery.js');
})

app.get('/',function(req,res){
  //get random question
  const questionList = JSON.parse(fs.readFileSync("./questions.json",{encoding:'utf-8'}));
  // 0 <= randomIndex < questionList.length
  const randomIndex = Math.floor(Math.random()*questionList.length);
  const question = questionList[randomIndex];
  // res.send(`
  //   <h1>${question.content}</h1>
  //   <div>
  //     <a href="/vote/${question.id}/no">
  //     <button>Sai / Không / Trái</button>
  //     </a>
  //     <a href="/vote/${question.id}/yes">
  //     <button>Đúng / Có/ Phải</button>
  //     </a>
  //   </div>
  //   <div>
  //     <button>Kết quả vote</button>
  //     <button>Câu hỏi khác</button>
  //   </div>
  // `);
  res.sendFile(__dirname+"/home.html");
})

//Kết quả vote
app.get("/question/:questionId/result",function(req,res){
  const {questionId} = req.params;
  const questionList = JSON.parse(fs.readFileSync("./questions.json",{encoding:'utf-8'}));
  res.send(`
    <h1>${questionList[questionId]["content"]}</h1>
    <ul>
      <li>${questionList[questionId].yes+questionList[questionId].no} vote</li>
      <li>yes:${questionList[questionId].yes}</li>
      <li>no:${questionList[questionId].no}</li>
    </ul>
    `);
})

app.get("/randomquestion",function(req,res){
  // const questionList = JSON.parse(fs.readFileSync("./questions.json",{encoding:'utf-8'}));
  // const randomIndex = Math.floor(Math.random()*questionList.length);
  // const question = questionList[randomIndex];
  // res.send(question);
  QuestionModel.count({}, (err, totalDoc) => {
		if(err) console.log(err)
		else {
			const randomIndex = Math.floor(Math.random()*totalDoc);
			QuestionModel
				.findOne({})
				.skip(randomIndex)
				.exec((err, question) => {
					if(err) console.log(err)
					else res.json(question);
				});
		}
	});
})

// /vote/1/yes
app.get("/vote/:questionId/:vote",function(req,res){
  const { questionId,vote } = req.params;

  // const questionList = JSON.parse(fs.readFileSync("./questions.json",{encoding:'utf-8'}));
  // questionList[questionId][vote]++;

  // fs.writeFileSync("./questions.json",JSON.stringify(questionList));

  // res.redirect(`/question/${questionId}/result`);
  
  // res.redirect("https://google.com.vn");
})

app.get('/ask',function(req,res){
  res.sendFile(__dirname + "/ask.html");
})

app.post('/addquestion',function(req,res){
  // const questionList = JSON.parse(fs.readFileSync("./questions.json",{encoding:'utf-8'}));
  // const {question} = req.body;
  // const newQuestion = {
  //   content: question,
  //   yes: 0,
  //   no: 0,
  //   id: questionList.length,
  // }
  // questionList.push(newQuestion);
  // fs.writeFileSync("./questions.json",JSON.stringify(questionList));
  // res.send("Success");
	const { question } = req.body;
	QuestionModel.create({
		content: question,
	}, function(err, docCreated) {
		if(err) console.log(err)
		else res.redirect("/");
	});
});

app.listen(6969,function(error){
  if(error) console.log(error);
  else console.log("Server start success!!!");
});
