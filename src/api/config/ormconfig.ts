import { join } from 'path';
import { DataSource, LoggerOptions } from 'typeorm';

import { Post } from '../entities/prueba.entity';
import { Users } from '../entities/users.entity';

/** DataSource Config */
const connectionSource = new DataSource({
  type: 'better-sqlite3',

  logging: ['error'] as LoggerOptions,

  synchronize: true,
  name: 'default',
  entities: [
    Post, 
    Users
  ],
  database: 'src/database/database.sqlite',
});


export default connectionSource;
