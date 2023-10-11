const mongoose=require('mongoose');

const LoginSchema=mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword: {
        type: String,
        required: false
    },
    isAdmin: {
        type:Boolean,
        required: false
    },
})

const Login=module.exports=mongoose.model('Login',LoginSchema)