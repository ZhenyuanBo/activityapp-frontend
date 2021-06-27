import { SubCategory } from "./category.entity";

export type ServerActivity = {
    _id: string,
    description: string,
    date: string,
    userId: string,
    subCategoryIds: string[]
}