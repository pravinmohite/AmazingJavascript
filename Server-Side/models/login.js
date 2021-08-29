const mongoose=require('mongoose');

const LoginSchema=mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const Login=module.exports=mongoose.model('Login',LoginSchema)