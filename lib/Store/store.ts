import { Store } from "./prototypes";

export const { getTableById, getTables, getBill, addProduct, getProducts } = new Store(8)

export const jsonTables = () => JSON.stringify(getTables())