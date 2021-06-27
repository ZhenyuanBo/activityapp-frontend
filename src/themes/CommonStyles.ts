import { StyleProp, ViewStyle, TextStyle, ImageStyle } from "react-native";
import { useColors } from '../util/hooks';

export function CommonStyles(){
    const { colors, dark } = useColors();
    const MainView: StyleProp<ViewStyle> = {
        flex: 1,
        backgroundColor: colors.background,
    }
    const SafeAreaView: StyleProp<ViewStyle> = {
        flex: 1,
        backgroundColor: colors.background,
    }
    const PaddedView: StyleProp<ViewStyle> = {
        paddingHorizontal: '4%',
    }
    const ScreenName: StyleProp<TextStyle> = {
        fontFamily: 'FiraSans-Bold',
        fontSize: 26,
        color: colors.text
    }
    const DateDisplay: StyleProp<TextStyle> = {
        fontFamily: 'FiraSans-Medium',
        color: colors.text,
        fontSize: 18
    }
    const ActivityLoader: StyleProp<TextStyle> = {
        fontSize: 22,
        color: colors.card,
        marginLeft: '3%'
    }
    return {
        MainView,
        SafeAreaView,
        PaddedView,
        ScreenName,
        DateDisplay,
        ActivityLoader
    }
}

