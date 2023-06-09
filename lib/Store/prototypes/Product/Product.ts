import { Category, IProduct } from "../../models"

export class Product {
    private id: number
    private name: string
    private price: number
    // private category: Category
    constructor({ id, name, price/*, category*/ }: IProduct) {
        this.id = id
        this.name = name
        this.price = price
        // this.category = category
    }

    /**
     * Returns the ID of the product
     * @returns Product ID
     */
    public getId = (): number => this.id

    /**
     * Returns the name of the product
     * @returns Product name
     */
    public getName = (): string => this.name

    /**
     * Returns the price of the product
     * @returns Product price
     */
    public getPrice = (): number => this.price

    /**
     * Returns the category of the product
     * @returns Product category
     */
    // public getCategory = (): string => this.category

    /**
     * Returns a copy of the products with its properties
     * @returns Readonly: IProduct
     */
    public getInfo = (): Readonly<IProduct> => {
        const { id, name, price/*, category*/ } = this
        return Object.freeze({ id, name, price/*, category*/ })
    }

    /**
     * Set the new price of the Product
     * @param newPrice number
     * @returns void
     */
    public setPrice = (newPrice: number): void => {
        this.price = newPrice
    }

    /**
     * Set the new name of the product
     * @param newName: string
     * @returns void
     */
    public setName = (newName: string): void => {
        this.name = newName
    }
}
