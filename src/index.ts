import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose, { mongo } from 'mongoose';

import router from './router'

const app = express();

app.use(cors ({
    credentials: true,
}))

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

const server = http.createServer(app)

server.listen(5000, () => {
    console.log('server is running on http://localhost:5000/')
})

const MONGO_URL = 'mongodb+srv://mujtaba:1234@taskmanager.fjtnyns.mongodb.net/REST-API-CWA?retryWrites=true&w=majority'

mongoose.Promise = Promise
mongoose.connect(MONGO_URL)
mongoose.connection.on('error', (error: Error) => console.log(error))

app.use('/', router())