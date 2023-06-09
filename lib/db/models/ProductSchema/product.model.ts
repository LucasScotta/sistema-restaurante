import { ModelDefined } from "sequelize"

export interface ProductAttribute {
    productId: number
    name: string
    price: number
}
export type ProductSchemaType = ModelDefined<ProductAttribute, ProductAttribute>
