import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
// import ApiError from "../utilities/ApiError.js";
import bodyParser from "body-parser";
import ApiResponse from "../utilities/ApiResponse.js";
import path from "path";
import morgan from "morgan";
import userRouter from "../routes/user.routes.js";
import blogRouter from "../routes/blog.routes.js";
import photoRouter from "../routes/gallery.routes.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app=express();   
const allowedOrigin = 'http://localhost:5173';
app.set("trust proxy", true);

const corsOptions = {
  origin: allowedOrigin,
  credentials: true, // This allows cookies and credentials to be sent in cross-origin requests
  // optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));

app.use(morgan('dev'));

dotenv.config({
    path:"../.env"
});
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"))
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json({ limit: '50mb' })); // Adjust the limit as needed
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // Adjust the limit as needed

app.use("/api/v1/updates",blogRouter);
app.use("/api/v1/auth",userRouter);
// app.all("*",function(req,res){
//     throw new ApiError(404,"page not found");
// })

app.use("/api/v1/gallery",photoRouter)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});



export default app;
