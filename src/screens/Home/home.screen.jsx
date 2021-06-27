import React, { useState, useRef } from 'react';
import { TouchableOpacity, Dimensions, View, Text, ScrollView, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { CommonStyles } from '../../themes/CommonStyles';
import { HomeStyles } from './home.styles'; 
import ScreenHeader from '../../components/header.component';
import Selection from '../../components/select.component';
import { Service_Activity } from '../../services/activity.service';
import Toast from 'react-native-toast-message';
import { Feather } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const { width, height } = Dimensions.get("screen");
const HomeScreen = (props) => {
    const [activity, setActivity] = useState();
    const commonStyles = CommonStyles();
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const [showPicker, setShowPicker] = useState("");
    const styles = HomeStyles();
    const [showLoading, setShowLoading] = useState(false);
    const scrollRef = useRef(null);


    function addTimeUnitToDate(date, time){
        if (!date && !time) return new Date();
        else {
            const dateValue = (date ? date.toISOString() : new Date().toISOString()).split("T")[0];
            const timeValue = (time ? time.toISOString() : new Date().toISOString()).split("T")[1];
            return `${dateValue}T${timeValue}`;
        }
    }

    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + '.' + minutes + ' ' + ampm;
        return strTime
    }

    async function Add_Activity(subCats){
        const activityDate = addTimeUnitToDate(date, time);
        const response = await Service_Activity.saveActivity({
            date: activityDate,
            description: activity,
            subCategoryIds: subCats
        });
        Toast.show(response);
        if (response.type === "success") {
            setShowLoading(false);
            setActivity();
            setDate();
            setTime();
            scrollRef.current.scrollTo({ x: 0, animated: true });
            return true;
        }
        else return false;
    }
    return (
        <View style={commonStyles.MainView}>
            {showPicker === "Date" && (
                <DateTimePicker 
                    value={date || new Date()}
                    onChange={(event, value)=>{  setShowPicker(""); setDate(value); }}
                    display="calendar"
                    testID="datePicker"
                />
            )}

            {showPicker === "Time" && (
                <DateTimePicker 
                    value={time || new Date()}
                    onChange={(event, value)=>{ setShowPicker(""); setTime(value);  }}
                    mode="time"
                    display="clock"
                    testID="timePicker"
                />
            )}
            <View style={{ height: height * 0.22, justifyContent: 'space-between' }}>
                <StatusBar hidden={true} />
                <ScreenHeader toggleDrawer={props.navigation.toggleDrawer} />
                {/* DATE */}
                <View style={{ ...commonStyles.PaddedView }}>
                    <Text style={commonStyles.DateDisplay}>{new Date().toDateString()}</Text>
                </View>
                {/* SCREEN NAME */}
                <View style={{ ...commonStyles.PaddedView }}>
                    <Text style={commonStyles.ScreenName}>What have you{"\n"}been up to?</Text>
                </View>
            </View>

            <View style={{ height: height * 0.15, ...commonStyles.PaddedView, justifyContent: 'flex-end' }}>
                <TouchableOpacity style={{ 
                    alignSelf: 'flex-end', 
                    flexDirection: 'row', 
                    alignItems: 'center',
                }} onPress={()=>{
                    setShowPicker("Date");
                }}>
                    <Text style={styles.DateTextStyles}>{date ? date.toDateString() : "Today"}</Text>
                    <Feather name="calendar" size={17} color={styles.CardColor} />
                </TouchableOpacity>

                <TouchableOpacity style={{
                    alignSelf: 'flex-end', 
                    flexDirection: 'row', 
                    alignItems: 'center',
                    marginTop: 10
                }} onPress={()=>{
                    setShowPicker("Time");
                }}>
                    <Text style={styles.DateTextStyles}>{time ? formatAMPM(time) : "Now"}</Text>
                    <Feather name="clock" size={17} color={styles.CardColor} />
                </TouchableOpacity>
                <TextInput
                    value={activity}
                    onChangeText={setActivity}
                    numberOfLines={5}
                    multiline={true}
                    style={styles.TextInput}
                    placeholder={"Start your activity"}
                    placeholderTextColor={styles.PlaceHolderColor}
                    keyboardType="name-phone-pad"
                    returnKeyType="none"
                />
            </View>

            <View style={{ flex: 1 }}>
                <ScrollView ref={scrollRef} style={{ marginTop: '-10%' }}>
                    <Selection 
                        type={"ADD"} 
                        onAddFunction={async (subCats)=>{
                            setShowLoading(true);
                            const res = await Add_Activity(subCats);
                            console.log("res add activity = ",res);
                            return res;
                        }}

                        showLoading={showLoading}
                    />
                    <Text style={[styles.SelectText, {...commonStyles.PaddedView}]}>Select Your Needs</Text>
                </ScrollView>
            </View>
        </View>
    )
}

export default HomeScreen;