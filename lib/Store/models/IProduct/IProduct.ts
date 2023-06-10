import { Category } from "../Category"
/**
 * Interface for Readonly Product
 */
export interface IProduct {
    id: number
    name: string
    price: number
    // category: Category
}

export type IProductDTO = Omit<IProduct, 'id'>