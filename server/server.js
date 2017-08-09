import express from 'express';

import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import api from './routes/api';

import config from './config';

import mongoose from 'mongoose';

mongoose.connect(config.dbhost, { useMongoClient: true }); // Open database connection

const server = express();

server.use(logger('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cookieParser());

server.use('/api', api);

export default server;
