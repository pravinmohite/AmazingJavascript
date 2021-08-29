const mongoose=require('mongoose');

const QuestionTypeSchema=mongoose.Schema({
    questionType:{
        type:String,
        required:true
    },
})

const QuestionType=module.exports=mongoose.model('QuestionType',QuestionTypeSchema)