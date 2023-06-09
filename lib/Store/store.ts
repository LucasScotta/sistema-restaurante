import { Store } from "./prototypes";

export const { getTableById, getTables, getBill, addProduct } = new Store(8)

export const jsonTables = () => JSON.stringify(getTables())