import { DataTypes, Sequelize } from 'sequelize'
import pg from 'pg';
import { RolSchemaType } from './rol.models';

const sequelize = new Sequelize('bussiness', 'admin', 'admin', {
    host: 'localhost',
    port: 7777,
    dialect: 'postgres',
    dialectModule: pg,
    logging: false
})

export const RolSchema: RolSchemaType = sequelize.define('role', {
    userId: {
        type: DataTypes.BIGINT,
        unique: true,
        primaryKey: true,
        field: 'user_id',
    },
    rol: {
        type: DataTypes.ENUM,
        defaultValue: 'waiter',
        values: ['waiter', 'chef', 'admin'],
    }
}, {
    timestamps: false,
})
