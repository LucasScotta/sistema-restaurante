import { DataTypes, Sequelize } from "sequelize";
import pg from 'pg';
import { UserSchema } from "./user.model";

const sequelize = new Sequelize('bussiness', 'admin', 'admin', {
    host: 'localhost',
    port: 7777,
    dialect: 'postgres',
    dialectModule: pg,
    logging: false
})

export const User: UserSchema = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
    },
    password: DataTypes.STRING,
    createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.fn("NOW")
    },
    updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
        allowNull: true
    },
})
