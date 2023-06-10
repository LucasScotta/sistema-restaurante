import { Model } from "sequelize";
import { IProduct, ITable } from "../../models";
import { Product } from "../Product";
import { Table } from "../Table";
import { sequelize } from "../../../db";

export class Store {
    private tables: Table[] = []
    private products: IProduct[] = []
    constructor(tablesQuantity: number = 5) {
        this.products = []
        sequelize
            .getProducts()
            .then(products => {
                if (products instanceof Error) {
                    return console.log(Error)
                }
                this.products = products
            })
            .catch(e => {
                console.log('problem getting products', e)
            })
        this.init(tablesQuantity)
    }

    /**
     * Initialize the class
     * @param tablesQuantit: number
     * @returns {void}: void
     */
    private init(tablesQuantity: number = 5): void {
        for (let i = 0; i < tablesQuantity; i += 1) {
            const table = new Table(i)
            this.tables.push(table)
        }
    }

    /**
     * Returns a copy of tables
     * @returns {Array<Table[]>} Array
     */
    public getTables = (): ITable[] => this.tables.map(table => table.getInfo())
    /**
     * Returns a copy of a Table if exists or false if it doesn't
     * @param tableId: number
     * @returns {false | Readonly<Table>}: Boolean<false> | Readonly<Table>
     */
    public getTableById(tableId: number): false | Readonly<Table> {
        const index = this.findIndexTableById(tableId)
        const exists = index >= 0
        return exists ? Object.freeze(this.tables[index]) : exists
    }

    /**
     * Returns the bill of a table if exists or false if doesn't
     * @param tableId: number
     * @returns {number | false} Boolean
     */
    public getBill(tableId: number): number | false {
        const table = this.getTableById(tableId)
        return !!table ? table.getBill() : table
    }

    /**
     * Returns a boolean describing if the product could be added
     * @param tableId: number 
     * @param product: Product
     * @returns {Boolean} boolean
     */
    public addProduct(tableId: number, product: IProduct): Boolean {
        const table = this.getTableById(tableId)
        if (!!table) table.addProduct(new Product(product))
        return !!table
    }
    /**
     * Adds a table to tables array
     * @param id?: number
     * @returns {void} void
     */
    public addTable = (id?: number): void => {
        this.tables.push(new Table(id || this.tables.length))
    }
    /**
     * Removes a table by Id if exists
     * @param tableId 
     * @returns {Boolean}: boolean
     */
    public removeTable = (tableId: number): Boolean => {
        const index = this.findIndexTableById(tableId)
        const exists = index >= 0
        if (exists) {
            this.tables.splice(index, 1)
        }
        return exists
    }

    /**
     * Returns -1 if the table doesn't exists of an index if exists
     * @param tableId 
     * @returns {number} number
     */
    private findIndexTableById = (tableId: number): number => this.tables.findIndex(table => table.getId() === tableId)

    /**
     *
     * @returns {Array<IProduct>} Array
     */
    public getProducts = (): IProduct[] => this.products
}
