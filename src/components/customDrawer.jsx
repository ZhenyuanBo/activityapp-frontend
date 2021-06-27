import React, { useState, useEffect } from 'react'
import { TouchableOpacity, Dimensions, StyleSheet, Text, View, Switch, Image } from 'react-native'
import { Service_API } from '../services/api.service';
import { CommonStyles } from '../themes/CommonStyles';
import { useColors } from '../util/hooks';

export default function CustomDrawer(props) {
    const [selectedScreen, setSelectedScreen] = useState();
    const [user, setUser] = useState();
    const commonStyles = CommonStyles();
    const { colors, dark } = useColors();
    
    useEffect(() => {
        async function getUser(){
            const user = await Service_API.getUserInformation();
            console.log(user);
            setUser(user);
        }
        return () => {
        }
    }, []);
    
    let _dark = dark;
    const styles = StyleSheet.create({
        ImageStyle: { width: '30%', height: '40%', borderRadius: 40 },
        UserName: {
            fontFamily: 'FiraSans-Bold',
            fontSize: 35,
            color: colors.text
        },
        ViewProfile: {
            fontFamily: 'FiraSans-Medium',
            fontSize: 20,
            color: colors.text
        },
        ButtonView: {
            backgroundColor: colors.card,
            width: '90%',
            borderRadius: 10,
            padding: 10,
            marginBottom: '5%'
        },
        ButtonText: {
            color: colors.background,
            textAlignVertical: 'center',
            fontSize: 16,
            fontFamily: 'FiraSans-Bold'
        }
    })

    return (
        <View style={{ ...commonStyles.PaddedView, flex: 1, backgroundColor: colors.background }}>
            {/* HEADER */}
            <View style={{ flex: 0.3, marginTop: '15%' }}>
                <Image 
                    source={{ uri: 'https://thumbs.dreamstime.com/b/close-up-portrait-nice-person-bristle-show-finger-okey-sign-isolated-pink-color-background-203466939.jpg' }}
                    style={styles.ImageStyle}
                    resizeMode="stretch"
                />
                <Text style={styles.UserName}>JOHN WALTER</Text>
                <TouchableOpacity >
                    <Text style={styles.ViewProfile}>View Profile</Text>
                </TouchableOpacity> 
            </View>
            {/*BUTTONS */}
            <View style={{ flex: 0.7 }}>
                <TouchableOpacity style={styles.ButtonView} onPress={props.openHome}>
                    <Text style={styles.ButtonText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.ButtonView} onPress={props.openShades}>
                    <Text style={styles.ButtonText}>Shades</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', ...styles.ButtonView }}>
                    <Text style={styles.ButtonText}>{dark ? "Theme: Dark" : "Theme: Light"}</Text>
                    <Switch 
                        trackColor={{ false: colors.text, true: colors.text }}
                        thumbColor={dark ? colors.background : colors.background }
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={(value)=>{
                            _dark = !dark
                            props.manageTheme(_dark ? 'light' : 'dark');
                        }}
                        value={_dark}
                        style={{ flex: 1 }}
                    />
                </View>
            </View>
        </View>
    )
}


