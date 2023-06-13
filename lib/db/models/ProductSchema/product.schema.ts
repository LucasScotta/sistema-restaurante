import { DataTypes, ModelDefined, Sequelize } from 'sequelize'
import pg from 'pg';
import { ProductSchemaType } from './product.models';


const sequelize = new Sequelize('bussiness', 'admin', 'admin', {
    host: 'localhost',
    port: 7777,
    dialect: 'postgres',
    dialectModule: pg,
    logging: false
})

export const ProductSchema: ProductSchemaType = sequelize.define('product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'product_id',
    },
    name: {
        type: DataTypes.STRING,
        unique: true
    },
    price: DataTypes.BIGINT

}, {
    timestamps: false,
})
