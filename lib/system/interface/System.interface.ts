import { TableInterface } from "./Table.interface"

export interface SystemInterface {
    tables: TableInterface[]
    init(arg0: number): void
}
