const mongoose=require('mongoose');

const QuestionAnswerSchema=mongoose.Schema({
    question:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    },
    questionType:{
        type:String,
        required:true
    },
    rank:{
        type:Number,
        required:false
    }
})

const QuestionAnswer=module.exports=mongoose.model('QuestionAnswer',QuestionAnswerSchema)