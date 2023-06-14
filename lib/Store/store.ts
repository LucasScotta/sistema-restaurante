import { Store } from "./prototypes";
export const store = new Store(8)
export const { getTableById, getTables, getBill, addProduct, getProducts, addTable, refreshProducts, removeTable } = store

export const jsonTables = () => JSON.stringify(getTables())