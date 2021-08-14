import express from 'express';
import router from './routes';
import mongoose from 'mongoose';
require('dotenv').config();

const server = express();

server.use(router);

server.listen(process.env.PORT, async () => {
    mongoose.connect(process.env.MONGO_SERVER || '', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: true
    }).then(() => {
        console.info('MongoDB is connected');
    }).catch(() => console.info('MongoDB is not connected'));
    console.info(`Server is running at ${process.env.PORT}`);
});