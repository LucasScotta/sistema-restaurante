import { IProduct } from "../IProduct"
/**
 * Interface for Readonly Table
 */
export interface ITable {
    id: number
    products: IProduct[]
    bill: number
}
