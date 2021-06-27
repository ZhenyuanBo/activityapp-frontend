import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import Report from '../../components/pyramind.component';
import Selection from '../../components/select.component';
import ScreenHeader from '../../components/header.component';
import { StatusBar } from 'expo-status-bar';
import { CommonStyles } from '../../themes/CommonStyles';
import { Service_Activity } from '../../services/activity.service';
import Toast from 'react-native-toast-message';
import { useIsFocused } from '@react-navigation/native';

const ReportScreen = (props) => {
    const [lastActivity, setLastActivity] = useState();
    const [reportPercentages, setReportPercentages] = useState();
    const [loading, setLoading] = useState();
    const commonStyles = CommonStyles();
    const isFocused = useIsFocused();

    async function checkAndLoadActivities(){
        setLoading(true);
        if (!Service_Activity.ACTIVITIES) {
            setReportPercentages([0, 0, 0, 0, 0]);
            setLastActivity();
            const response = await Service_Activity.loadActivities();
            if (response.type && response.type === "error") {
                Toast.show(response);
            }
            else {
                // FIND REPORT PERCENTAGE
                const percentages = Service_Activity.findReportPercentages(response);
                setReportPercentages(percentages);
                // FIND PYRAMIND PERCENTAGE
                const pyramindActivity = Service_Activity.findPyramindActivity();
                setLastActivity(pyramindActivity);
                setLoading(false);
            }
        }
        else {
            const percentages = Service_Activity.findReportPercentages([...Service_Activity.ACTIVITIES]);
            setReportPercentages(percentages);
            const pyramindActivity = Service_Activity.findPyramindActivity();
            console.log(pyramindActivity.category[1]);
            setLastActivity(pyramindActivity);
            setLoading(false);
        }
    }

    useEffect(() => {
        if (isFocused) checkAndLoadActivities();
    }, [isFocused]);

    return (
        <View style={commonStyles.MainView}>
            <View style={{ height: '18%', justifyContent: 'space-between' }}>
                <StatusBar hidden={true} />
                <ScreenHeader toggleDrawer={props.navigation.toggleDrawer} />
                {/* DATE */}
                <View style={{...commonStyles.PaddedView }}>
                    <Text style={commonStyles.DateDisplay}>{new Date().toDateString()}</Text>
                </View>
                {/* SCREEN NAME */}
                <View style={{...commonStyles.PaddedView, flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={commonStyles.ScreenName}>Report</Text>
                    {loading && (
                        <ActivityIndicator
                            size={commonStyles.ActivityLoader.fontSize}
                            color={commonStyles.ActivityLoader.color}
                            style={{ marginLeft: '3%' }}
                        />
                    )}
                </View>
            </View>
            <ScrollView 
                showsVerticalScrollIndicator={false}
            >
                <Report percentage={reportPercentages}/>
                <Selection type="VIEW" lastActivity={lastActivity}/>
            </ScrollView>
        </View>
    );
}
export default ReportScreen;