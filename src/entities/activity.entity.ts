import { ActivityEnum } from "../enums/activity.enum";
import { Category } from "./category.entity";

export type Activity = {
    _id?: string,
    category?: Category[],
    description: string,
    date: string,
    types?: string[]
}

export const wrapInActivity = (data: any): Activity => {
    return data;
}