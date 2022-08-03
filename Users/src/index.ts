import express, { application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import config from './config/config';
import cors from 'cors';
import routes from './routes/user_routes';
const port = config.server.port;

const app = express();

app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/', routes);


app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
