import { TableInterface } from "../interface/Table.interface"
import { Product } from "./Product.class"


export class Table implements TableInterface {
    constructor(
        public readonly id: number,
        public finalPrice = 0,
        public products: Product[] = []) { }

    // getter
    getProducts = (): Product[] => this.products

    // setter
    addProduct(product: Product): void {
        this.products.push(product)
    }
    deleteProduct(product: Product): void {
        const products = this.getProducts()
        const index = products.indexOf(product)
        if (index >= 0) {
            products.splice(index, 1)
        }
    }

    calcPrice = (): number => this.getProducts().reduce((price, product: Product) => price + product.price, 0)
}