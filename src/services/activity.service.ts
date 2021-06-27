import { ActivityEnum } from "../enums/activity.enum";
import { Activity } from '../entities/activity.entity';
import { Category, SubCategory } from "../entities/category.entity";
import { Endpoints, ErrorResponse, Service_API, ToastMessage } from "./api.service";
import { ServerActivity } from "../entities/serverActivity.entity";

class ActivityClass {
  public CATEGORIES: Category[] | undefined = undefined;
  public ACTIVITIES: Activity[] | undefined = undefined;
  public DATES: string[] | undefined = undefined;

  private ACTIVITY_TYPES = [
    ActivityEnum.Physiological,
    ActivityEnum.Safety,
    ActivityEnum.Love_And_Belong,
    ActivityEnum.Esteem,
    ActivityEnum.Self_Actualization,
  ];

  private ALL_ACTIVITY_TYPES = [
    ActivityEnum.All,
    ActivityEnum.Physiological,
    ActivityEnum.Safety,
    ActivityEnum.Love_And_Belong,
    ActivityEnum.Esteem,
    ActivityEnum.Self_Actualization,
  ];

  getAllActivityTypes(): ActivityEnum[] {
    return [...this.ALL_ACTIVITY_TYPES];
  }

  getActivityTypes(): ActivityEnum[] {
    return [...this.ACTIVITY_TYPES];
  }

  async getActivitiesWithDate(dateActivity: string): Promise<Activity[] | ToastMessage> {
    const user = await Service_API.getUserInformation();
    const response = await Service_API.get<Activity[] | ErrorResponse, { startDate: Date, endDate: Date, userId: string }>(Endpoints.ACTIVITY, {
      startDate: dateActivity,
      endDate: dateActivity,
      userId: user.id
    });

    const Error = (response as ErrorResponse);
    if (Error.Error_Message) {
      return {
        autoHide: true,
        text1: 'Failed to load this Dates Activities',
        text2: Error.Error_Message.toUpperCase(),
        type: 'error',
        visibilityTime: 3000
      }
    }

    const Activities = (response as Activity[]);
    return Activities;
  }

  public filterActivities(DateActivity: String): Activity[] {
    return [...this.ACTIVITIES].filter((Activity, index) => {
      if (new Date(Activity.date).toDateString() === DateActivity) return true;
      else return false;
    });
  }

  public setOpacityForSubs([...Categories]: Category[]) {
    for (let category of Categories) {
      const items = category.subCategories;
      let total = items.length;
      let selected = 0;
      for (let item of items) {
        if (item.selected) selected = selected + 1;
      }
      for (let item of items) {
        item.opacity = (selected / total)
      }
    }
    return Categories;
  }

  async loadCategories(): Promise<Category[] | undefined> {
    const Categories = await Service_API.getCategories();
    if (Categories) {
      this.CATEGORIES = Categories;
      return Categories;
    }
    else return undefined;
  }

  async loadActivities(): Promise<Activity[] | ToastMessage> {
    const response = await Service_API.get<ServerActivity[] | ErrorResponse, {}>(Endpoints.ACTIVTITY_ALL);
    const Error = (response as ErrorResponse);
    if (Error.Error_Message) {
      return {
        autoHide: true,
        text1: "Cannot Fetch Activities",
        text2: Error.Error_Message,
        type: "error",
        visibilityTime: 3000
      }
    }

    const Activities = (response as ServerActivity[]);
    // MERGE WITH APP STRUCTURE FOR ACTIVITIES
    const Modified_Actitvities = [];
    const dates = [];

    for (let activity of Activities) {
      Modified_Actitvities.push(this.mergeActivityWithStructure(activity));
      dates.push(new Date(activity.date).toDateString());
    }
    this.ACTIVITIES = Modified_Actitvities;
    this.DATES = dates;
    return Modified_Actitvities;
  }

  private mergeActivityWithStructure(Activity: ServerActivity): Activity {
    const { Types, Categories } = this.getCategoryAndSubCategory(Activity.subCategoryIds);
    return {
      date: Activity.date,
      description: Activity.description,
      _id: Activity._id,
      category: Categories,
      types: Types
    }
  }

