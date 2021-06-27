import { StyleProp, TextStyle } from "react-native";
import { useColors } from "../../util/hooks";

export function HomeStyles () {
    const { colors, dark } = useColors();
    const TextInput = {
        fontFamily: 'FiraSans-Medium',
        fontSize: 16,
        textAlignVertical: 'top',
        color: colors.text,
        borderBottomWidth: 0.6,
        borderBottomColor: colors.text
    }
    const PlaceHolderColor = colors.border;
    const SelectText: StyleProp<TextStyle> = {
        fontFamily: 'FiraSans-Bold',
        fontSize: 26,
        position: 'absolute',
        top: 100,
        left: 0,
        color: colors.text
    }
    const CardColor = colors.card;
    const DateTextStyles: StyleProp<TextStyle> = {
        fontSize: 14,
        fontFamily: 'FiraSans-Medium',
        color: colors.text,
        marginRight: 5
    }
    return {
        TextInput,
        PlaceHolderColor,
        SelectText,
        CardColor,
        DateTextStyles
    }
}   