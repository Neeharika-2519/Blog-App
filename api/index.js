import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.route.js';
import commentRoutes from './routes/comment.route.js';
import postRoutes from './routes/post.route.js';
import userRoutes from './routes/user.route.js';

dotenv.config({path:'../.env'});
console.log('JWT_SECRET:', process.env.JWT_SECRET);

mongoose.connect('mongodb://127.0.0.1:27017/blog',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log('MongoDb is Connected...')
})

const app=express();
app.use(express.json());
app.use(cookieParser())

app.use('/api/auth',authRoutes);
app.use('/api/user',userRoutes);
app.use('/api/post',postRoutes);
app.use('/api/comment',commentRoutes);

app.listen(3000,()=>{
    console.log('Server is running on 3000...')
})

app.use((err, req, res, next)=>{
    const statusCode=err.statusCode || 500;
    const message=err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})