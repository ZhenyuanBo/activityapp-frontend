import { Activity } from "../../entities/activity.entity";
import { ActivityEnum } from "../../enums/activity.enum";

export const Dates = [
    "16/06/2021",
    "15/06/2021",
    "11/06/2021"
]
export const data: Activity[] = [
    {
        _id: "08983298932893",
        completed: true,
        description: "I had a crossiant for breakfast this morning. I also drank a mango smoothie.",
        tags: ["Food", "Water"],
        time: "9.20 AM",
        type: ActivityEnum.Physiological,
        dateActivity: Dates[0]
    },
    {
        _id: "767627632838",
        completed: true,
        description: "I had a long walk along the sea.I feel appreciative for my home.",
        tags: ["Shelter", "Air"],
        time: "10.56 AM",
        type: ActivityEnum.Physiological,
        dateActivity: Dates[1]
    },
    {
        _id: "767627632838",
        completed: true,
        description: "This sense of belonging to others is some of the worst feeling ever.",
        tags: ["This", "Love"],
        time: "11.56 AM",
        type: ActivityEnum.Love_And_Belong,
        dateActivity: Dates[2]
    }
]