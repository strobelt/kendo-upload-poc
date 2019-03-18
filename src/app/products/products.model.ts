export interface Product {
    _id: string,
    name: string,
    supplierId: number,
    categoryId: number,
    quantityPerUnit: string,
    unitPrice: number,
    unitsInStock: number,
    unitsOnOrder: number,
    reorderLevel: number,
    discontinued: boolean,
    category: {
        categoryId: number,
        categoryName: string,
        description: string
    },
    firstOrderedOn: Date,
    files: string[]
}