// export type Category = {
//     title: string,
//     color: string,
//     items: Item[]
// }

// export type Item = {
//     text: string,
//     backgroundColor: string,
//     color: string,
//     selected: boolean,
//     opacity: number
// }

export type Category = {
    _id: string,
    subCategories: SubCategory[],
    title: string,
    color: string,
    selected?: boolean
}

export type SubCategory = {
    _id: string,
    categoryId: string,
    title: string,
    color?: string,
    selected: boolean,
    opacity?: number,
    count?: number
}