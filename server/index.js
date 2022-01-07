import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose  from 'mongoose'
import Dataroute from './routes/Datarouter.js'
import dotenv from 'dotenv'


const app=express();

dotenv.config();

app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));


const PORT=process.env.PORT || 5000 ;

mongoose.connect(process.env.DATABASE_CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true},()=>{
    console.log("Connected to the database successfully...");
});


app.use('/data',Dataroute);


app.listen(PORT,()=>{
    console.log("Connected to the server at port 5000...");
})