import express, { Request, Response } from 'express';
import config from './config/config';
import bodyParser from 'body-parser';
import cors from 'cors';
const port = config.server.port;

const app = express();

app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());
app.use(cors());

app.use()