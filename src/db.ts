import { DynamicModule } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './user/user.entity';


const CreateDBIfNotExists = async (options: DataSourceOptions, database: string): Promise<void> => {
    const db = new DataSource(options);
    await db.initialize()
    const result = await db.manager.query(`SELECT SCHEMA_NAME
    FROM INFORMATION_SCHEMA.SCHEMATA
   WHERE SCHEMA_NAME = '${database}';`);

    if (result.length === 0) await db.manager.query(`CREATE DATABASE ${database};`);
    // myDataSource.getRepository(UserEntity)
    db.destroy();
};

const DBConfig = async (database: string): Promise<DynamicModule> => {
    let options: DataSourceOptions = {
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'nafth1998&',
        database: 'sys',
        entities: [User], // Tables
        synchronize: true, // alter: true
    };

    await CreateDBIfNotExists(options, database);


    return TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'nafth1998&',
        database,
        entities: [User], // Tables
        synchronize: true, // alter: true
        
    }); // forRoot makes the orm sit beside app module
};

export default DBConfig;