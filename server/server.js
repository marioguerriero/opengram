import express from 'express';

import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import api from './routes/api';
import upload from './routes/upload';

import config from './config';

import mongoose from 'mongoose';

mongoose.connect(config.dbhost, { useMongoClient: true }); // Open database connection

const server = express();

server.use(logger('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cookieParser());

server.use('/api', api);
server.use('/upload', upload);

// Error handling middleware
server.use(function (err, req, res, next) {
  if(!(req.body.token || req.query.token || req.headers['x-access-token']))
    return res.sendStatus(401); // Unauthorized
  next('route');
});

export default server;
