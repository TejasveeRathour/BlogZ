require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const cors = require('cors');
const connectDB = require('./db/connect');
const authroute = require('./routes/auth');
const blogroute = require('./routes/blog');
const commentroute = require('./routes/comments');
const notificationroute = require('./routes/notification');
const errorHandlerMiddleware = require('./middleware/errorhandler');

// middleware
app.use(cors());
app.use(express.json());

//image route
app.use('/uploads',express.static(__dirname +'/uploads'));

// user route - login, register
app.use('/api/v1/auth', authroute);

// Blogs route
app.use('/api/v1/blog', blogroute);

//comment route
app.use('/api/v1/comments', commentroute);

//notification route
app.use('/api/v1/notification', notificationroute);

// Error Handle route
app.use(errorHandlerMiddleware);

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