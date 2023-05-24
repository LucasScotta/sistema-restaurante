import { ProductInterface } from "./Product.interface";

export interface TableInterface {
    id: number
    products: ProductInterface[]
    finalPrice: number
    getProducts(): ProductInterface[]
    addProduct(arg0: ProductInterface): void
    deleteProduct(arg0: ProductInterface): void
    calcPrice(): number
}