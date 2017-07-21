import express from 'express';

import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import api from './routes/api';
import upload from './routes/upload';

const server = express();

server.use(logger('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cookieParser());

server.use('/api', api);
server.use('/upload', upload);

export default server;
