import { StyleProp, ViewStyle, TextStyle, ImageStyle, View } from "react-native";
import { useColors } from '../../util/hooks';

export function LoginStyles() {
    const { dark, colors } = useColors();
    const LoginText: StyleProp<TextStyle> = {
        fontFamily: 'FiraSans-Bold',
        fontSize: 25,
        color: colors.text
    }
    const LoginImage: StyleProp<ImageStyle> = {
        width: '100%', 
        height: '100%' 
    }
    const InputContainer: StyleProp<ViewStyle> = {
        flexDirection: 'row', 
        alignItems: 'center', 
        borderBottomWidth: 1, 
        borderBottomColor: dark ? colors.text : colors.border
    } 
    const Input: StyleProp<TextStyle> = { 
        paddingLeft: 10,
        width: '85%',
        color: colors.text
    }
    const ForgotPassword: StyleProp<TextStyle> = {
        fontFamily: 'FiraSans-Medium',
        color: colors.card
    }
    const ComponentContainer: StyleProp<ViewStyle> = {
        justifyContent: 'space-around'
    }
    const LoginButton: StyleProp<ViewStyle> = {
        backgroundColor: colors.card,
        width: '80%',
        borderRadius: 30,
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    }
    const LoginButtonText: StyleProp<TextStyle> = {
        textAlign: 'center',
        fontFamily: 'FiraSans-Medium',
        fontSize: 22,
        color: colors.background
    }
    const BorderColor: string = dark ? colors.text : colors.border;
    const LoginWithView: StyleProp<ViewStyle> = { 
        borderWidth: 0.4, 
        borderColor: dark ? colors.text : colors.border
    }
    const LoginWithText: StyleProp<TextStyle> = { 
        marginTop: '-4%', 
        textAlign: 'center', 
        color: colors.text, 
        backgroundColor: colors.background, 
        width: '30%', 
        alignSelf: 'center'
    }
    const SignupWithText: StyleProp<TextStyle> = { 
        marginTop: '-4%', 
        textAlign: 'center', 
        color: colors.text, 
        backgroundColor: colors.background, 
        width: '40%', 
        alignSelf: 'center'
    }
    const ThirdPartyView: StyleProp<ViewStyle> = { 
        flex: 1,
        borderRadius: 10,
        borderColor: dark ? colors.text : colors.border,
        padding: 0,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 3
    }
    const ThirdPartyImage: StyleProp<ImageStyle> = { 
        width: '50%', 
        height: '50%' 
    }
    const SignUpText: StyleProp<TextStyle> = { 
        fontFamily: 'FiraSans-Medium',
        fontSize: 16,
        color: colors.text,
    }
    const SignUp: StyleProp<TextStyle> = { 
        fontFamily: 'FiraSans-Medium',
        fontSize: 16,
        color: colors.card,
    }
    return {
        LoginButton,
        LoginButtonText,
        LoginImage,
        LoginText,
        ComponentContainer,
        Input,
        InputContainer,
        ForgotPassword,
        BorderColor,
        LoginWithView,
        LoginWithText,
        SignupWithText,
        ThirdPartyImage,
        ThirdPartyView,
        SignUpText,
        SignUp
    }
}
