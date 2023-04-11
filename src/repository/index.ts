import { Client } from 'pg';
import { config } from '../config';

class PostgresDB {
  protected client: Client;

  public constructor() {
    this.client = new Client({
      user: config.POSTGRES.USER,
      host: config.POSTGRES.HOST,
      database: config.POSTGRES.DATABASE,
      password: config.POSTGRES.PASSWORD,
      port: Number(config.POSTGRES.DBPORT),
    });
  }
}

export { PostgresDB };