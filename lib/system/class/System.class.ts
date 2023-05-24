import { SystemInterface } from "../interface/System.interface"
import { Table } from "./Table.class "

export class System implements SystemInterface {
    constructor(public tables: Table[] = []) { }

    init(totalTables: number) {
        for (let i = 0; i < totalTables; i += 1) {
            const id = i + 1
            const table = new Table(id)
            this.tables.push(table)
        }
    }

    // getter
    getTables = () => this.tables
    getTable = (tableId: number) => {
        if (tableId >= this.getTables().length || tableId < 0) {
            return new Error('Provided ID is incorrect')
        }
        const table = this.tables.find(table => table.id === tableId) as Table
        return table
    }


}