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
    },
    isAdmin: {
        type:Boolean,
        required: false
    },
    isApproved: {
        type: Boolean,
        required: false
    },
})

const UserPost=module.exports=mongoose.model('UserPost',UserPostSchema)