export default {
  type: process.env.DB_TYPE || 'postgres',
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT || '5432'), //по-другому не хочет становиться числом
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  seeds: [__dirname + '/database/seeds/**/*{.ts,.js}'],
  factories: [__dirname + '/database/factories/**/*{.ts,.js}'],
  entities: [
    __dirname + '/entity/*.ts'
  ]
}

