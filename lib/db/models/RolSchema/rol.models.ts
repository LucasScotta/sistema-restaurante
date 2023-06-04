import { ModelDefined } from "sequelize"
import { Rol } from "../../../model"

export interface RolAttributes {
    userId: number
    rol: Rol
}
export type RolSchemaType = ModelDefined<RolAttributes, RolAttributes>