  private getCategoryAndSubCategory(subCatgoryIds: string[]): { Categories: Category[], Types: string[] } {
    var isSelected = false;
    const categories = [...this.CATEGORIES].map<Category>((category, index) => {
      isSelected = false;
      return {
        ...category,
        subCategories: category.subCategories.map<SubCategory>((subCategory, index) => {
          if (subCatgoryIds.indexOf(subCategory._id) != -1) isSelected = true;
          return {
            ...subCategory,
            selected: subCatgoryIds.indexOf(subCategory._id) != -1 ? true : false
          }
        }),
        selected: isSelected
      }
    });

    const types = categories.map<string>((category, index) => {
      if (category.selected) { return category.title };
    }).filter((type, index) => { return type != undefined });

    return { Categories: categories, Types: types };
  }

  public findReportPercentages(Activities: Activity[]): number[] {
    let Self_Actualization = 0;
    let Esteem = 0;
    let Love_And_Belong = 0;
    let Safety = 0;
    let Physiological = 0;

    let totals = Activities.length;
    for (let activity of Activities) {
      for (let type of activity.types) {
        switch (type) {
          case ActivityEnum.Self_Actualization:
            Self_Actualization = Self_Actualization + 1;
            break;
          case ActivityEnum.Esteem:
            Esteem = Esteem + 1;
            break;
          case ActivityEnum.Love_And_Belong:
            Love_And_Belong = Love_And_Belong + 1;
            break;
          case ActivityEnum.Safety:
            Safety = Safety + 1;
            break;
          case ActivityEnum.Physiological:
            Physiological = Physiological + 1;
            break;
        }
      }
    }

    if (totals == 0) {
      return [0, 0, 0, 0, 0];
    }
    else {
      return [
        Self_Actualization / totals,
        Esteem / totals,
        Love_And_Belong / totals,
        Safety / totals,
        Physiological / totals
      ];
    }
  }

  public findPyramindActivity(): Activity {
    return {
      date: new Date().toDateString(),
      description: "Single Activity With All Sub Count",
      _id: "909090909090",
      category: this.getCountedSubs()
    }
  }

  public getCountedSubs(): Category[] {
    let selectedSubs: Category[] = [...this.CATEGORIES];
    if (this.ACTIVITIES) {
      for (let activity of [...this.ACTIVITIES]){
        for (let j in activity.category){
          for (let k in activity.category[j].subCategories){
            if (activity.category[j].subCategories[k].selected){
              selectedSubs[j].subCategories[k].count = (selectedSubs[j].subCategories[k].count || 0) + 1;
              selectedSubs[j].subCategories[k].selected = true;
            }
          }
        }
      }
    }
    return selectedSubs;
  }

  async saveActivity(activity: any): Promise<ToastMessage> {
    const response = await Service_API.post<ServerActivity | ErrorResponse, any>(Endpoints.ACTIVITY, activity);
    const Error = (response as ErrorResponse);
    if (Error.Error_Message) {
      return {
        autoHide: true,
        text1: "Failed to Add Your Activity",
        text2: Error.Error_Message.toUpperCase(),
        type: "error",
        visibilityTime: 4000
      }
    }

    const Activity = (response as ServerActivity)
    if (Activity._id) {
      if (this.ACTIVITIES) {
        this.ACTIVITIES.push(this.mergeActivityWithStructure(Activity));
        this.DATES.push(new Date(Activity.date).toDateString())
      }
      else {
        this.ACTIVITIES = [this.mergeActivityWithStructure(Activity)];
        this.DATES = [new Date(Activity.date).toDateString()];
      }

      return {
        autoHide: true,
        text1: "New Activity has been added",
        text2: `Your motivation is increasing, keep it up!`.toUpperCase(),
        type: "success",
        visibilityTime: 4000
      }
    }
  }
}

export const Service_Activity = new ActivityClass();