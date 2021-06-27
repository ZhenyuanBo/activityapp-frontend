import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, LogBox, Dimensions, ActivityIndicator, ToastAndroid } from 'react-native';
import Toast from 'react-native-toast-message';
import Login_SignUp from '../../../assets/images/Login_Signup.png';
import GoogleLogo from '../../../assets/images/Google.png';
import FacebookLogo from '../../../assets/images/Facebook.png';
import AppleLogo from '../../../assets/images/Apple.png';
import SpotifyLogo from '../../../assets/images/Spotify.png';
import { CommonStyles } from '../../themes/CommonStyles';
import { LoginStyles } from './login.styles';
import { MaterialCommunityIcons, Feather, Entypo } from '@expo/vector-icons';
import { Service_Auth } from '../../services/auth.service';

const { width, height } = Dimensions.get('screen');
const LoginScreen = (props) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [securePassword, setSecurePassword] = useState(true);
    const [activity, setActivity] = useState(false);
    const styles = LoginStyles();
    const commonStyles = CommonStyles();

    useEffect(() => {
        LogBox.ignoreLogs([
            'Non-serializable values were found in the navigation state'
        ]);
    }, []);

    function Login(){
        if (email && password) {
            if (Service_Auth.checkStrongPassword(password)){
                setActivity(true);
                Service_Auth.LoginUser(email, password).then((response)=>{
                    Toast.show(response);
                    setActivity(false);
                    if (response.type === "success") {
                        props.handlerLogin();
                    }
                }).catch(err=>{

                });
            }
            else {
                Toast.show(Service_Auth.InvalidPasswordToast());
            }
        }
        else {
            Toast.show(Service_Auth.IncompleteCredentialsToast());
        }
    }
    return (
        <View style={commonStyles.MainView}>
            <View style={{ height: height * 0.35 }}>
                <Image
                    source={Login_SignUp}
                    style={styles.LoginImage}
                    resizeMode="stretch"
                />
            </View>
            <View style={{ height: height * 0.55, width: '70%', alignSelf: 'center' }}>
                {/* LOGIN FIELDS */}
                <View style={{ flex: 0.5, justifyContent: 'space-around' }}>
                    {/* LOGIN TEXT */}
                    <Text style={styles.LoginText}>Login</Text>
                    {/* EMAIL FIELD */}
                    <View style={styles.InputContainer}>
                        <MaterialCommunityIcons name="email-outline" size={20} color={styles.BorderColor}/>
                        <TextInput 
                            value={email}
                            onChangeText={setEmail}
                            placeholder="User Name"
                            placeholderTextColor={styles.BorderColor}
                            style={styles.Input}
                            keyboardType="default"
                        />
                    </View>
                    {/* PASSWORD FIELD */}
                    <View style={styles.InputContainer}>
                        <Feather name="lock" size={18} color={styles.BorderColor}/>
                        <TextInput 
                            secureTextEntry={securePassword}
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Password"
                            placeholderTextColor={styles.BorderColor}
                            style={styles.Input}
                        />
                        <TouchableOpacity onPress={()=>setSecurePassword(!securePassword)}>
                            {securePassword ? (
                                <Entypo name="eye" color={styles.BorderColor} size={18}/>
                            ): (
                                <Entypo name="eye-with-line" color={styles.LoginButton.backgroundColor} size={18}/>
                            )}
                        </TouchableOpacity>
                    </View>
                    {/* Forgot Your Password */}
                    <TouchableOpacity style={{ alignItems: 'flex-end' }}>
                        <Text style={styles.ForgotPassword}>Forgot your password?</Text>
                    </TouchableOpacity>
                </View>
                {/* LOGIN BUTTONS */}
                <View style={{ flex: 0.4, justifyContent: 'space-around' }}>
                    {/* LOGIN BUTTON */}
                    <View style={{ flex: 0.4, justifyContent: 'flex-end' }}>
                        {activity && (
                            <View style={styles.LoginButton}>
                                <ActivityIndicator 
                                    size={styles.LoginButtonText.fontSize}
                                    color={styles.LoginButtonText.color}
                                    style={styles.LoginButtonText}
                                />
                            </View>
                        )}
                        {!activity && (
                            <TouchableOpacity style={styles.LoginButton} onPress={Login}>
                                <Text style={styles.LoginButtonText}>Login</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    {/* THIRD PARTY BUTTONS */}
                    <View style={{ flex: 0.6, justifyContent: 'flex-end' }}>
                        {/* LOGIN WITH */}
                        <View style={styles.LoginWithView}></View>
                        <Text style={styles.LoginWithText}>Or login with</Text>
                        <View style={{ marginBottom: 10 }}></View>
                        {/* BUTTONS */}
                        <View style={{ flexDirection: 'row' }}>
                            {/* GOOGLE */}
                            <TouchableOpacity style={{...styles.ThirdPartyView, marginLeft: 0}}>
                                <Image 
                                    source={GoogleLogo}
                                    style={styles.ThirdPartyImage}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                            {/* FACEBOOK */}
                            {/* <TouchableOpacity style={styles.ThirdPartyView}>
                                <Image
                                    source={FacebookLogo}
                                    style={styles.ThirdPartyImage}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity> */}
                            {/* APPLE */}
                            {/* <TouchableOpacity style={styles.ThirdPartyView}>
                                <Image
                                    source={AppleLogo}
                                    style={styles.ThirdPartyImage}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity> */}
                            {/* SPOTIFY */}
                            {/* <TouchableOpacity style={{...styles.ThirdPartyView, marginRight: 0 }}>
                                <Image
                                    source={SpotifyLogo}
                                    style={styles.ThirdPartyImage}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity> */}
                        </View>
                    </View>
                </View>
                {/* SIGN UP */}
                <View style={{ flex: 0.07, justifyContent: 'flex-end', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.SignUpText}>
                            Don't have an account?{" "}
                        </Text>
                        <TouchableOpacity 
                            onLongPress={()=>setActivity(false)}
                            onPress={()=>props.navigation.navigate('Screen2', {
                                handlerLogin: props.handlerLogin
                            })}>
                            <Text style={styles.SignUp}>Sign up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 0.03 }}></View>
            </View>
        </View>
    )
}

export default LoginScreen;