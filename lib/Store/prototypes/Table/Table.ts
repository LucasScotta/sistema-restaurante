import { IProduct, ITable } from "../../models";
import { Product } from "../Product";

export class Table {
    private products: Product[] = []
    private bill: number = 0
    constructor(private id: number) { }

    /**
     * Returns the bill of the table
     * @returns number
     */
    public getBill = () => this.bill

    /**
     * Returns a copy of the Product properties
     * @returns Readonly: IProduct
     */
    public getProducts = (): Readonly<IProduct>[] => this.products.map(product => product.getInfo())

    /**
     * Returns the ID of the table
     * @returns number
     */
    public getId = () => this.id

    /**
     * Returns a copy of the Table properties
     * @returns Readonly: ITable
     */
    public getInfo = (): Readonly<ITable> => {
        const { id, bill } = this
        const products = this.products.map(product => product.getInfo())
        return Object.freeze({ id, products, bill })
    }

    /**
     * 
     * @param product Product
     * @returns void
     */
    public addProduct(product: Product): void {
        this.products.push(product)
        this.updateBill()
    }

    /**
     * Returns if the product could be removed
     * @param id number
     * @returns {Boolean} boolean
     */
    public removeProduct(id: number): Boolean {
        const index = this.findIndexById(id)
        const exists = index >= 0
        if (exists) {
            const products = this.products
            products.splice(index, 1)
            this.updateBill()
        }
        return exists
    }

    /**
     * Updates the bill
     * @returns {void} void
     */
    private updateBill(): void {
        const products = this.products
        this.bill = products.reduce((bill, product) => bill + product.getPrice(), 0)
    }

    /**
     * Removes all the products and set the bill to 0
     * @returns {void} void
     */
    public resetTable(): void {
        this.products = []
        this.bill = 0
    }

    /**
     * Returns -1 if the product ID doens't exists or product index
     * @param id Product ID
     * @returns {number} number
     */
    private findIndexById(id: number): number {
        const products = this.products
        return products.findIndex(product => product.getId() === id)
    }
}
