import 'reflect-metadata';
import express from 'express'
// import router from './routes/routes';
import cors from 'cors';
import cookieParser from 'cookie-parser';
// import errorMiddleware from './middlewares/errorMiddleware';
import { createConnection } from 'typeorm';


const app = express();

const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// app.use(router);
// app.use(errorMiddleware);

const start = async () => {
  try {
    app.listen(port, () => console.log(`server listening on port ${port}`));
  }
  catch (error) {
    console.error(error);
  }
}


createConnection({
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [
    __dirname + '/entity/*.ts'
  ]
}).then(start);