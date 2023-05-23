export interface ProductInterface {
    id: number
    name: string
    price: number
    setName(arg0: string): void
    setPrice(arg0: number): void
    getName(): string
    getPrice(): number
}