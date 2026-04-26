import express from 'express'
import cors from "cors"
import cookieParser from 'cookie-parser'

const app = express();

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended:true,limit: "16kb"} ));
app.use(express.static("public"));
app.use(cookieParser())


//route import 

import userRouter from "./routes/user.router.js"
app.use("/api/v1/users" , userRouter)



export {app}

