//require("dotenv").config({path:'./env'})-->older version

import dotenv from "dotenv"
import {app} from "./app.js";
dotenv.config({
    path:'./env'
});
// import mongoose from 'mongoose';
// import {DB_NAME } from './constants'
import connectDB from './db/index.js';

console.log("MONGODB_URI:", process.env.MONGODB_URI);
console.log("PORT:", process.env.PORT);

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000 , ()=>{
        console.log(`App is listening on PORT:${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("MONGODB connection failed error!!",err);
})

// (async ()=>{
       
//  try{
//     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//     app.on("error" , (error)=>{
//         console.log("ERROR:" , error);
//             throw error
//     })
//     app.listen( process.env.PORT , ()=>{
//         console.log(`App is listening on port ${process.env.PORT}`);
//     })
//  }
//  catch(error){
//     console.log("ERROR:" , error)
//     throw error
//  }
// })()