var express=require('express');
var mongoose=require('mongoose');
var bodyparser=require('body-parser');
var cors=require('cors');
var path=require('path');

var app=express();

const route=require('./routes/route');

//connect to mongodbm
mongoose.connect('mongodb://localhost:27017/questionAnswers');

//on connection
mongoose.connection.on('connected',()=>{
  console.log('connected to database mongodb @27017');
})

//error callback
mongoose.connection.on('error',(err)=>{
  console.log('error during connection to mongodb:',err);
})

const port=3000;

const app_folder = './../Client_EditableQuestionsAnswers/dist/sample-task';

//cors
app.use(cors());

//body-parser
app.use(bodyparser.json());

//static files
app.use(express.static('./../Client_EditableQuestionsAnswers/dist'));

app.use('/api',route);

app.get('*.*', express.static(app_folder, {maxAge: '2y'}));

app.get('*',(req,res) => {
       res.status(200).sendFile('/',{root: app_folder});
});

app.listen(port,()=>{
  console.log('server started at port:'+port);   
})