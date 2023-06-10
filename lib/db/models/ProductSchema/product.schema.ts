import { DataTypes, ModelDefined, Sequelize } from 'sequelize'
import pg from 'pg';
import { IProduct } from '../../../Store';

type ProductSchemaType = ModelDefined<IProduct, Omit<IProduct, 'id'>>

const sequelize = new Sequelize('bussiness', 'admin', 'admin', {
    host: 'localhost',
    port: 7777,
    dialect: 'postgres',
    dialectModule: pg,
    logging: false
})

export const ProductSchema: ProductSchemaType = sequelize.define('product', {
    productId: {
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
