import { DataSource, LoggerOptions } from 'typeorm';

import { Post } from '../entities/example.entity';
import { Users } from '../entities/users.entity';

/** DataSource Config */
const connectionSource = new DataSource({
  type: 'sqlite', // cambiar entre sqlite (driver sqlite3) y better-sqlite3 (driver better-sqlite3) para que funcione

  logging: ['error'] as LoggerOptions,

  synchronize: true,
  name: 'default',

  // Declaracion de entidades, se debe agregar cada entidad que se cree
  entities: [
    Post, 
    Users
  ],
  database: 'src/database/database.sqlite',
});


export default connectionSource;
