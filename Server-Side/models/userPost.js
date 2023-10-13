const mongoose=require('mongoose');

const UserPostSchema=mongoose.Schema({
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
    userId:{
        type: String,
        required: false
    }
})

const UserPost=module.exports=mongoose.model('UserPost',UserPostSchema)