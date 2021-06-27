import React from 'react';
import { View, Text, Image } from 'react-native';
// NAV ICONS
import Home from '../../assets/icons/home.png';
import Home_Focused from '../../assets/icons/home_focused.png';
import Activity from '../../assets/icons/activities.png';
import Activity_Focused from '../../assets/icons/activities_focused.png';
import Report from '../../assets/icons/report.png';
import Report_Focused from '../../assets/icons/report_focused.png';
import Calendar from '../../assets/icons/calendar.png';
import Calendar_Focused from '../../assets/icons/calendar_focused.png';
import { useColors } from '../util/hooks';

const IconNav = ({ screenName, focused, color }) => {
    const { colors, dark } = useColors();
    function getImage(screenName, focused){
        switch(screenName){
            case "Home":
                if (focused) return Home_Focused;
                else return Home;
            case "Report":
                if (focused) return Report_Focused;
                else return Report;
            case "Activity":
                if (focused) return Activity_Focused;
                else return Activity;
            case "Calendar":
                if (focused) return Calendar_Focused;
                else return Calendar;
        }
    }

    return (
        <View style={{ 
            backgroundColor: colors.background, 
            width: '100%', 
            height: '100%',
            justifyContent: 'center', 
            alignItems: 'center'
        }}>
            <Image
                source={getImage(screenName, focused)}
                style={{ width: '40%', height: '40%' }}
                resizeMode="contain"
            />
            <Text style={{
                color: focused ? colors.card : dark ? colors.text : colors.border,
                fontSize: 13,
            }}>{screenName}</Text>
        </View>
    );
}

export default IconNav;