import { Sequelize } from "sequelize";
import pg from 'pg';
import { UserSchema, RolSchema } from "./models";
import { UserCreation } from "../model";
import { User, UserDTO } from "../model";

class Db {
    private connection: Sequelize | null = null
    private UserSchema = UserSchema
    private RolSchema = RolSchema
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
        UserModel.hasOne(RolModel)
        RolModel.belongsTo(UserModel, {
            targetKey: 'id',
            onUpdate: 'cascade',
            onDelete: 'cascade',
        })
        await UserModel.sync()
        await RolModel.sync()
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
}

export const sequelize = new Db()
