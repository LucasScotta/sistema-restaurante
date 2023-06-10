import { Model, Sequelize } from "sequelize";
import pg from 'pg';
import { UserSchema, RolSchema, ProductSchema } from "./models";
import { UserActionsDTO, UserCreation, UserDTO } from "../model";
import { IProduct, IProductDTO } from "../Store";

class Db {
    private connection: Sequelize | null = null
    private UserSchema = UserSchema
    private RolSchema = RolSchema
    private ProductSchema = ProductSchema
    constructor() {
        this.init()
        if (!this.connection) return
        this.syncTables()
    }
    init() {
        try {
            this.connection = new Sequelize('bussiness', 'admin', 'admin', {
                host: 'localhost',
                port: 7777,
                dialect: 'postgres',
                dialectModule: pg,
                logging: false
            })
        }
        catch (e) {
            throw new Error('Something went wrong connecting to DataBase')
        }
    }
    async syncTables() {
        const UserModel = this.UserSchema
        const RolModel = this.RolSchema
        const ProductSchema = this.ProductSchema

        UserModel.hasOne(RolModel, { foreignKey: 'userId', as: 'roles', sourceKey: 'id' })
        RolModel.belongsTo(UserModel, { foreignKey: 'userId', as: 'user', targetKey: 'id' })

        await UserModel.sync()
        await RolModel.sync()
        await ProductSchema.sync()
    }
    async createUser({ username, password, rol = 'waiter' }: UserCreation): Promise<UserDTO | Error> {
        const UserModel = this.UserSchema
        const RolModel = this.RolSchema
        try {
            const result = (await UserModel.create({
                username,
                password
            })).dataValues
            const { id } = result
            await RolModel.create({ userId: id, rol })
            return { id, username, rol }
        }
        catch (e) {
            return new Error('Username is already in use')
        }
    }
    async getByPassword({ username, password }: UserCreation): Promise<UserDTO | Error> {
        const UserModel = this.UserSchema

        try {
            const result = (await UserModel.findOne({
                where: {
                    username,
                    password
                },
                include: [
                    {
                        model: RolSchema,
                        as: 'roles',
                    },
                ],
            }))?.toJSON()

            if (!result || !result.roles) return new Error('Credentials are invalids')

            const { id } = result
            const { rol } = result.roles
            return { id, username, rol }
        }
        catch (error) {
            throw new Error('Something went wrong creating User, please try again')
        }
    }
    async deleteOne(id?: number, username?: string): Promise<boolean | Error> {
        if (!username && !id) return new Error('Forbbidden credentials, please supply username or user ID')
        try {
            const UserModel = this.UserSchema
            const result = await UserModel.destroy(id ? { where: { id } } : { where: { username } })
            return !!result
        } catch (error) {
            throw new Error('Something went wrong while executing query')
        }
    }
    async getAllUsers(): Promise<UserDTO[] | Error> {
        try {
            const userModel = this.UserSchema
            const results = await userModel.findAll({
                include: [
                    {
                        model: RolSchema,
                        as: 'roles',
                    },
                ],
            })
            return results.map((user): UserDTO => {
                const { id, username } = user.dataValues
                const rol = user.dataValues.roles?.rol
                return { id, username, rol: rol || 'waiter' }
            })
        }
        catch (err) {
            throw new Error('Something wrong while executing query')
        }
    }
    async updateById(id: number, newData: UserActionsDTO) {
        const { username, rol } = newData
        if (!username && !rol) return
        try {
            if (username) await this.UserSchema.update({ username }, { where: { id } })
            if (rol) await this.RolSchema.update({ rol }, { where: { userId: id } })
            return true
        }
        catch (e) {
            return new Error('Something went wrong updating the user, please try again')
        }
    }
    /**
     * 
     * @returns {Error | IProduct[]} Array or Error
     */
    async getProducts(): Promise<Error | IProduct[]> {
        try {
            const ProductSchema = this.ProductSchema
            const products = await ProductSchema.findAll()
            return products.map((product) => product.dataValues)
        }
        catch (e) {
            throw e
        }
    }
    async createProduct(product: IProductDTO): Promise<boolean | Error> {
        const productSchema = this.ProductSchema
        try {
            const { name, price } = product
            const resp = await productSchema.create({ name, price })
            return !!resp
        }
        catch (error) {
            return new Error('Product name already in use')
        }
    }
}

export const sequelize = new Db()
