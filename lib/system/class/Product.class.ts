import { ProductInterface } from "../interface/Product.interface"

export class Product implements ProductInterface {
    constructor(
        public id: number,
        public name: string,
        public price: number) { }

    // setter
    setName(name: string) {
        this.name = name
    }
    setPrice(price: number) {
        this.price = price
    }

    // getter
    getName = (): string => this.name
    getPrice = (): number => this.price
}