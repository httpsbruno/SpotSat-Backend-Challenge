import  * as express from 'express';
import routes from './routes';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
// import fs from 'fs';
// import https from 'https';

const app = express();

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(cookieParser());
app.use(routes);

// const privateKey  = fs.readFileSync('certificate.key', 'utf8');
// const certificate = fs.readFileSync('certificate.crt', 'utf8');
// const credentials = { key: privateKey, cert: certificate };
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }));

//app.use(express.urlencoded({ extended: false }));
//app.use(express.json());

// app.use(express.static('/root/osArrematadores/alpha-multi-frontend/dist'));

export { app };
