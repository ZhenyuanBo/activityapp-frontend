import { StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { useColors } from "../../util/hooks";

export function ActivitiesStyles() {
    const { colors, dark } = useColors();
    const Todaydate: StyleProp<TextStyle> = {
        fontFamily: 'FiraSans-Light',
        color: colors.text,
        fontSize: 17
    }
    const ScreenName: StyleProp<TextStyle> = {
        fontFamily: 'FiraSans-Bold',
        fontSize: 30,
        color: colors.text
    }
    const TypeView: StyleProp<ViewStyle> = { 
        marginRight: 20,
    }
    const TypeViewText: StyleProp<TextStyle> = {
        fontSize: 16,
        fontFamily: 'FiraSans-Bold',
        color: colors.text
    }
    const InActiveText: StyleProp<TextStyle> = {
        color: colors.border,
        fontSize: 16,
        fontFamily: 'FiraSans-Medium'
    }
    function ActiveView(length: number): StyleProp<ViewStyle>{
        return {
            // marginTop: '2%',
            marginLeft: length * 0.20,
            // width: '80%',
            width: (length * 7) * 0.80,
            backgroundColor: colors.card,
            height: 3,
            borderRadius: 10,
        }
    }
    return {
        Todaydate,  
        ScreenName,
        TypeView,
        TypeViewText,
        ActiveView,
        InActiveText,
    }
}