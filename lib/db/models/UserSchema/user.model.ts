import { ModelDefined, Optional } from "sequelize"

export interface UserAttributes {
    id: number
    username: string
    password: string
    createdAt: string
    updatedAt: string
}
export type createUserAttributes = Optional<UserAttributes, 'id'>
export type UserSchema = ModelDefined<UserAttributes, createUserAttributes>
