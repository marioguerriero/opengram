import express from 'express';

import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import api from './routes/api';
import upload from './routes/upload';
import view from './routes/view';

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/../public')));

app.set('views', path.join(__dirname, '/../app'));
app.set('view engine', 'hbs');

app.use('/api', api);
app.use('/upload', upload);
app.use('/', view);

app.use(express.static('public'));

export default app;
