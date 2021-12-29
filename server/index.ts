import 'reflect-metadata';
import express from 'express'
import router from './routes/routes';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import errorMiddleware from './middlewares/errorMiddleware';
import { createConnection } from 'typeorm';
import { queryParser } from 'express-query-parser';

export const app = express();

const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(queryParser({
  parseNull: true,
  parseUndefined: true,
  parseBoolean: true,
  parseNumber: true
}));
app.use(router);
app.use(errorMiddleware);

const start = async () => {
  try {
    app.listen(port, () => {
      console.clear();
      console.log(`server listening on port ${port}`)
  });
  }
  catch (error) {
    console.error(error);
  }
}


createConnection().then(start);

// createConnection({
//   type: 'postgres',
//   host: '127.0.0.1',
//   port: parseInt(process.env.DB_PORT || '5432'), //по-другому не хочет становиться числом
//   username: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   synchronize: true,
//   logging: false,
//   // seeds: ['database/seeds/**/*{.ts,.js}'],
//   // factories: ['database/factories/**/*{.ts,.js}'],
//   entities: [
//     __dirname + '/entity/*.ts'
//   ]
// }).then(start);
