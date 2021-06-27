import { ActivityEnum } from "../../enums/activity.enum";

class Shades {
    private Colors = {
        [ActivityEnum.Physiological]: "#5DAEFF",
        [ActivityEnum.Safety]: "#55C2BB",
        [ActivityEnum.Love_And_Belong]: "#FFAF2F",
        [ActivityEnum.Esteem]: "#D7A5D2",
        [ActivityEnum.Self_Actualization]: "#F07973",
    }
    
    private ActivityImages = {
        [ActivityEnum.Physiological]: require('../../../assets/icons/Physiological.png'),
        [ActivityEnum.Safety]: require("../../../assets/icons/Safety.png"),
        [ActivityEnum.Love_And_Belong]: require('../../../assets/icons/Love_and_Belong.png'),
        [ActivityEnum.Esteem]: require('../../../assets/icons/Esteem.png'),
        [ActivityEnum.Self_Actualization]: require('../../../assets/icons/Self_Actualization.png'),        
    }

    returnBaseColor(ActivityName: ActivityEnum){
        return this.Colors[ActivityName];
    }
    
    returnBaseImage(ActivityName: ActivityEnum){
        return this.ActivityImages[ActivityName];
    }

    hexToRGB(hex: string, alpha: number) {
        var r = parseInt(hex.slice(1, 3), 16),
            g = parseInt(hex.slice(3, 5), 16),
            b = parseInt(hex.slice(5, 7), 16);
    
        if (alpha) {
            return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
        } else {
            return "rgb(" + r + ", " + g + ", " + b + ")";
        }
    }
}
export const Shades_Class = new Shades();