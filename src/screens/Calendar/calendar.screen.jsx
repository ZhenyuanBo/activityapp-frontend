import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, TextInput, ScrollView, ActivityIndicator, Dimensions, SectionList, Image } from 'react-native';
import ScreenHeader from '../../components/header.component';
import Activity from '../../components/activity.component';
import { CommonStyles } from '../../themes/CommonStyles';
import { CalenderStyles } from './calendar.styles';
import { EvilIcons, Octicons, AntDesign } from '@expo/vector-icons';
import { Service_Activity } from '../../services/activity.service';
import { Shades_Class } from '../Shades/shades.function';
import Report from '../../components/pyramind.component';
import Selection from '../../components/select.component';
import No_Data from '../../../assets/images/No_Data.png'
import Toast from 'react-native-toast-message';
import { useIsFocused } from '@react-navigation/native';

const Months = ["JANUARY" ,"FEBUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
const { width } = Dimensions.get("screen");

var monthArray = new Array();
monthArray[0] = "JANUARY";
monthArray[1] = "FEBUARY";
monthArray[2] = "MARCH";
monthArray[3] = "APRIL";
monthArray[4] = "MAY";
monthArray[5] = "JUNE";
monthArray[6] = "JULY";
monthArray[7] = "AUGUST";
monthArray[8] = "SEPTEMBER";
monthArray[9] = "OCTOBER";
monthArray[10] = "NOVEMBER";
monthArray[11] = "DECEMBER";

const CalendarView = (props) => {
    const [loading, setLoading] = useState(false);
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth());
    const [date, setDate] = useState(new Date().getDate());
    const [activeCategory, setActiveCategory] = useState("Activity");
    const [selectedMonth, setSelectedMonth] = useState(monthArray[new Date().getMonth()]);
    const [sectionData, setSectionData] = useState();
    const [reportPercentages, setReportPercentages] = useState();
    const [lastActivity, setLastActivity] = useState();
    const isFocused = useIsFocused();
    const scrollMonth = useRef(null);
    const scrollDays = useRef(null);
    const commonStyles = CommonStyles();
    const styles = CalenderStyles();

    function daysInMonth (month, year) {
        const dates = new Date(year, month, 0).getDate();
        const datesArray = [];
        for(let i=1;i<=dates;i++) datesArray.push({day: getDay(year, month, i), date: i, hasEntry: checkDateInActivities(year, month, i)});
        return datesArray;
    }
    function checkDateInActivities(year, month, index){
        if (!Service_Activity.DATES) return false;
        const date = new Date(year, month, index).toDateString();
        if (Service_Activity.DATES.includes(date)) return true
        else return false;
    }
    function getDay(year, month, day){
        day = new Date(year, month, day).getDay();
        switch(day){
            case 0: return "Sun";
            case 1: return "Mon";
            case 2: return "Tue";
            case 3: return "Wed";
            case 4: return "Thr";
            case 5: return "Fri";
            case 6: return "Sat";
        }
    }
    function getActivitiesWithType(Type, Activities) {
        return Activities.filter((Activity, index)=>{
            if (Activity.types.includes(Type)) return true;
            else return false;
        });
    }
    async function getSectionData(Activities) {
        const Types = Service_Activity.getActivityTypes();
        const sectionData = [];
        for (let Type of Types) {
            sectionData.push({
                title: Type,
                data: getActivitiesWithType(Type, Activities)
            });
        }
        setSectionData(sectionData);
    }
    async function checkAndLoadActivities(date, month, year){
        setLoading(true);
        if (!Service_Activity.ACTIVITIES) {
            const response = await Service_Activity.loadActivities();
            if (response.type && response.type === "error") {
                Toast.show(response);
            }
            else {
                const filteredActivities = Service_Activity.filterActivities(new Date(year, month,  date).toDateString());
                getSectionData(filteredActivities);
                setLastActivity(filteredActivities[filteredActivities.length-1]);
                const percentages = Service_Activity.findReportPercentages(filteredActivities);
                setReportPercentages(percentages);
                
            }
        }
        else {
            const Data = Service_Activity.filterActivities(new Date(year, month, date).toDateString());
            if (Data.length == 0) setSectionData([]);
            else {
                getSectionData(Data);
                setLastActivity(Data[Data.length-1]);
                const percentages = Service_Activity.findReportPercentages(Data);
                setReportPercentages(percentages);
            }
        }
        setLoading(false);
    }

    useEffect(() => {
        if (isFocused) {
            setSectionData(undefined);
            setLastActivity();
            setReportPercentages([0, 0, 0, 0, 0]);
            checkAndLoadActivities(date, month, year);
        }
    }, [date, month, year, isFocused]);

    return (
        <SafeAreaView style={commonStyles.MainView}>
            <StatusBar hidden={true}/>
            <ScreenHeader toggleDrawer={props.navigation.toggleDrawer}/>
            {/* SCREEN NAME */}
            <View style={{ flex: 0.050, ...commonStyles.PaddedView, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={commonStyles.ScreenName}>Calendar</Text>
                {loading && (
                    <ActivityIndicator
                        size={commonStyles.ActivityLoader.fontSize}
                        color={commonStyles.ActivityLoader.color}
                        style={{ marginLeft: '3%' }}
                    />
                )}
            </View>
            {/* FILTER */}
            <View style={{ flex: 0.100, flexDirection: 'row', ...commonStyles.PaddedView, alignItems: 'flex-end' }}>
                <View style={{
                    flex: 0.8,
                    flexDirection: 'row',
                    padding: 10,
                    borderRadius: 10, 
                    borderWidth: 0.4, 
                    borderColor: styles.BorderColor,
                    height: '80%',
                    alignSelf: 'flex-end',
                    alignItems: 'center'
                }}>
                    <EvilIcons name="search" size={30} color={styles.BorderColor}/>
                    <TextInput 
                        placeholder="Search a day"
                        placeholderTextColor={styles.BorderColor}
                        style={{
                            fontFamily: 'FiraSans-Medium',
                            marginLeft: 10,
                            fontSize: 16
                        }}
                    />
                </View>
                <View style={{ flex: 0.2 }}>
                    <TouchableOpacity style={{
                        height: '80%',
                        alignSelf: 'flex-end',
                        width: '90%',
                        borderRadius: 10,
                        backgroundColor: styles.CardColor,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Octicons name="settings" size={25} color={styles.ColorTextContrast}/>
                    </TouchableOpacity>
                </View>
            </View>            
            {/* YEAR SELECTOR */}
            <View style={{ flex: 0.075, flexDirection: 'row', ...commonStyles.PaddedView }}>
                <View style={{ flex: 0.75, justifyContent: 'flex-end' }}>
                    <Text style={{
                        fontSize: 25,
                        fontFamily: 'FiraSans-Bold',
                        color: styles.colors.text
                    }}>{year}</Text>
                </View>
                <View style={{ flex: 0.25, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                    <TouchableOpacity style={{ flex: 0.5, alignItems: 'flex-end' }} onPress={()=>{
                        setYear((parseInt(year)-1)+"")
                    }}>
                        <AntDesign name="left" size={25} color={styles.colors.text}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 0.5, alignItems: 'flex-end' }} onPress={()=>{
                        setYear((parseInt(year)+1)+"")
                    }}>
                        <AntDesign name="right" size={25} color={styles.colors.text}/>
                    </TouchableOpacity>
                </View>
            </View>
            {/* MONTH AND DATE SELECTOR */}
            <View style={{ flex: 0.150, justifyContent: 'flex-end' }}>
                {/* MONTHS */}
                <ScrollView 
                    ref={scrollMonth}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ alignItems: 'flex-end' }}
                >
                    {Months.map((item, index) => (
                        <TouchableOpacity style={{ marginHorizontal: 10 }} key={index+""}
                            onPress={()=>{
                                setSelectedMonth(item);
                                setMonth(monthArray.indexOf(item));
                            }}
                            onLayout={({ nativeEvent: { layout: { x }}})=>{
                                if (item === selectedMonth) {
                                    scrollMonth.current.scrollTo({ x: x-10, animated: true });
                                }
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: 'FiraSans-Bold',
                                    fontSize: 12,
                                    color: selectedMonth === item ? styles.colors.text : styles.colors.border
                                }}
                            >
                                {item}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                {/* DATES */}
                <ScrollView 
                    ref={scrollDays}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ alignItems: 'flex-end' }}
                >
                {daysInMonth(month, year).map((item)=>(
                    <TouchableOpacity
                        key={item.date} 
                        style={{
                            backgroundColor: date === item.date ? styles.colors.card : styles.colors.background,
                            width: width * 0.09,
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '95%',
                            borderRadius:12,
                            paddingHorizontal: 1,
                            marginHorizontal: 5
                        }}
                        onLayout={({ nativeEvent: { layout: { x }}})=>{
                            if (date == item.date) {
                                scrollDays.current.scrollTo({ x: x-7, animated: true });
                            }
                        }}
                        onPress={()=>setDate(item.date)}
                    >
                        <Text
                            style={{
                                fontSize: 22,
                                fontFamily: 'FiraSans-Bold',
                                color: date === item.date ? styles.colors.background : styles.colors.text
                            }}>
                            {item.date}
                        </Text>
                        {(item.hasEntry && date !== item.date)? (
                            <Octicons name="primitive-dot" size={12} color={styles.colors.card}/>
                        ) : (
                            <Text style={{
                                fontSize: 12,
                                fontFamily: 'FiraSans-Medium',
                                color: date === item.date ? styles.colors.background : styles.colors.text
                            }}>{item.day}</Text>
                        )}
                    </TouchableOpacity>
                ))}
                </ScrollView>
            </View>
            {/* ACTIVITY REPORT SELECTOR */}
            <View style={{ flex: 0.050, flexDirection: 'row', marginTop: '2%', ...commonStyles.PaddedView }}>
                <TouchableOpacity onPress={()=>setActiveCategory('Report')}>
                    <Text style={activeCategory === "Report" ? styles.CategoryViewText : styles.CategoryInActiveText}>Report</Text>
                    {activeCategory == "Report" && (
                        <View style={styles.ActiveBar}></View>
                    )}
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: '10%' }} onPress={()=>setActiveCategory("Activity")}>
                    <Text style={activeCategory === "Activity" ? styles.CategoryViewText : styles.CategoryInActiveText}>All Activities</Text>
                    {activeCategory == "Activity" && (
                        <View style={styles.ActiveBar}></View>
                    )}
                </TouchableOpacity>
            </View>
            {/* SHOW ACTIVITIES */}
            <View style={{ flex: 0.575 }}>
                {activeCategory == "Activity" && (
                    <>
                        {/* LOADING SECTION DATA */}
                        {!sectionData && (
                            <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator
                                    size={35}
                                    color={styles.colors.card}
                                />
                                <Text style={{
                                    fontSize: 19,
                                    fontFamily: 'FiraSans-Bold',
                                    textAlign: 'center',
                                    color: styles.colors.text
                                }}>Loading your activities...</Text>
                            </View>
                        )}
                        {/* SECTION DATA EMPTY */}
                        {(sectionData && sectionData.length === 0) && (
                            <View style={{ ...commonStyles.PaddedView }}>
                                <View style={{ marginTop: '9%' }}>
                                    <Text style={{ 
                                        fontFamily: 'FiraSans-Bold',
                                        fontSize: 19,
                                        color: styles.colors.text,
                                        textAlign: 'left'
                                    }}>
                                        {"NO ACTITIVITES FOUND"}
                                    </Text>
                                </View>
                                <View style={{ marginTop: '-30%', justifyContent: 'flex-start', alignItems: 'flex-end' }}>
                                    <Image 
                                        source={No_Data}
                                        style={{ width: '80%', height: '90%'}}
                                    />
                                </View>
                            </View>
                        )}
                        {/* SECTION DATA */}
                        {(sectionData && sectionData.length > 0) && (
                            <SectionList 
                                style={{...commonStyles.PaddedView, marginTop: '5%'}}
                                sections={sectionData}
                                keyExtractor={(item, index)=>index+""}
                                renderItem={({ item, index, section })=>(
                                    <Activity
                                        key={index + ""}
                                        section={section.title}
                                        activity={item}
                                        icon={Shades_Class.returnBaseImage(section.title)}
                                    />
                                )}
                                initialNumToRender={3}
                                renderSectionHeader={({ section: { title, data } }) => (
                                    <View key={title}>
                                        {data.length > 0 && (
                                            <Text
                                                key={title}
                                                style={{
                                                    fontFamily: 'FiraSans-Medium',
                                                    fontSize: 13,
                                                    marginBottom: '3%',
                                                    marginLeft: '1%',
                                                    color: Shades_Class.returnBaseColor(title)
                                                }}
                                            >{title.toUpperCase()}</Text>
                                        )}
                                    </View>
                                )}
                                showsVerticalScrollIndicator={false}
                            />
                        )}
                    </>
                )}
                {activeCategory == "Report" && (
                    <ScrollView >
                        <Report percentage={reportPercentages}/>
                        <Selection type="VIEW" lastActivity={lastActivity ? lastActivity: undefined}/>
                    </ScrollView>
                )}
            </View>
        </SafeAreaView>
    );
}

export default CalendarView;