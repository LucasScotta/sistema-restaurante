import { Sequelize } from "sequelize";
import pg from 'pg';
import { User, Rol } from "./models";

class Db {
    private connection: Sequelize | null = null
    private User = User
    private Rol = Rol
    constructor() {
        this.init()
        if (!this.connection) return
        this.syncTables()
        this.getDunfu()
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
        const UserModel = this.User
        const RolModel = this.Rol
        UserModel.hasOne(RolModel)
        RolModel.belongsTo(UserModel, {
            targetKey: 'id',
            onUpdate: 'cascade',
            onDelete: 'cascade',
        })
        await UserModel.sync()
        await RolModel.sync()
    }
    async getDunfu() {
        const RolModel = this.Rol
        const user = await this.User.findOne({
            where: {
                username: 'dunfu'
            },
            include: { model: RolModel }
        })
        console.log(user?.dataValues)
    }
}

export const sequelize = new Db()
