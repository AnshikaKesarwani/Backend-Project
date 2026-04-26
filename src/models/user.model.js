import mongoose , {Schema} from 'mongoose'
import jwt from "jasonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        lowercase: true,
        index:true, // to make database searchable index: true optimises
        unique: true,
        trim: true
    },
    email: {
        type:String,
        required:true,
        unique: true,
        trim:true
        },
    fullname:{
        type:String,
        required:true,
        trim:true,
        index:true
    },
    avatar:{
        type:String, // cloudnary url
        required:true
    },
    coverImage:{
        type:String, // cloudnary url
        required:true
    },
    watchHistory:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Video"
    }],
    password:{
        type:String,
        required:true
    },
    refreshToken:{
        type:String
    }
        
    },{timestamps:true})

    // password encryption

    userSchema.pre("save" , async function(next){
        if(!this.isModified("password")) return next();
        this.password = bcrypt.hash(this.password , 10)
        next()
    })

    userSchema.methods.isPasswordCorrect = async function(password){
       return await  bcrypt.compare(password , this.password)
    }
    userSchema.methods.generateAccessToken = function(){
               return jwt.sign({
                _id: this._id,
                username:this.username,
                fullname:this.fullname,
                email:this.email

               }, process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn:process.env.ACCESS_TOKEN_EXPIRY
            })
    }
    userSchema.methods.generateRefreshToken = function(){
        return jwt.sign({
                _id: this._id,
               }, process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn:process.env.REFRESH_TOKEN_EXPIRY
            })
    }


    export const User = mongoose.model("User", userSchema); 