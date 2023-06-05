import { ModelDefined, Optional } from "sequelize"
import { RolAttributes } from "../RolSchema"

export interface UserAttributes {
    id: number
    username: string
    password: string
    createdAt: string
    updatedAt: string
    roles?: RolAttributes | null
}
export type createUserAttributes = Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'>
export type UserSchemaType = ModelDefined<UserAttributes, createUserAttributes>
