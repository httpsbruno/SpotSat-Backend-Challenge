import  * as express from 'express';
import routes from './routes';
import * as cookieParser from 'cookie-parser';
// import cors from 'cors';
// import fs from 'fs';
// import https from 'https';

const app = express();
app.use(cookieParser());
app.use(routes);

// const privateKey  = fs.readFileSync('certificate.key', 'utf8');
// const certificate = fs.readFileSync('certificate.crt', 'utf8');
// const credentials = { key: privateKey, cert: certificate };
// app.use(cors({ origin: true, credentials: true }));

//app.use(express.urlencoded({ extended: false }));
//app.use(express.json());

// app.use(express.static('/root/osArrematadores/alpha-multi-frontend/dist'));

export { app };
