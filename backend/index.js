require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const cors = require('cors');
const connectDB = require('./db/connect');
const authroute = require('./routes/auth');

// middleware
app.use(cors());
app.use(express.json());

//image route
app.use('/uploads',express.static(__dirname +'/uploads'));

// user route - login, register
app.use('/api/v1/auth', authroute);

// connecting with database
const connect = async ()=>
{
    try
    {
        await connectDB(process.env.MONGO_URL);
        console.log("Database is Connected")
        app.listen(process.env.PORT,()=>
        {
            console.log(`Server is listening on Port ${process.env.PORT}`)
        })
    }
    catch(error){
        console.log(error);
    }
}
connect();