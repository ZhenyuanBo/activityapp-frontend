import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Dimensions, LogBox, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons, Feather, Entypo } from '@expo/vector-icons';
import { CommonStyles } from '../../themes/CommonStyles';
import { LoginStyles } from '../Login/login.styles';
import Toast from 'react-native-toast-message';
import Login_SignUp from '../../../assets/images/Login_Signup.png';
import GoogleLogo from '../../../assets/images/Google.png';
import FacebookLogo from '../../../assets/images/Facebook.png';
import AppleLogo from '../../../assets/images/Apple.png';
import SpotifyLogo from '../../../assets/images/Spotify.png';
import { Service_Auth } from '../../services/auth.service';

const { width, height } = Dimensions.get('screen');
const SignupScreen = (props) => {
    const [page, setPage] = useState(0);
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [userName, setUserName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [activity, setActivity] = useState(false);
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const styles = LoginStyles();
    const commonStyles = CommonStyles();

    useEffect(() => {
        LogBox.ignoreLogs([
            'Non-serializable values were found in the navigation state'
        ]);
    }, []);

    async function Register(){
        if (page === 0) { 
            if (firstName && lastName && userName) {
                setPage(1);
                return;
            }
            else Toast.show(Service_Auth.IncompleteCredentialsToast());
        }
        else {
            setActivity(true);
            if (email && password && confirmPassword) {
                if (password === confirmPassword) {
                    if (Service_Auth.checkStrongPassword(password)){
                        await Service_Auth.RegisterUser(firstName, lastName, userName, password).then(response=>{
                            Toast.show(response);
                            if (response.type == "success") props.navigation.goBack();
                        });
                    }
                    else {
                        Toast.show(Service_Auth.InvalidPasswordToast());
                    }
                }
                else {
                    Toast.show(Service_Auth.NotSimilarPasswords());
                }
            }
            else Toast.show(Service_Auth.IncompleteCredentialsToast());
        }
        setActivity(false);
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
                {/* SIGNUP FIELDS */}
                <View style={{ flex: 0.5, justifyContent: 'space-around' }}>
                    {page == 0 && (
                        <>
                            {/* SIGN UP TEXT */}
                            <Text style={styles.LoginText}>Details</Text>
                            {/* FIRST NAME FIELD */}
                            <View style={styles.InputContainer}>
                                <MaterialCommunityIcons name="email-outline" size={20} color={styles.BorderColor} />
                                <TextInput
                                    value={firstName}
                                    onChangeText={setFirstName}
                                    placeholder="First Name"
                                    placeholderTextColor={styles.BorderColor}
                                    style={styles.Input}
                                />
                            </View>
                            {/* PASSWORD FIELD */}
                            <View style={styles.InputContainer}>
                                <Feather name="lock" size={18} color={styles.BorderColor} />
                                <TextInput
                                    value={lastName}
                                    onChangeText={setLastName}
                                    placeholder="Last Name"
                                    placeholderTextColor={styles.BorderColor}
                                    style={styles.Input}
                                />
                            </View>
                            {/* CONFIRM PASSWORD FIELD */}
                            <View style={styles.InputContainer}>
                                <Feather name="lock" size={18} color={styles.BorderColor} />
                                <TextInput
                                    value={userName}
                                    onChangeText={setUserName}
                                    placeholder="User Name"
                                    placeholderTextColor={styles.BorderColor}
                                    style={styles.Input}
                                />
                            </View>
                        </>                        
                    )}
                    {page == 1 && (
                        <>
                            {/* SIGN UP TEXT */}
                            <Text style={styles.LoginText}>Sign Up</Text>
                            {/* EMAIL FIELD */}
                            <View style={styles.InputContainer}>
                                <MaterialCommunityIcons name="email-outline" size={20} color={styles.BorderColor} />
                                <TextInput
                                    value={email}
                                    onChangeText={setEmail}
                                    placeholder="Email address"
                                    placeholderTextColor={styles.BorderColor}
                                    style={styles.Input}
                                    
                                />
                            </View>
                            {/* PASSWORD FIELD */}
                            <View style={styles.InputContainer}>
                                <Feather name="lock" size={18} color={styles.BorderColor} />
                                <TextInput
                                    value={password}
                                    onChangeText={setPassword}
                                    placeholder="Password"
                                    placeholderTextColor={styles.BorderColor}
                                    style={styles.Input}
                                    secureTextEntry={secureTextEntry}
                                />
                                <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
                                    {secureTextEntry ? (
                                        <Entypo name="eye" color={styles.BorderColor} size={18} />
                                    ) : (
                                        <Entypo name="eye-with-line" color={styles.LoginButton.backgroundColor} size={18} />
                                    )}
                                </TouchableOpacity>
                            </View>
                            {/* CONFIRM PASSWORD FIELD */}
                            <View style={styles.InputContainer}>
                                <Feather name="lock" size={18} color={styles.BorderColor} />
                                <TextInput
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    placeholder="Confirm Password"
                                    placeholderTextColor={styles.BorderColor}
                                    style={styles.Input}
                                    secureTextEntry={secureTextEntry}
                                />
                                <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
                                    {secureTextEntry ? (
                                        <Entypo name="eye" color={styles.BorderColor} size={18} />
                                    ) : (
                                        <Entypo name="eye-with-line" color={styles.LoginButton.backgroundColor} size={18} />
                                    )}
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </View>
                {/* SIGN UP BUTTONS */}
                <View style={{ flex: 0.4, justifyContent: 'space-around' }}>
                    {/* SIGN UP BUTTON */}
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
                            <TouchableOpacity style={styles.LoginButton} onPress={Register}>
                                <Text style={styles.LoginButtonText}>{page == 0 ? "Next" : "Sign Up"}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    {/* THIRD PARTY BUTTONS */}
                    <View style={{ flex: 0.6, justifyContent: 'flex-end' }}>
                        {/* LOGIN WITH */}
                        <View style={styles.LoginWithView}></View>
                        <Text style={styles.SignupWithText}>Or sign up with</Text>
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
                {/* LOGIN */}
                <View style={{ flex: 0.07, justifyContent: 'flex-end', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.SignUpText}>
                            Already have an account?{" "}
                        </Text>
                        <TouchableOpacity onPress={props.navigation.goBack}>
                            <Text style={styles.SignUp}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 0.03 }}></View>
            </View>
        </View>
    )
}

export default SignupScreen;