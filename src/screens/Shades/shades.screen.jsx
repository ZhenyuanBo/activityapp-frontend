import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ScreenHeader from '../../components/header.component'
import { CommonStyles  } from '../../themes/CommonStyles';
import { Service_Activity } from '../../services/activity.service';
import {Shades_Class } from './shades.function';
import { widthToDp } from '../../themes/fontsManager'; 

export default function ShadesScreen(props) {
    const { navigation } = props;
    const commonStyles = CommonStyles();

    return (
        <View style={{ flex: 1 }}>
            <ScreenHeader hideImage={true} toggleDrawer={navigation.toggleDrawer}/>
            {/* SCREEN NAME */}
            <View style={{ flex: 0.050, marginHorizontal: '7%' }}>
                <Text style={commonStyles.ScreenName}>Shades</Text>
            </View>

            <View style={{ flex: 1, marginHorizontal: '7%', marginTop: '5%', marginBottom: '5%', justifyContent: 'space-around' }}>
                {Service_Activity.getActivityTypes().reverse().map((item, index) => (
                    <View key={index + ""}>
                        <Text style={{
                            color: Shades_Class.returnBaseColor(item),
                            fontSize: 15,
                            fontFamily: 'FiraSans-Medium'
                        }}>{item.toUpperCase()}</Text>

                        <View style={{ flexDirection: 'row', marginTop: '3%' }}>
                            <View style={CircleImage(Shades_Class.returnBaseColor(item), 0.25)}></View>
                            <View style={CircleImage(Shades_Class.returnBaseColor(item), 0.75)}></View>
                            <View style={CircleImage(Shades_Class.returnBaseColor(item), 1.00)}></View>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    )
}

function CircleImage(backgroundColor, Opacity) {
    return {
        width: 50,
        height: 50,
        borderRadius: 50/2  ,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        backgroundColor: backgroundColor,
        opacity: Opacity,
    }
}

