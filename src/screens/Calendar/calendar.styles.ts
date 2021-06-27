import { useColors } from '../../util/hooks';

export function CalenderStyles(){
    const { colors, dark } = useColors();

    const BorderColor: string = dark ? colors.text : colors.border;
    const ColorTextContrast: string = colors.background;
    const CardColor: string = colors.card;
    const Category = { 

    }
    const CategoryViewText = {
        fontSize: 18,
        fontFamily: 'FiraSans-Bold',
        color: colors.text
    }
    const CategoryInActiveText = {
        color: colors.border,
        fontSize: 18,
        fontFamily: 'FiraSans-Medium'
    }
    const ActiveBar = {
        marginLeft: '2%',
        width: '80%',
        backgroundColor: colors.card,
        height: 3,
        borderRadius: 10,
    }
    return {
        BorderColor,
        ColorTextContrast,
        CardColor,
        colors,
        Category,
        CategoryViewText,
        CategoryInActiveText,
        ActiveBar
    }
}